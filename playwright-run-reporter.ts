import { mkdirSync } from 'node:fs';
import { access, readdir, rename, rmdir } from 'node:fs/promises';
import path from 'node:path';
import type { FullConfig, Reporter } from '@playwright/test/reporter';

type ReporterOptions = {
  stagingDirectory: string;
};

function formatTimestamp(date: Date): string {
  const datePart = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('');
  const timePart = [
    String(date.getHours()).padStart(2, '0'),"-",
    String(date.getMinutes()).padStart(2, '0'),"-",
    String(date.getSeconds()).padStart(2, '0'),
  ].join('');

  return `${datePart}_${timePart}`;
}

async function pathExists(location: string): Promise<boolean> {
  try {
    await access(location);
    return true;
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}

class PlaywrightRunReporter implements Reporter {
  private stagingPath?: string;
  private destinationPath?: string;

  constructor(private readonly options: ReporterOptions) {}

  onBegin(config: FullConfig): void {
    const rootDirectory = config.configFile ? path.dirname(config.configFile) : config.rootDir;
    const runsDirectory = path.resolve(rootDirectory, 'Playwright-Runs');
    const stagingPath = path.resolve(rootDirectory, this.options.stagingDirectory);
    const timestamp = formatTimestamp(new Date());
    let destinationPath = path.join(runsDirectory, timestamp);
    let suffix = 1;

    try {
      mkdirSync(runsDirectory, { recursive: true });
    } catch (error) {
      process.stderr.write(`Could not create Playwright runs folder "${runsDirectory}": ${String(error)}\n`);
      throw error;
    }
    while (true) {
      try {
        mkdirSync(destinationPath);
        break;
      } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'EEXIST') {
          destinationPath = path.join(
            runsDirectory,
            `${timestamp}-${String(suffix).padStart(2, '0')}`,
          );
          suffix += 1;
          continue;
        }
        process.stderr.write(`Could not create Playwright run folder "${destinationPath}": ${String(error)}\n`);
        throw error;
      }
    }

    this.stagingPath = stagingPath;
    this.destinationPath = destinationPath;
  }

  async onExit(): Promise<void> {
    if (!this.stagingPath || !this.destinationPath) {
      return;
    }

    if (!(await pathExists(this.stagingPath))) {
      return;
    }

    try {
      const entries = await readdir(this.stagingPath);
      for (const entry of entries) {
        await rename(
          path.join(this.stagingPath, entry),
          path.join(this.destinationPath, entry),
        );
      }
      await rmdir(this.stagingPath);
    } catch (error) {
      process.stderr.write(
        `Could not archive Playwright run to "${this.destinationPath}": ${String(error)}\n`,
      );
      throw error;
    }
  }
}

export default PlaywrightRunReporter;
