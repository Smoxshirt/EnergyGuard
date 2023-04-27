<script>
import LoginView from '../views/LoginView.vue'
import { createNewUser, signInUser } from '../firebaseModel.js'
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
            this.email = mail;
            this.password = pw;
            this.model.isSignedIn = true;
            this.model.setEmail(mail);
            createNewUser(mail, pw, this.signupCallback.bind(this));
        },
        logout(){
            if(confirm("Are you sure you want to log out?")){
                this.model.isSignedIn = false;
            }
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
        <LoginView @info-submit="storeData" @user-logout="logout" :isSignedIn=this.model.isSignedIn />
    </div>
</template>