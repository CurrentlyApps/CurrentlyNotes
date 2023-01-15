const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.onDeleteUserData = functions.auth.user().onDelete((user) => {
  admin.database().ref(`/notes_meta/${user.uid}`).remove();
  admin.database().ref(`/notes_content/${user.uid}`).remove();
  return admin.database().ref(`/users/${user.uid}`).remove();
});

exports.createUserDefaultDataV2 = functions.auth.user().onCreate((user) => {
  // Get user provider
  const provider = user.providerData[0].providerId;
  let isVerified = true;
  if (provider === "password") {
    isVerified = false;
  }

  admin.database().ref("/app_config").get().then((snapshot) => {
    const data = snapshot.val();
    admin.database().ref(`users/${user.uid}`).set({
      email: user.email,
      photoURL: user.photoURL ?
        user.photoURL :
        data.urlPhotoGeneratorLink + user.uid,
      isVerified: isVerified,
    });
  });
  admin.database().ref(`notes_meta/${user.uid}`).set({
    "0": {
      id: "0",
      user_id: user.uid,
      title: "Welcome to Currently Notes",
      created_at: Date.now(),
      updated_at: Date.now(),
      privacy: "private",
    },
  });

  return admin.database().ref(`notes_content/${user.uid}`).set({
    "0": {
      id: "0",
      body: "This is your first note. You can edit it by clicking on it.",
      user_id: user.uid,
    },
  });
});
