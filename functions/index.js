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
  admin.database().ref(`notes/users/${user.uid}/notes`).set({
    "note1": {
      id: "default",
      title: "Welcome to Currently Notes!",
      body: "This is a sample note. You can edit it by clicking on it." +
        " You can also delete it by clicking the trash can icon next to the" +
        " note in the sidebar. To create a new note, just hit the new note " +
        "icon at the top of the sidebar!.",
    },
  });
  return admin.database().ref(`notes/users/${user.uid}/profile`).set({
    displayName: user.displayName,
    email: user.email,
  });
});
