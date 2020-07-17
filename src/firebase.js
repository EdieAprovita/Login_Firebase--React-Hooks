import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA_8z1ZgjhdkenwrICFvTZ_4RBHXXDcJ70',
  authDomain: 'crud-firebase-34031.firebaseapp.com',
  databaseURL: 'https://crud-firebase-34031.firebaseio.com',
  projectId: 'crud-firebase-34031',
  storageBucket: 'crud-firebase-34031.appspot.com',
  messagingSenderId: '853034813731',
  appId: '1:853034813731:web:95419d0fe4c0f74f06e496',
};
// Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export { db, auth };
