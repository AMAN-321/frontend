import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW41SAZHrpYHKl4vfC3lc1ut1DfFDbeG0",
  authDomain: "ecommerce-6b5aa.firebaseapp.com",
  projectId: "ecommerce-6b5aa",
  storageBucket: "ecommerce-6b5aa.appspot.com",
  messagingSenderId: "839839709225",
  appId: "1:839839709225:web:2dc08c276d740acfa44438"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
