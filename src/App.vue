<template>
  <HomeUserPage />
  <UserHeader v-if="isLoggedIn"/>

  <main>
   
    <section>
      <router-view :key="$route.path" />
    </section>
    
  </main>

 
</template>

<script>

import UserHeader from './components/buildingblocks/userHeader.vue';
import HomeUserPage from './components/homeUserPage.vue';
 import { decodeCredential } from 'vue3-google-login'

export default {
    name: 'App',
    components: { HomeUserPage, UserHeader },
    data: () => ({
    isLoggedIn: false,
  }),
  mounted() {
        // Check if a specific cookie key, 'user_session', exists
         if (this.$cookies.isKey('user_session')) {
            // If the 'user_session' cookie exists, set isLoggedIn to true
             this.isLoggedIn = true
             // Get the value of the 'user_session' cookie and decode its content
             const userData = decodeCredential(this.$cookies.get('user_session'))
             // Extract the 'given_name' property from the decoded user data
            // and assign it to the userName variable
             this.userName = userData.given_name
         }
     },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
