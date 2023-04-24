
import firebaseConfig from "/src/firebaseConfig.js";

const REF="EnergyGuard";

firebase.initializeApp(firebaseConfig);  
firebase.database().ref(REF+"/test").set("dummy");

function observerRecap(model) {
    
    function payloadACB(payload){
        if(payload){
            /*
            if(payload.numberOfGuests){
                firebase.database().ref(REF+"/numberOfGuests").set(payload.numberOfGuests);
            }
            */
        }
        console.log(payload);
    }
    //model.addObserver(payloadACB);
}

function firebaseModelPromise() {
    function makeBigPromiseACB(firebaseData) {
        return;
    }
    //return firebase.database().ref(REF).once("value").then(makeBigPromiseACB);
}

function updateFirebaseFromModel(model) {
    //observerRecap(model);
    return;
}

function updateModelFromFirebase(model) {
    return;
}

export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase};