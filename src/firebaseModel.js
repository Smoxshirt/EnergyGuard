/*
    * firebaseModel.js is responsible for storing the state of the page and notifying the view when the state changes.
    * It is also responsible for communicating with the database.
*/

import firebaseConfig from "./firebaseConfig";
import EnergyModel from "./EnergyModel";

// Instructions from Firebase.
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, get, onChildRemoved, onChildAdded, onValue} from "firebase/database";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,updatePassword, signOut, onAuthStateChanged, sendPasswordResetEmail, confirmPasswordReset} from "firebase/auth";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const auth2 = getAuth();

const REF="EnergyGuard";

function observeAuth(callback){
    onAuthStateChanged(auth, callback)
}

function testFunction(){
    console.log(auth.currentUser);
}

function isLoggedIn(){
    if(auth.currentUser){
        return true;
    }else{
        return false;
    }
}

function getEmail(){
    if(auth.currentUser){
        return auth.currentUser.email;
    }else{
        return "";
    }
}

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

function changePassword(newPassword, callback){
    updatePassword(auth.currentUser, newPassword).then(callback).catch(errorCallback);
}

function resetPassword(email, callback){
    console.log(email)
    sendPasswordResetEmail(auth2, email).then(callback).catch(errorCallback);
}

/*
export const passwordReset = async (email: string) => {
    return await sendPasswordResetEmail(auth, email)
  }

  export const confirmThePasswordReset = async (
    oobCode:string, newPassword:string
  ) => {
    if(!oobCode && !newPassword) return;
    
    return await confirmPasswordReset(auth, oobCode, newPassword)
  }
*/

/*
function payloadACB(payload){ //with observer change, changes info on firebase
    //add date? add device? 

    
    //user specific
    if (auth.currentUser) {

    }
}
*/

function firebaseModelPromise(){ //make promises

}

function updateFirebaseFromModel(){

    function payloadACB(payload){
        //user specific
        if (auth.currentUser) {
            if(payload.deviceToAdd){
                set(ref(db, 'users/' + auth.currentUser.uid + "/devices" + payload.deviceToAdd.id), payload.deviceToAdd.name), {
            }

            if(payload.deviceToRemove){
                set(ref(db, 'users/' + auth.currentUser.uid + "/devices" + payload.deviceToRemove.id), null), {
            }

            if(payload.turnOnDevice){//unnecessary?
                set(ref(db, 'users/' + auth.currentUser.uid + "/devices/" + payload.turnOnDevice.id), payload.deviceToAdd.name), {
            }


        }
    }

    model.addObserver(payloadACB)

}
        }
    }}

function updateModelFromFirebase(model){
    if(auth.currentUser){

        onValue(ref(db, 'users/' + auth.currentUser.uid + "/devices/" ), 
            function dataChangedInFB(data){
                model.updateValueInModel(data.val());
            }
        )

        onChildAdded(ref(db, 'users/' + auth.currentUser.uid + "/devices/" ),
            function deviceAdded(data){
                function deviceAlreadyAddedCB(device){
                    return device.id === data.key;
                }
                if(!model.devices.find(deviceAlreadyAddedCB)) {
                    function addDeviceACB(device){
                        model.addDevice(device);
                    }
                    //fetch device id then add device to model (addDeviceACB)
                }
            }
        
        )

        onChildRemoved(ref(db, 'users/' + auth.currentUser.uid + "/devices/" ),
            function deviceRemoved(data){
                //remove device in model where id is data.key(which is from firebase)
            }
        )


    }

    
}

/* function writeUserData(path, data) {
    if(auth.currentUser){
        const db = getDatabase();
        set(ref(db, 'users/' + auth.currentUser.uid + "/" + path), {
            value: data
        });
    } else{
        alert("You need to be logged in to add data.");
    }
  } 
*/

  function writeUserData(path, data) {
    if(auth.currentUser){
        const db = getDatabase();
        set(ref(db, 'users/' + auth.currentUser.uid + "/" + path), data);
    } else{
        alert("You need to be logged in to add data.");
    }
  }

  function setUserData(path, data) {
    if(auth.currentUser){
        const db = getDatabase();
        set(ref(db, 'users/' + auth.currentUser.uid + "/" + path), data);
    } else{
        alert("You need to be logged in to add data.");
    }
  }


  function readUserData(path, callback){
    if(auth.currentUser){
        const db = getDatabase();
        const fullPath = ref(db, 'users/' + auth.currentUser.uid + "/" + path);
        onValue(fullPath, callback);
    } else{
        alert("You need to be logged in to read data.")
    }
  }

  function readUserDataOnce(path, callback){
    if(auth.currentUser){
        const db = getDatabase();
        const fullPath = ref(db, 'users/' + auth.currentUser.uid + "/" + path);
        onValue(fullPath, callback, {onlyOnce: true});
    } else{
        alert("You need to be logged in to read data.")
    }
  }

  function readUserDataModel(path, callback){
        const db = getDatabase();
        const fullPath = ref(db, 'users/' + auth.currentUser.uid + "/" + path);
        onValue(fullPath, callback);
  }


export { createNewUser, signInUser, signOutUser, writeUserData, readUserData,changePassword, testFunction, isLoggedIn, getEmail, observeAuth, resetPassword };