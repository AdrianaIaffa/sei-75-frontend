<template>

<h1>hello</h1>
  <div>
    <h1>Your Outfits</h1>
    <ul class="outfits-list">
      <li v-for="(outfit, index) in outfits" :key="index" class="outfit-item">
        <h2>{{ outfit.name }}</h2>
        <!-- Add this block of code to log selectedItems -->
        <ul>
          <li v-for="(item, itemIndex) in outfit.selectedItems" :key="itemIndex">
            <!-- Log selectedItems here -->
            <img :src="item.picture" :alt="item.category" class="outfit-item-image" />
          </li>
        </ul>
        <!-- End of log block -->
      </li>
    </ul>
  </div>

</template>

<script>
import { decodeCredential } from "vue3-google-login";
import { ref } from "vue"

// import { useRoute } from "vue-router";
export default {
    name: 'allOutfits',
    data: () => ({
    error: "",
    outfits: {},
    // useremail: "",
  }),
  setup() {
        const useremail = ref('')
        return { useremail }
    },
  mounted() {
    if (this.$cookies.isKey("user_session")) {
      this.isLoggedIn = true;

      const userData = decodeCredential(this.$cookies.get("user_session"));
      console.log(userData);

      this.useremail = userData.email;
      this.userName = userData.given_name;
      console.log(userData.email);
    }
    // const route = useRoute();
    fetch(`http://localhost:4000/allOutfits/${this.useremail}`)
      .then((response) => response.json())
      .then((result) => {
        this.outfits = result;
        // console.log(result);
        console.log("Outfits data:", this.outfits)
        console.log("Outfits data:", this.outfits);


      });
}
}
</script>

<style scoped>
.outfits-list {
  list-style: none;
  padding: 0;
}

.outfit-item {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f9f9f9;
}

.outfit-item h2 {
  margin: 0;
  font-size: 1.2rem;
}

.outfit-item ul {
  list-style: none;
  padding: 0;
}

.outfit-item-image {
  max-width: 100px;
  max-height: 100px;
  margin-right: 10px;
}
</style>