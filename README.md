# Meetup Project

This project for demonstrating the design of high conversion forms. AngulaJS framework has been used to build the application on the user interface and Firebase has been used to store user and event information on the backend

Initial project files generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

### Run the Application

To run the app after downloading the source code :

```
Run npm install followed by bower install in the meetup directory.
Then run grunt serve.
Browse the app at http://localhost:9000/

To build for production:
run grunt
```

### Project Directory Layout

```
app/                    --> all of the source files for the application
  scripts/              --> all app specific modules
    controllers/              --> app controllers
      login.js                --> module containing login controller, user data service and registration controller
      main.js                 --> module containing the main controller, create event and get events controllers
    app.js              --> main application module
  index.html            --> app layout file (the main html template file of the app)
  scripts/              --> all app specific styling sheets
  views/                --> all app view templates
    createEvent.html/         --> partial template with form for creating events
    loggedout.html            --> partial template to display when user is logged out of app
    login.html/               --> partial template with form for getting user input to log into app
    main.html/                --> partial template for displaying upcoming events and serves as landing page
    register.html/            --> partial template with form for getting user input to register users

```

### Requirements

#### 1. Registration form for user account creation:

##### The user account creation form includes the following fields:

- Name (An optional field).

- Email address (A required field in order to allow the user to login in)

- Password (with character and length requirements)

No other fields have been added to keep the form and the registration process simple 

##### The login form includes the following fields:

- Email address

- Password 

#### 2. Event creation form:

##### The event creation form includes the following fields:

- Event Name (A required field for events).

- Event Type (An optional field with sample data in form of a datalist: birthday party, conference talk, wedding).

- Event Host  (An optional field for the name of the host).

- Event Start (A required field for event start date and time).

- Event End (A required field for event end date and time).

- Location  (An optional field for the location of the event).

- Additional Message  (An optional field for the event creator to add any additional information for the event).


#### 3. The app should display events that have been created.

- Created events are displayed on the landing page in a table for simplicity


[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server

[login]: http://stackoverflow.com/questions/27389157/firebaseauth-with-angular-user-login

[passord]: https://www.firebase.com/docs/web/guide/login/password.html

[date]: https://docs.angularjs.org/api/ng/filter/date

[filtering]: http://stackoverflow.com/questions/16523076/angular-template-default-value-if-binding-null-undefined-with-filter

[dates]: http://stackoverflow.com/questions/30021133/how-do-you-save-a-date-field-in-firebase-using-angularfire

[autofill]: https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill?hl=en

[loading-ind]: https://github.com/gdi2290/angular-loading-bar