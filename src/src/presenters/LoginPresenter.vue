<script>
import LoginView from '../views/LoginView.vue'
import { createNewUser, signInUser, signOutUser } from '../firebaseModel';
export default {
    data(){
        return {
            testVal: "Potato",
            email: "",
            password: "",
        }
    },
    components: {
        LoginView
    },
    methods: {
        storeData(mail, pw){
            //change this from firebase?
            this.email = mail;
            this.password = pw;
            createNewUser(mail, pw, this.signupCallback.bind(this));
        },
        logout(){
            if(confirm("Are you sure you want to log out?")){
                signOutUser(this.signOutCallback.bind(this));
            }
        },
        login(mail, pw){
            signInUser(mail,pw, this.signInCallback.bind(this));
        },
        signupCallback(){
            alert("Signed up!");
        },
        signInCallback(credentials){
            alert("Signed in!");
            this.model.isSignedIn = true;
            this.model.setEmail(credentials.user.email);
            console.log(credentials.user.email);
        },
        signOutCallback(){
            this.model.isSignedIn = false;
        }
    },
    props: {
        model: {}
    }
}
</script>

<template>
    <div>
        <LoginView @signup-info="storeData" 
        @user-logout="logout" 
        @user-login="login" 
        :isSignedIn=this.model.isSignedIn
        :getMailAddress=this.model.emailAddress />
    </div>
</template>