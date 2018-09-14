import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'; 

var config = {
  apiKey: process.env.REACT_APP_DEV_FIREBASE_KEY,
  authDomain: "gitrdun-9d4b0.firebaseapp.com",
  databaseURL: "https://gitrdun-9d4b0.firebaseio.com",
  projectId: "gitrdun-9d4b0",
  storageBucket: "gitrdun-9d4b0.appspot.com",
  messagingSenderId: process.env.REACT_APP_DEV_MESSENGINGSENDER_KEY
};
firebase.initializeApp(config);

firebase.firestore().settings({
  timestampsInSnapshots:true
});

export default firebase;