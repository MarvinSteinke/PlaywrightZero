//https://www.automationexercise.com/
https://playground.bondaracademy.com/pages/iot-dashboard
/*
Commands:

Multi editing command strg + alt + up / down


npm start -> starts the app
npm init playwright@latest -> installs playwright this creates tests folder where you include those files


Playwright
npx playwright test --ui -> starts the UI to test
npx playwright test -> start all tests
npx playwright show-report -> shows report
npx playwright test --project=chronium -> test start only in chrome browser
npx playwright test --project=chronium --headed -> starts browser aswell otherwise no browser
npx playwright test example.spec.ts --project=chronium -> start test in the example.spec.ts file
npx playwright test -g "The First Test" --project=chronium -> starts test with Name The First Test
npx playwright test --project=chronium --trace on -> activates Trace to see every click logs screenshots in report
npx playwright test --project=chronium --debug -> will open insepctor and browser debug mode

Start Recorder
npx playwright codegen

Faker library for generation of testdata  https://www.npmjs.com/package/@faker-js/faker
npm install --save-dev @faker-js/faker -> check link might change

For Hover elements open inspect -> sources -> hover over element -> F8 in windwos to freeze browser

Info, if it has a Promise when you hover over it requires async + await
Also this was more made as a library, some test might not execute but thats because i mainly wrote the syntax in here so i know how they are builded
*/ 




understanding DOM

Document
    <html>
        <head>
        <body>  
            <h1>.<p>.<div>

Beispiel
            <input _ngcontent-ryk-c194="" type="email" nbinput="" fullwidth="" id="inputEmail1" data-cy="inputEmail1" data-testid="inputEmail1" placeholder="Email" class="input-full-width size-medium status-basic shape-rectangle nb-transition">