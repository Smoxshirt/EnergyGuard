<script>
    import {RouterLink} from 'vue-router';
    import './main.css';
    import './mobile.css';

    export default {
        components: {
            RouterLink,
        },
    };
</script>

<template>
    <header class="top-header">
            <div class="dropdown">
            <button class="dropdown-button">
                <div class="dropdown-icon"></div>
                <div class="dropdown-icon"></div>
                <div class="dropdown-icon"></div>
            </button>
             <div class="dropdown-content">
                <h4>
                    <RouterLink to="/" class="dropdown-buttons-top">Home</RouterLink> 
                    <RouterLink to="/overview" class="dropdown-buttons">Overview</RouterLink>
                    <RouterLink to="/placeholder" class="dropdown-buttons">Buttons</RouterLink>
                    <RouterLink to="/details" class="dropdown-buttons">Details</RouterLink>
                </h4>
            </div>
        </div>
        <div class="logo-header">
            <h1 class="header-energyguard">EnergyGuard</h1>
            <img class="logo" src="./energyguard.png" alt="">
        </div>
        <RouterLink to="/login" class="login-button">Login</RouterLink>
        <div></div>
    </header>
</template>