import firebase from "firebase-admin";
import dotenv from "dotenv";

dotenv.config({ path: "./env"});

firebase.initializeApp({
  credential: firebase.credential.cert({
    privateKey:
      process.env.FB_PRIVATE_KEY &&
      process.env.FB_PRIVATE_KEY.replace(/\\n/g, "  "), // eslint-disable-line no-useless-escape
    projectId: process.env.FB_PROJECT_ID,
    clientEmail: process.env.FB_CLIENT_EMAIL,
  }),
});

export default firebase;
