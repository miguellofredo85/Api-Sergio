const express = require("express");
const app = express();
const functions = require('firebase-functions')

const peopleController = require("./controller/people.controller");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/people", peopleController.getAll);
app.get("/people/:id", peopleController.getById);
app.post("/people", peopleController.create);
app.put("/people/:id", peopleController.update);
app.delete("/people/:id", peopleController.delete);

exports.app = functions.https.onRequest(app);
