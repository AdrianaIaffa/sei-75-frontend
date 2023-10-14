<template>
      <!-- <header>
        <div class="header-wrapper">
      <div class="top-bar">
        <h1>Outfit Forecast</h1>
      </div>
      <div class="bottom-bar">
        <router-link to="/blogPage" class="nav-right-link">GET TO KNOW US</router-link>
        <router-link to="/blogPage" class="nav-right-link">BLOG</router-link>
        <router-link to="/marketplace" class="nav-right-link">MARKETPLACE</router-link>
      </div>
    </div>
  </header> -->
    <div class="main">
        <div class="hello">
            <h2>REDISCOVER YOUR CLOSER</h2>
            <p>Our app redefines shopping. It's not about buying more</p> 
            <p>it's about wearing what you have,and wearing it in countless creative ways. </p>
            <p>Say goodbye to unnecessary purchases and embrace the beauty of your existing collection.</p>
        </div>
    <div class="signin-wrapper">
        <div class="signin-title">
            <h1>Sign In</h1>
        </div>
        <div v-if="isLoggedIn">
            <h2>{{ userName }}</h2>
            <button class="btn btn-primary" @click="handleLogOut">Log Out</button>
        </div>
        <div v-else>
            <GoogleLogin :callback="callback" />
        </div>
    </div>
</div>
 </template>
 
 <script>
 // Import the 'decodeCredential' function from the 'vue3-google-login' package.
 //The code imports the decodeCredential function from the 'vue3-google-login' package. 
 //This function will be used to decode the user's credentials from the Google login response.
 import { decodeCredential, googleLogout  } from 'vue3-google-login'
 
 // Log the Google client ID from the environment variables.
 console.log(process.env.VUE_APP_GOOGLE_CLIENT_ID)
 
 // Export the Vue component.
 // The Vue component is defined and exported. It's named "LoginForm."
 //Inside the component definition, the name property is set to "LoginForm,"
 // which is the name of the Vue component.
 export default {
     // Define the name of the Vue component.
     name: "loginPage",
     
     // Define the component's data properties.
     //The data property is defined to hold the component's data. 
     //It includes three properties: isInit, isLoggedIn, and userName. 
     //These properties will be used to manage the component's state.
     data: () => ({
         isInit: false,       // A flag to check if the component is initialized. is initially set to false, indicating that the component is not yet initialized.
         isLoggedIn: false,   // A flag to check if the user is logged in. is initially set to false, indicating that the user is not logged in.
         userName: ''         // A variable to store the user's name. is initially set to an empty string and will be used to store the user's first name.
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
     
     // Define the component's methods.
     //The methods property is defined to include the callback method, 
     //which will handle the response from Google login.
     methods: {
         // Callback function that handles the response from Google login.
         //The callback method is called when a response is received from Google login. 
         //It sets isLoggedIn to true to indicate that the user is now logged in.
         callback: function(response){
             // Set the 'isLoggedIn' flag to 'true' to indicate that the user is logged in.
             this.isLoggedIn = true
             
             // Decode the user's credentials from the Google login response.
             //It decodes the user's credentials from the Google login response using the decodeCredential function.
             const userData = decodeCredential(response.credential)
             
             // Log the user's data to the console for debugging purposes.
             console.log(userData)
             
             // Store the user's first name in the 'userName' variable.
             //Finally, the user's first name is extracted from the decoded data and stored in the userName variable.
             this.userName = userData.given_name
             this.$cookies.set('user_session', response.credential)
             fetch('http://localhost:4000/user/login', {
                 method: 'POST',
                 headers: {
                     "Content-Type": "application/json"
                 },
                 body: JSON.stringify({
                     email: userData.email
                 })
             })
             .then(() => {
                 console.log('session saved')
                 this.$router.push({ name: 'addWardrobeItem' });
             })
         },
         handleLogOut: function () {
             googleLogout()
             this.$cookies.remove('user_session')
             this.isLoggedIn = false
         }
     }
 }
 </script>

<style scoped>
.header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 3px solid #efefef;
  height: 110px; /* You can adjust the height as needed */
}

.top-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%; /* Adjust the height to control the top-bar's size */
}

.bottom-bar {
  display: flex;
  justify-content:space-evenly;
  align-items: center;
  height: 50%; /* Bottom-bar's height will take the remaining space */
  font-weight: bold;
}

a, .router-link-exact-active {
  text-decoration: none;
  color: black;
}

.nav-right-link {
  text-decoration: none;
  color: #2c3e50;
  margin-right: 20px;
  cursor: pointer;
}

.nav-right-link:hover {
  text-decoration: underline;
}

.main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-image: url('@/assets/landingpage.png') ;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
}
.hello {
  margin-left: 80px;
  padding: 20px; /* Add padding for spacing */
  text-align: start;
  font-weight: bold;
}

.hello p {
    margin: 0px;
}
.signin-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  margin-left: 80px; 
  
}
</style>