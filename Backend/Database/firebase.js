const admin = require("firebase-admin");

const serviceAccount = require("./Key_firebase.json"); 


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); 
module.exports = db;
