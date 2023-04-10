import firebase from "firebase-admin";
import keys from "../../keys";

firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: keys.firebase.projectId,
    clientEmail: keys.firebase.clientEmail,
    privateKey: keys.firebase.privateKey.replace(/\\n/g, ""),
  }),
});

export default firebase;
