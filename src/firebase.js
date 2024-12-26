// import firebase from "firebase"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAVgVN9BB0GFZjIezSNYhDg8QFJE8_aQ3A",
    authDomain: "slackclone-86da2.firebaseapp.com",
    projectId: "slackclone-86da2",
    storageBucket: "slackclone-86da2.firebasestorage.app",
    messagingSenderId: "952739613412",
    appId: "1:952739613412:web:f8fd3a540bcef4bf7f7af1",
    measurementId: "G-CPRGMYXRSS"
  };
  
  
// const  firebaseApp=firebase.initializeApp(firebaseConfig)
// const db=firebaseApp.firestore();
// const auth=firebase.auth()
// const provider= new firebase.auth.GoogleAuthProvider();
// export { db,auth,provider }

const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export services
export { db, auth, provider };
  