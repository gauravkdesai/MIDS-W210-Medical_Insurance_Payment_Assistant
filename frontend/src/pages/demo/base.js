import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAK5Y3hyxWoDsQUIdLmtd3wYRsybJA2L3I",
  authDomain: "w210-29ed8.firebaseapp.com",
  databaseURL: "https://w210-29ed8.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
