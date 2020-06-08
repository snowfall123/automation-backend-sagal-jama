# Tester Hotel

### Run the project for testing
```
npm run install
npm run build
npm run start
```

### Run the project for developement
```
npm run install
npm run serve
npm run dev
```

## How to use the API

If you want access the API directly, first run the project for testing or development

Next make a request to the `/api/login` with credentials that can be found in `/server/data.js`

If successful, you will recieve an auth token. This token must be used in all other API requests

To use the auth token, JSON encode the username and token and set them in the `X-User-Auth` header

Example:
```
X-User-Auth: {"username":"tester01","token":"4230d922ca04ca2c2e908821021ac105"}
```

To see the available API endpoints, look in `/server/api.js`
The paths found here must be prefixed with `http://localhost:3000/api`
