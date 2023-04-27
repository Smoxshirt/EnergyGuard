/*
    * firebaseModel.js is responsible for storing the state of the page and notifying the view when the state changes.
    * It is also responsible for communicating with the database.
*/

import firebaseConfig from "./firebaseConfig";
import EnergyModel from "./EnergyModel";

// Instructions from Firebase.
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, get, onChildRemoved, onChildAdded, onValue} from "firebase/database";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const REF="EnergyGuard";

function errorCallback(error){
    alert(error);
}

function createNewUser(email, password, callback){
    createUserWithEmailAndPassword(getAuth(), email, password).then(callback).catch(errorCallback);
}

function signInUser(email, password, callback){
    signInWithEmailAndPassword(getAuth(), email, password).then(callback).catch(errorCallback);
}

function signOutUser(callback) {
    signOut(getAuth()).then(callback).catch(errorCallback);
}

export { createNewUser, signInUser, signOutUser };
/*
function writeUserData(userId, name, email) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email
    });
  }

export {createAccount, writeUserData}; */
