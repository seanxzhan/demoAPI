Goal: create a web app and RESTful API Server with heroku postgres

Download and install heroku cli

Download and istall Node.js

Install Angular CLI: 
```
npm install -g @angular/cli
```

Create new project with angular cli. 

In terminal, cd to a folder where project should live in:
```
ng new mean-contactlist-angular2
```
Say yes when prompted "add to angular routing?". Style sheet format: CSS. 

Open project folder in vscode. In terminal, create heroku app. 
```
heroku login
heroku create test-api-613
```

In src/main.ts, add the following line to the top of the file.
```
import './polyfills.ts';
```

Provision a mongodb database. (Had to put in credit card info, free though)
```
heroku addons:attach testexpt::DATABASE --app test-api-app695
```

Create server.js using ```touch server.js``` and write code.

Install the following libraries:
```
npm install mongodb express body-parser --save
```

In package.js, add ```"start": "node server.js"```

Then deploy to heroku.

# Api

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
