import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_DEV_FIREBASE_KEY,
  authDomain: 'gitrdun-9d4b0.firebaseapp.com',
  projectId: 'gitrdun-9d4b0'
})

firebase.firestore().settings({
  timestampsInSnapshots:true
});

export default firebase.firestore();