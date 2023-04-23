/*
    * firebaseModel.js is responsible for storing the state of the page and notifying the view when the state changes.
    * It is also responsible for communicating with the database.
*/

import firebaseConfig from "./firebaseConfig";
//import energyModel from "/energyModel.js";

// Instructions from Firebase.
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, get, onChildRemoved, onChildAdded, onValue} from "firebase/database";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const REF="EnergyGuard";

const hubID=1;

function createAccount (email, password) {
    /*
    createUserWithEmailAndPassword(auth, email, password)
    .then(function handleSignUp (userCredential) {
            // Signed in
            const user = userCredential.user;
            //model.setUser(user.email);
            set(ref(database, REF + "/users/"+ user.uid + "/hub/"), hubID);
            //model.setAuthErrorMessage(null);
        }
    )
    .catch(function handleError (error) {
            const errorCode = error.code;
            console.log(errorCode);
            //model.setAuthErrorMessage(errorCode);
        }
        
    );
    */
    set(ref(database, REF+"/users/"+"hub/"), hubID);
}

function writeUserData(userId, name, email) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email
    });
  }

export {createAccount, writeUserData};
