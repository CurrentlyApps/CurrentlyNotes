const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.createUserDefaultData = functions.auth.user().onCreate((user) => {
  return admin.database().ref(`notes/users/${user.uid}/profile`).set({
    displayName: user.displayName,
    email: user.email,
  });
});
