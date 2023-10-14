<template>
  <!-- <header> -->
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
  <!-- </header> -->
</template>

<script>

// import { decodeCredential, googleLogout  } from 'vue3-google-login'
export default {
  name: 'homeUserPage',
  data: () => ({
    error: '',
    activeComponent: null,
  }),
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

</style>

