<template>
    <h1>all items</h1>
        <div class="item-card">
            
            <div v-for="item in items.wardrobeItems" :key="item._id" class="item-container">
                <router-link :to=" '/singleItem/' + item._id" :key="item._id">
                <img class="item-picture" :src="item.picture" alt="Wardrobe Item" />
                </router-link>
                <div class="item-details">
                    <p>Category: {{ item.category }}</p>
                    <p>Subcategory: {{ item.subcategory }}</p>
                </div>
            </div>
        </div>
</template>3

<script>
// console.log('Item:', item);
// console.log('Item _id:', item._id);
import { decodeCredential } from "vue3-google-login";
import { useRoute } from 'vue-router';
    export default {
        name: 'allWardrobeItems',
        data: () => ({
            error:'',
            items: {},
            useremail: ''
        }),
        mounted() {
            if (this.$cookies.isKey("user_session")) {
            
            this.isLoggedIn = true;
            
            const userData = decodeCredential(this.$cookies.get("user_session"));
            console.log(userData)
         
            this.useremail = userData.email;
            console.log(userData.email)
        }
            const route = useRoute()
            fetch(`http://localhost:4000/allitems/${route.params.useremail}`, {
            })
            .then(response => response.json())
            .then(result => {
                this.items = result
                console.log(result)
        })
        }

    }
</script>
<style scoped>
.item-card {
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next row if needed */
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

</style>