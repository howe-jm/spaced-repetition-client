# Spaced repetition WebApp

Welcome to the Spaced Repetition WebApp!

This webapp has serves to help with learning topics where spaced repetition has been shown to improve a user's ability to learn information by repeatedly being presented in 'flash card' style method. For example, many languages are learned using spaced repetition - hold up a card with a word, attempt to translate the word, and turn the card over to reveal the true translation on the other side!

This app works similarly by presenting the user with a word in a foreign language (in the deployed example, the fictional Klingon language is used, referencing the Klingon Pocket Dictionary), giving the user an input form to attempt to translate the word, and checking it against the true answer. It provides feedback for correct and incorrect answers, and will always reveal the correct answer after an attempt.

This Spaced Repetition WebApp allows a user to create a unique username and password, and will track correct and incorrect answers.

Though the deployed example is limited in scope, the list of words can be as long as the user likes. 

## Links

Deployed App: https://spaced-repetition-howe-jm.vercel.app/
API Github: https://github.com/howe-jm/spaced-repetition-server
Client Github: https://github.com/howe-jm/spaced-repetition-client

## Client

The Spaced Repetition Client allows the user to interface with the app via a webpage.

The user can:

-Create a new account with a name, username, and password.
-Login to an existing account.
-View a list of words in the currently selected language.
-Begin spaced repetition practice.
-Attempt to answer prompts correctly.
-View the results of their attempted guess.
-Track the running total of correct guesses.
-Track correct and incorrect guesses for each word.
-Log out of the app.
## API

While this API can run independently of the client and be used for a custom client, it is intended to be used with the accompanying Spaced Repetition Client.

### API Endpoints

`/api/user/` - `POST`
User creation endpoint. When supplied with the name, username, and password, a new user can be created.

`/api/auth/token/` - `POST`
Submitting a username and password will check against the database for authentication.

`/api/language/` - `GET`
This endpoint will return the name of the language, and the full list of nodes in the linked list.

`/api/language/head` - `GET`
This endpoint returns the next node in line in the linked list.

`/api/language/guess` - `POST`
This endpoint handles submissions of a user's attempt to translate the word.


## Setup

To setup the application

1. Fork and clone the project to your machine
2. `npm install`. This will also install the application *Cypress.io* for running browser integration tests

The project expects you have the Spaced repetition API project setup and running on http://localhost:8000.

Find instructions to setup the API here https://github.com/Thinkful-Ed/spaced-repetition-api.

## Running project

This is a `create-react-app` project so `npm start` will start the project in development mode with hot reloading by default.