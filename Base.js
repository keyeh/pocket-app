import rebase from 're-base';
import * as firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: "AIzaSyBM84BR9Ec5wi22jEXhHt2My3kVvpk1qrs",
  authDomain: "pocket-a7c79.firebaseapp.com",
  databaseURL: "https://pocket-a7c79.firebaseio.com",
  projectId: "pocket-a7c79",
  storageBucket: "pocket-a7c79.appspot.com",
  messagingSenderId: "302589974172"
});

export default rebase.createClass(app.database());
