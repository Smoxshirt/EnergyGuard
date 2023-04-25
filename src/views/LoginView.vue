<script>
    import './main.css';
    export default {
        methods: {
            mailChange(e){
                this.email = e.target.value;
            },
            passwordChange(e){
                this.password = e.target.value;
            },
            submit(){
                this.$emit('info-submit', this.email, this.password);
            },
            logout(){
                this.$emit('user-logout');
            }
        },
        data(){
            return {
                email: "",
                password: "",
            }
        },
        emits:['info-submit', 'user-logout'],
        props:{
            isSignedIn: Boolean,
        }
    }
</script>

<template>
    <h4>Please enter your e-mail and password</h4>
    <div>
        <input @change="mailChange" placeholder="E-mail" />
    </div>
    <div>
        <input type="password" @change="passwordChange" placeholder="Password" />
    </div>
    <div>
        <button @click="submit" class="buttons2">Submit</button>
    </div>
    <div v-if="this.isSignedIn">
      <button @click="logout" class="buttons2">Log out</button>
    </div>
</template>