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
            this.model.isSignedIn = true;
            this.model.setEmail(mail);
            createNewUser(mail, pw, this.signupCallback.bind(this));
        },
        logout(){
            if(confirm("Are you sure you want to log out?")){
                signOutUser;
                this.model.isSignedIn = false;
            }
        },
        login(mail, pw){
            signInUser(mail,pw, this.signupCallback.bind(this));
            this.model.isSignedIn = true;
            
        },
        signupCallback(){
            confirm("Signed up!");
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