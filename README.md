# Backend ✅
Online at: `https://visita.onrender.com` for testing purpes  

## Description

This is a RESTful API for serving client requests. It is built using Node.js and Express.js and uses MongoDB as a database.

## TODO

- [ ] Add tests ⏳
- [ ] Add forget passwrod endpoint ⏳
- [ ] Add send welcome email endpoint ⏳
- [ ] Add more documentation ⏳
- [ ] Create a frontend ✅

## ENV Variables Required

```
PORT=XXXX
DB_USER=XXXX
DB_PASSWORD=XXXXXXXX
DB_HOST=XXXX
ADMIN_PASSWORD=XXXXXXXX
JWT_SECRET_KEY=XXXXXXXX
```

## Installation ✈

1. Clone the repository
2. Run `npm install` to install all dependencies
3. Add a `.env` file to the root directory of the project and add the above environment variables
4. Run `npm start` to start the server
5. Run `npm run dev` to start the dev server

## API Endpoints 📡

### Users (Protected) 🚨

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | /api/v1/users/signup | Create a new user |
| POST   | /api/v1/users/login  | Login a user      |
| GET    | /api/v1/users        | Get all users     |
| ------ | -------------------- | ----------------- |

### Places (Protected) 🚨

| Method | Endpoint                    | Description          |
| ------ | --------------------------- | -------------------- |
| GET    | /api/v1/places/:placeId     | Get place by id      |
| PATCH  | /api/v1/places/:placeId     | Update place by id   |
| DELETE | /api/v1/places/:placeId     | Delete place         |
| POST   | /api/v1/places/create       | Create new place     |
| GET    | /api/v1/places/user/:userId | Get place by user id |
| ------ | --------------------------- | -------------------- |

# Frontend ✅

## Description

This is a frontend application built using React.js and Redux.js. It is a single page application that uses the backend API to serve client requests.

## ENV Variables Required

```
REACT_APP_GOOGLE_MAPS_API_KEY=XXXXXXXX
REACT_APP_BACKEND_URL=XXXXXXXX
REACT_APP_BACKEND_URL_API_V1=XXXXXXXX
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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
