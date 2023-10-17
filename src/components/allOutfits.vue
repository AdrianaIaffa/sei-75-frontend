<template>

  <div class="page-content">
   <!-- <div class="item-card"></div> -->

      <div v-for="outfit in outfits.outfitItems" class="item-container" :key="outfit._id">
        <h2>{{ outfit.outfitName }}</h2>
        <!-- Add this block of code to log selectedItems -->
        <div class="image-container">
        <div v-for="selectedItem in outfit.selectedItems" :key="selectedItem._id" >
        <img :src="selectedItem.picture" :alt="selectedItem.category" class="item-picture" />
      </div>
    </div>
          </div>
       
        <!-- End of log block -->
     
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
    outfits: [],
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
    fetch(`${process.env.VUE_APP_BACKEND_API}/allOutfits/${this.useremail}`)
      .then((response) => response.json())
      .then((result) => {
        this.outfits = result;
        // console.log(result);
        console.log("Outfits data:", this.outfits)
        console.log("Outfits data:", result);


      });
}
}
</script>

<style scoped>

.page-content {
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
    width: 40%;
    display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center items horizontally */
 
  }
 .image-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

  .item-picture {
  width: 100px;
  }
</style>