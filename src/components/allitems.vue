<template>
  
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
    
  </template>
  
  <script>
  import { decodeCredential } from "vue3-google-login";
  import { ref } from "vue";
  export default {
    name: "allWardrobeItems",
    data: () => ({
      items: {},
      // useremail: "",
      isLoggedIn: false,
      userName: "",
    }),
    setup() {
    const useremail = ref("");
    return { useremail };
  },
    mounted() {
      if (this.$cookies.isKey("user_session")) {
        this.isLoggedIn = true;
        const userData = decodeCredential(this.$cookies.get("user_session"));
        this.useremail = userData.email;
        this.userName = userData.given_name;
      }
  
      fetch(`${process.env.VUE_APP_BACKEND_API}/allitems/${this.useremail}`)
        .then((response) => response.json())
        .then((result) => {
          this.items = result;
          console.log("this items", result)
        })
        .catch((error) => {
          console.error("Error fetching wardrobe items:", error);
        });
    },
  };
  </script>
  
  <style scoped>
  .item-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Center items horizontally */
  margin: 0 -10px; /* Negative margin to counteract box-shadow */
}
  
  
  .item-container {
    /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); */
    margin: 20px;
    padding: 10px;
    border: 1px solid #efefef;
  }
  
  .item-picture {
    width: 200px;
  }
  
  .item-details {
    text-align: start;
    padding: 10px;
  }
  

  </style>