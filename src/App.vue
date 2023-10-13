<template>
  <HomeUserPage/>
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
  /* margin-top: 60px; */
}
/* main {
  height: 100vh;
} */
/* .header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  border-bottom: 3px solid #efefef;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2); 

}
.top-bar {
  display: flex;
  justify-content: center; 
  align-items: center; 
  padding-top: 40px;
  height: 50%; 
}
.links {
  display: flex;
  justify-content: center; 
  align-items: center;
  flex: 1; 
}
.links p {
  margin-left: 10px; 
}

.bottom-bar {
  display: flex;
  justify-content: center; 
  padding-top: 40px;
  height: 50%; 
} */

/* footer {
  height: 80px; 
  position: fixed; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  background-color: #efefef; 
  z-index: 1; 
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.2); 

}
.footer-content {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  
}

.footer-content p {
  margin: 5px; 
  padding-top: 20px;
  
} */

</style>
