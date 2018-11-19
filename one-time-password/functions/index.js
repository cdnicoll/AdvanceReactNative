const admin = require('firebase-admin'); // gives access to the service account
const functions = require('firebase-functions');
const createUser = require('./create_user');

const serviceAccount = require("service_account.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cdnicoll-one-time-password.firebaseio.com"
  });

exports.createUser = functions.https.onRequest(createUser);
