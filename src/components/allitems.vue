<template>
    <h1>all items</h1>
        <div class="item-card" v-for="item in items" :key="item._id">
            <img class="item-picture" :src="item.picture" alt="Wardrobe Item" />
        </div>
</template>

<script>
import { decodeCredential } from "vue3-google-login";
    export default {
        name: 'allWardrobeItems',
        data: () => ({
            error:'',
            items: [],
            useremail: ''
        }),
        mounted() {
            if (this.$cookies.isKey("user_session")) {
            // If the 'user_session' cookie exists, set isLoggedIn to true
            this.isLoggedIn = true;
            // Get the value of the 'user_session' cookie and decode its content
            const userData = decodeCredential(this.$cookies.get("user_session"));
            console.log(userData)
            // Extract the 'email' property from the decoded user data
            // and assign it to the useremail variable
            this.useremail = userData.email;
        }
            fetch('http://localhost:4000/allitems'), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify  ({
                    useremail: 'adrianaiaffabalart@gmail.com',
                })
            }
                
            .then(response => response.json())
            .then(result => {
                this.items = result
        })
        }

    }
</script>
<style scoped>
.item-card {
    border: 1px solid red;
    width: 200px;
}
.item-picture {
    width: 100px;
}

</style>