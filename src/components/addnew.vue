<template>
    <h1>ADD NEW ITEM</h1>
    <form @submit.prevent="newItem" class="wardrobe-item-form">

        <div class="form-group">
            <label for="picture">Picture URL:</label>
            <input type="text" id="picture" v-model="item.picture" required />
            <label for="category">Category:</label>
            <select id="category" v-model="item.category" @change="categoryChanged">
                <option value="">Select Category</option>
                <option value="tops">Tops</option>
                <option value="bottoms">Bottoms</option>
                <option value="outwears">Outwears</option>
                <option value="accessories">Accessories</option>
                <option value="shoes">Shoes</option>
            </select>
        </div>
        
        <div class="form-group" v-if="item.category">
            <label for="subcategory">Subcategory:</label>
            <select id="subcategory" v-model="item.subcategory">
                <option value="">Select Subcategory</option>
                <option v-for="subcat in subcategoryOptions" :key="subcat" :value="subcat">
                    {{ subcat }}
                </option>
            </select>
        </div>
        <!-- <button type="submit" v-on:click="upload">Upload Picture</button> -->
        <button type="submit">Add New Item</button>
        <!-- <h3 v-if="success">File Uploaded Successfully. publicId: {{ success }}</h3> -->
    </form>
</template>

<script>
import { decodeCredential } from "vue3-google-login";
export default {
    name: "addWardrobeItem",
    data: () => ({
        error: "",
        item: {
            picture: "",
            category: "",
            subcategory: "",
            userid: "",
            useremail: "",
        },
        subcategoryOptions: [],
        
    }),
    mounted() {
        // Check if a specific cookie key, 'user_session', exists
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
    },
    methods: {
        newItem: function () {
            // Get the user's email address from the component's data
            const useremail = this.useremail;
            fetch("http://localhost:4000/addnew", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    picture: this.item.picture,
                    category: this.item.category,
                    subcategory: this.item.subcategory,
                    userid: this.item.userid,
                    useremail: useremail,
                }),
            }).then(res => {
                console.log(res.status);
                this.item.picture = "";
                this.item.category = "";
                this.item.subcategory = "";
                this.item.userid = "";
            });
        },
        categoryChanged: function () {
            const selectedCategory = this.item.category;

            if (selectedCategory === "tops") {
                this.subcategoryOptions = ["long sleeve", "short sleeve", "sleeveless"];
            } else if (selectedCategory === "bottoms") {
                this.subcategoryOptions = ["skirts", "shorts", "trousers"];
            } else if (selectedCategory === "outwears") {
                this.subcategoryOptions = ["coats", "jackets"];
            } else if (selectedCategory === "accessories") {
                this.subcategoryOptions = ["bags", "scarfs", "headwear"];
            } else if (selectedCategory === "shoes") {
                this.subcategoryOptions = ["boots", "shoes", "sandals"];
            } else {
                this.subcategoryOptions = [];
            }
        },
    },
};
</script>

