<script>
    import { changePassword } from '../firebaseModel';
import './main.css';
    import './mobile.css';
    export default {
        methods: {
            mailChange(e){
                this.email = e.target.value;
            },
            passwordChange(e){
                this.password = e.target.value;
            },
            login(){
                this.$emit('user-login', this.email, this.password);
            },
            logout(){
                this.$emit('user-logout');
            },
            signup(){
                this.$emit('signup-info', this.email, this.password);
            },
            changePassword(){
                this.$emit('change-password', this.password);
            },
            changePwFlag(){
                this.$emit('changePwFlag');
            }
        },
        data(){
            return {
                email: "",
                password: "",
            }
        },
        emits:['signup-info', 'user-logout', 'user-login', 'change-password', 'changePwFlag'],
        props:{
            isSignedIn: Boolean,
            getMailAddress: String,
            changeFlag: Boolean
        },
        computed: {
            email() {
                return this.email;
            }
  },
    }
</script>

<template>
    <div class="general-container">
        <h4 v-if="!this.isSignedIn">Please enter your e-mail and password</h4>
        <h4 v-else>Welcome {{ this.getMailAddress }}</h4>

        <div v-if="!this.isSignedIn">
            <input type="text" @change="mailChange" placeholder="E-mail" />
        </div>
        <div v-if="!this.isSignedIn">
            <input type="password" @change="passwordChange" placeholder="Password" />
        </div>
        <div v-if="!this.isSignedIn">
            <button @click="login" class="buttons2">Log in</button>
        </div>
        <div v-else>
            <button @click="logout" class="buttons2">Log out</button>
        </div>


        <div v-if="this.isSignedIn">
            <button @click="changePwFlag" class="buttons2">Change password</button>
        </div>
        <div v-if="this.isSignedIn && this.changeFlag">
            <input type="password" @change="passwordChange" placeholder="New password" />
        </div>
        <div v-if="this.isSignedIn && this.changeFlag">
            <button @click="changePassword" class="buttons2">Change it!</button>
        </div>
        <div v-if="this.isSignedIn && this.changeFlag">
            <button @click="changePwFlag" class="buttons2">Cancel</button>
        </div>
        <div v-if="!this.isSignedIn">
            <button @click="signup" class="buttons2">Sign up</button>
        </div>
    </div>
</template>