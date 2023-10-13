<template>
  <div class="mainuser">
    <!-- <div class="dashboard">
      <nav class="top-nav">
        <div class="nav-left">{{ userName }}</div>
        <div class="nav-right">
          <router-link to="/user/blog" class="nav-right-link">Blog</router-link>
          <router-link to="/user/marketplace" class="nav-right-link"
            >Marketplace</router-link
          >
          <span @click="handleLogout" class="nav-right-link">Logout</span>
        </div>
      </nav>
    </div> -->

    <div class="main-content">
      <!-- <nav class="vertical-nav">
        <ul>
          <li><router-link to="/addnew">Add New</router-link></li>
          <li><router-link to="/editItem">Edit Item</router-link></li>
          <li>
            <router-link to="/allitems/:email">View Wardrobe</router-link>
          </li>
          <ul v-if="subcategories.wardrobe" class="subcategories">
                      <li>Tops</li>
                      <li>Bottoms</li>
                      <li>Outwear</li>
                      <li>Shoes</li>
                      <li>Accessories</li>
                    </ul>
                    <li><router-link to="/singleItem/:id">View Garment</router-link></li>
        </ul>
      </nav> -->
      <div class="addnewcontent">
        <div class="item-card">
          <div
            v-for="item in items.wardrobeItems"
            :key="item._id"
            class="item-container"
          >
            <router-link :to="'/singleItem/' + item._id" :key="item._id">
              <img
                class="item-picture"
                :src="item.picture"
                alt="Wardrobe Item"
              />
            </router-link>
            <div class="item-details">
              <p>Category: {{ item.category }}</p>
              <p>Subcategory: {{ item.subcategory }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// console.log('Item:', item);
// console.log('Item _id:', item._id);
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
    fetch(`http://localhost:4000/allitems/${route.params.useremail}`, {})
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
.item-card {
  display: flex;
  flex-wrap: wrap; 
}

.item-container {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Add a box shadow */
  margin: 20px; /* Add margin for spacing between items */
  padding: 10px; /* Add padding to space the content from the border */
}

.item-picture {
  width: 200px;
}
.item-details {
  text-align: center; /* Center align the details */
}

/* .top-nav {
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
} */

.main-content {
  display: flex;
  flex-direction: row;
  flex: 1;
}

/* .vertical-nav {

  width: 200px;
  padding: 20px;
  height: 100vh;
  box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.2); 
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
} */

/* .nav-right-link {
  text-decoration: none;
  color: white;
  margin-right: 20px;
  cursor: pointer;
}
.nav-right-link:hover {
  text-decoration: underline;
  transition: text-decoration 0.3s;
} */
.addnewcontent {
  flex: 1;
  padding: 20px;
  width: 100%;
}
</style>
