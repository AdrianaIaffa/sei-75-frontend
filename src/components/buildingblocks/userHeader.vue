<template>
  <div class="dashboard">
    <nav class="top-nav">
      <div class="nav-left">{{ userName }}</div>
      <div class="nav-right">
        <router-link to="/blogPage" class="nav-right-link">Blog</router-link>
        <router-link to="/marketplace" class="nav-right-link"
          >Marketplace</router-link
        >
        <span @click="handleLogout" class="nav-right-link">Logout</span>
      </div>
    </nav>
  </div>
</template>
<script>
import { decodeCredential, googleLogout } from "vue3-google-login";
// import { useRoute } from "vue-router";

export default {
  name: "userHeader",
  data: () => ({
    error: "",
    useremail: "",
    isLoggedIn: false,
    userName: "",
  }),
  mounted() {
    if (this.$cookies.isKey("user_session")) {
      this.isLoggedIn = true;

      const userData = decodeCredential(this.$cookies.get("user_session"));
      console.log(userData);

      this.useremail = userData.email;
      this.userName = userData.given_name;
      console.log(userData.email);
    }
    // Rest of the mounted function
  },
  methods: {
    handleLogout: function () {
      googleLogout();
      this.$cookies.remove("user_session");
      this.isLoggedIn = false;
      this.userName = "";
      this.$router.push({ name: "loginPage" });
    },
  },
};
</script>

<style scoped>
.top-nav {
  background-color: #333;
  color: white;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.nav-right {
  display: flex;
  justify-content: flex-end;
}

.nav-right-link {
  text-decoration: none;
  color: white;
  margin-right: 20px;
  cursor: pointer;
}

.nav-right-link:hover {
  text-decoration: underline;
  transition: text-decoration 0.3s;
}
</style>
