<template>

<nav class="vertical-nav">
                <ul>
                  <li><router-link to="/addnew">Add New</router-link></li>
                    <li><router-link to="/editItem">Edit Item</router-link></li>
                    <li><router-link to="/allitems/:email">View Wardrobe</router-link></li>
                    <ul v-if="subcategories.wardrobe" class="subcategories">
                      <li>Tops</li>
                      <li>Bottoms</li>
                      <li>Outwear</li>
                      <li>Shoes</li>
                      <li>Accessories</li>
                    </ul>
                   

                </ul>
            </nav>

</template>

<script>
import { decodeCredential, googleLogout } from "vue3-google-login";
import { useRoute } from "vue-router";
export default {
  name: "allWardrobeItems",
  data: () => ({
    error: "",
    items: {},
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
    const route = useRoute();
    fetch(`${process.env.VUE_APP_BACKEND_API}/allitems/${route.params.useremail}`, {})
      .then((response) => response.json())
      .then((result) => {
        this.items = result;
        console.log(result);
      });
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





.vertical-nav {
  width: 200px;
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.vertical-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.vertical-nav li {
  margin-bottom: 10px;
  transition: background-color 0.1s;
  padding: 5px;
}
.vertical-nav li:hover {
  background-color: #efefef;
  color: black;
}

a,
.router-link-exact-active {
  text-decoration: none;
  color: black;
}


</style>