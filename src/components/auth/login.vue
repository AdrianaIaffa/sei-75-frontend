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
      <h2>REDISCOVER YOUR CLOSET</h2>
      <p>Our app redefines shopping. It's not about buying more</p>
      <p>
        it's about wearing what you have,and wearing it in countless creative
        ways.
      </p>
      <p>
        Say goodbye to unnecessary purchases and embrace the beauty of your
        existing collection.
      </p>
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

  <div class="about-us">
    <div class="about-section">
      <!-- Image left, Text right -->
      <div class="image-container">
        <img src="https://i.imgur.com/hMXLBLH.jpg" title="source: imgur.com" />
      </div>
      <div class="text-container">
        <h3>Introducing Your Wardrobe Companion</h3>
        <p>
          With Your Wardrobe Companion, we invite you to explore the hidden gems
          within your closet. It's like shopping without spending a dime. Our
          app allows you to catalog every piece of clothing, from your favorite
          vintage jacket to that old pair of jeans you've had for years.
        </p>
        <h3>Curate Your Outfits</h3>
        <p>
          Create outfits from your cataloged items effortlessly. Mix and match
          in a virtual dressing room to see how different combinations look.
          We're all about promoting creativity and helping you find new ways to
          style your existing pieces.
        </p>
        <h3>Sustainability at Its Core</h3>
        <p>
          We're all about conscious and sustainable fashion. Forget the idea of
          buying new clothes every season. Our mission is to promote a more
          sustainable lifestyle. We believe in the power of your existing
          wardrobe, and we're here to show you how to utilize it to the fullest.
        </p>
        <h3>Track and Reevaluate</h3>
        <p>
          Wondering if you're making the most of your clothes? Your Wardrobe
          Companion helps you track how often you wear each item. We'll even
          gently nudge you if some pieces have been collecting dust for too
          long.
        </p>
      </div>
    </div>

    <div class="about-section">
      <!-- Text left, Image right -->
      <div class="text-container">
        <h3>Swap and Recycle</h3>
        <p>
          Consider passing along those rarely worn items. We provide an option
          to swap with others in the community who are also looking for ways to
          refresh their wardrobes. Or, if you decide it's time to say goodbye to
          certain pieces, we can guide you to local recycling centers.
        </p>
        <h3>Wardrobe Wisdom</h3>
        <p>
          We're not just an app; we're your fashion-savvy friend. Our blog
          section is filled with advice on caring for your clothes, DIY repair
          tips, and spotlights on innovative designers who specialize in
          upcycling and recycling fabrics.
        </p>
        <p>
          Your Wardrobe Companion is more than an app; it's a mindset shift
          towards sustainable fashion. It's time to fall in love with your
          closet all over again and embrace a more conscious approach to your
          fashion choices. Start shopping your wardrobe, and discover a world of
          style waiting to be explored.
        </p>
      </div>
      <div class="image-container">
       <img src="https://i.imgur.com/NHpqEtQ.jpg" title="source: imgur.com" />
      </div>
    </div>
  </div>
</template>

<script>
// Import the 'decodeCredential' function from the 'vue3-google-login' package.
//The code imports the decodeCredential function from the 'vue3-google-login' package.
//This function will be used to decode the user's credentials from the Google login response.
import { decodeCredential, googleLogout } from "vue3-google-login";

// Log the Google client ID from the environment variables.
console.log(process.env.VUE_APP_GOOGLE_CLIENT_ID);

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
    isInit: false, // A flag to check if the component is initialized. is initially set to false, indicating that the component is not yet initialized.
    isLoggedIn: false, // A flag to check if the user is logged in. is initially set to false, indicating that the user is not logged in.
    userName: "", // A variable to store the user's name. is initially set to an empty string and will be used to store the user's first name.
  }),
  mounted() {
    // Check if a specific cookie key, 'user_session', exists
    if (this.$cookies.isKey("user_session")) {
      // If the 'user_session' cookie exists, set isLoggedIn to true
      this.isLoggedIn = true;
      // Get the value of the 'user_session' cookie and decode its content
      const userData = decodeCredential(this.$cookies.get("user_session"));
      // Extract the 'given_name' property from the decoded user data
      // and assign it to the userName variable
      this.userName = userData.given_name;
    }
  },

  // Define the component's methods.
  //The methods property is defined to include the callback method,
  //which will handle the response from Google login.
  methods: {
    // Callback function that handles the response from Google login.
    //The callback method is called when a response is received from Google login.
    //It sets isLoggedIn to true to indicate that the user is now logged in.
    callback: function (response) {
      // Set the 'isLoggedIn' flag to 'true' to indicate that the user is logged in.
      this.isLoggedIn = true;

      // Decode the user's credentials from the Google login response.
      //It decodes the user's credentials from the Google login response using the decodeCredential function.
      const userData = decodeCredential(response.credential);

      // Log the user's data to the console for debugging purposes.
      console.log(userData);

      // Store the user's first name in the 'userName' variable.
      //Finally, the user's first name is extracted from the decoded data and stored in the userName variable.
      this.userName = userData.given_name;
      this.$cookies.set("user_session", response.credential);
      fetch(`${process.env.VUE_APP_BACKEND_API}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
        }),
      }).then(() => {
        console.log("session saved");
        this.$router.go()
        this.$router.push({ name: "addWardrobeItem" });
      });
    },
    handleLogOut: function () {
      googleLogout();
      this.$cookies.remove("user_session");
      this.isLoggedIn = false;
    },
  },
};
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
  justify-content: space-evenly;
  align-items: center;
  height: 50%; /* Bottom-bar's height will take the remaining space */
  font-weight: bold;
}

a,
.router-link-exact-active {
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
  background-image: url("https://i.imgur.com/iwQarAd.png");
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

/* .about-us {
  display: flex;
  flex-direction: column;
  align-items: center; 

  height: 100vh;
  justify-content: space-evenly;
} */

.about-section {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 20px;
}

.image-container {
  flex: 1;
  text-align: center;
}

img {
  max-width: 100%;
  height: auto;
}

.text-container {
  flex: 2;
  text-align: left;
  padding-left: 30px;
  padding-right: 30px;
}


h3 {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  /* padding-bottom: 10px; */
}

p {
  font-size: 16px;
  margin: 0;
}
</style>
