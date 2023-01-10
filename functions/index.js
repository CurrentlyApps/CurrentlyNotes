const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();


exports.createUserDefaultData = functions.auth.user().onCreate((user) => {
  admin.database().ref(`notes/users/${user.uid}/notes`).set({
    "welcome_note": {
      id: "welcome_note",
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
    photoURL: user.photoURL,
    emailVerified: false,
  });
});
