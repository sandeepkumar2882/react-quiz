# Getting Started with Create React App

This Repo is for learning purpose, I am creating a mini project as quiz app with some basic concepts & some packages of React.

# Installation

### Install node npm
`brew install node`

### Create React App
`npx create-react-app app-name`

### Routing Package Install 
`npm install react-router-dom`
* You can install all other packages that are needed for us like 'react-bootstrap' and more...

### If any package failed installation (try this command once)
`sudo npm cache clean` or `sudo npm cache clean --force `

# Project

## Quiz App
* Quiz app is based on questions & answers are available in question.js file. This app have features like : 50-50 , hints, timer, next, previous, quit, summary of the quiz played by the player, also added error page for wrong information.

### Project Path
* /src

* questions.js contains all the questions and answers
* Components folder is responsible for all operationable files, play, instructions, summary, error and home
* App.js is responsible to import all the files and routing of the components.
* index.js import App.js and display all the outputs.

### Files
* Components folder have all the files
* Home.js is has icon, heading and Play button for start the quiz.
* ErrorPage.js is responsible for show the error if user input wrong url.
* Quiz Folder has three files
* Play.js is responsible for playing the quiz, display questions and answers with all the functionality that we achieved in this project.
* QuizInstructions.js is responsible for display the instructions for the quiz and have two buttons for 'Not Interested' & 'Let's Play'.
* QuizSummary.js is responsible for display the statistics of the player after end the quiz.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
