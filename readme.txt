npm instal mysql2
npm install dotenv --save
npm install --save-dev chai
npm install sinon
npm install --save-dev mocha
npm install supertest --save-dev

package.json
"test": "mocha ./tests/**/*.test.js"

final

{
  "name": "functions",
  "description": "Cloud Functions for Firebase",
  "scripts": {
    "serve": "firebase emulators:start --only functions",
    "shell": "firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions:api",
    "logs": "firebase functions:log",
    "test": "mocha ./tests/**/*.test.js"
  },
  "engines": {
    "node": "16"
  },
  "main": "./index.js",
  "dependencies": {
    "dotenv": "^16.0.3",
    "firebase-admin": "^11.2.0",
    "firebase-functions": "^4.0.1",
    "mysql2": "^3.1.2",
    "sinon": "^15.0.1"
  },
  "devDependencies": {
    "chai": "^4.3.7",
    "firebase-functions-test": "^0.2.0",
    "mocha": "^10.2.0",
    "sinon-chai": "^3.7.0",
    "supertest": "^6.3.3"
  },
  "private": true
}



const functions = require("firebase-functions");

const express = require("express");

const admin = require('firebase-admin');
admin.initializeApp() 

const app = express();


const peopleController = require("../controller/people.controller");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/people", peopleController.getAll);
app.get("/people/:id", peopleController.getById);
app.post("/people", peopleController.create);
app.put("/people/:id", peopleController.update);
app.delete("/people/:id", peopleController.delete);

const PORT = 3000;

app.listen(PORT, (_req, _res) => {
  console.log(`Server running on ${PORT}`);
});


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.app = functions.https.onRequest(app);
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
