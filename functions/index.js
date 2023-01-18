const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.database();


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

exports.shareNoteToUser = functions.https.onCall(async (data, context) => {
  const noteMeta = data.noteMeta;
  const fromUser = context.auth.uid;
  const dataToSave = {
    canCollab: data.canCollab,
    canPublish: data.canPublish,
    allowPublishPublic: data.allowPublishPublic,
    allowCollabPublic: data.allowCollabPublic,
  };

  // Handle Removed Users
  const currentData = await db.ref(`/notes_share/notes/${fromUser}/${noteMeta.id}`).get();
  if (currentData.exists()) {
    const currentPublishUsers = currentData.val().publishUsers;
    const currentCollabUsers = currentData.val().collabUsers;
    const newPublishUsers = data.publishUsers;
    const newCollabUsers = data.collabUsers;

    if (currentPublishUsers) {
      for ( const [uid, email] of Object.entries(currentPublishUsers) ) {
        if ( !newPublishUsers.includes(email) ) {
          await db.ref(`/notes_share/user/${uid}/${fromUser}/${noteMeta.id}/publish`).remove();
          await db.ref(`/notes_share/notes/${fromUser}/${noteMeta.id}/publishUsers/${uid}`).remove();
        }
      }
    }

    if (currentCollabUsers) {
      for (const [uid, email] of Object.entries(currentCollabUsers)) {
        if (!newCollabUsers.includes(email)) {
          await db.ref(`/notes_share/user/${uid}/${fromUser}/${noteMeta.id}/collab`).remove();
          await db.ref(`/notes_share/notes/${fromUser}/${noteMeta.id}/collabUsers/${uid}`).remove();
        }
      }
    }
  }


  // eslint-disable-next-line max-len
  admin.database().ref(`/notes_share/notes/${fromUser}/${noteMeta.id}`).set(dataToSave).then(() => {
    const usersRef = db.ref("/users");
    if (data.collabUsers) {
      data.collabUsers.forEach((user) => {
        usersRef.orderByChild("email").equalTo(user).get().then((snapshot) => {
          const toUser = snapshot.val();
          const toUserId = Object.keys(toUser)[0];
          db.ref(`/notes_share/user/${toUserId}/${fromUser}/${noteMeta.id}/collab`).set(true);
          db.ref(`/notes_share/notes/${fromUser}/${noteMeta.id}/collabUsers/${toUserId}`).set(user);
        });
      });
    }

    if (data.publishUsers) {
      data.publishUsers.forEach((user) => {
        usersRef.orderByChild("email").equalTo(user).get().then((snapshot) => {
          const toUser = snapshot.val();
          const toUserId = Object.keys(toUser)[0];
          db.ref(`/notes_share/user/${toUserId}/${fromUser}/${noteMeta.id}/publish`).set(true);
          db.ref(`/notes_share/notes/${fromUser}/${noteMeta.id}/publishUsers/${toUserId}`).set(user);
        });
      });
    }
  });
});
