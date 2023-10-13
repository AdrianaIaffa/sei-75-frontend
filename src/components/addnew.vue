<template>

<div class="mainuser">
        <div class="dashboard">
            <nav class="top-nav">
                <div class="nav-left">Adriana{{ userName }}</div>
                <div class="nav-right">
                    <router-link to="/user/blog" class="nav-right-link" >Blog</router-link>
                    <router-link to="/user/marketplace" class="nav-right-link">Marketplace</router-link>
                    <span @click="handleLogout" class="nav-right-link">Logout</span>
                    <!-- <button @click="handleLogout">Logout</button> -->
                </div>
            </nav>
        </div>

        <div class="main-content">
            <nav class="vertical-nav">
                <ul>
                  <li><router-link to="/addnew">Add New</router-link></li>
                    <!-- <li><router-link to="/editItem">Edit Item</router-link></li> -->
                    <li><router-link to="/allitems/:email">View Wardrobe</router-link></li>
                    <!-- <ul v-if="subcategories.wardrobe" class="subcategories">
                      <li>Tops</li>
                      <li>Bottoms</li>
                      <li>Outwear</li>
                      <li>Shoes</li>
                      <li>Accessories</li>
                    </ul> -->
                    <!-- <li><router-link to="/singleItem/:id">View Garment</router-link></li> -->
                    <!-- <li><router-link to="/addblogpost">New Blog Post</router-link></li>
                    <li><router-link to="/user/your-blog-posts">Your Blog Posts</router-link></li> -->
                </ul>
            </nav>
          <div class="addnewcontent">
            
    <form @submit.prevent="newItem" class="wardrobe-item-form">
    <div class="add-item-container">
    <div class="left-column">
      
        <div class="form-group-left">
          <label for="picture" class="label-similar">Picture URL:</label>
          <input type="text" id="picture" v-model="item.picture" required />
          <img class="preview-image" :src="item.picture" alt="Preview" v-if="item.picture" />
        </div>
      
    </div>

    <div class="right-column">
      <div class="form-group-right">
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

      <div class="form-group-sub" v-if="item.category">
        <label for="subcategory">Subcategory:</label>
        <select id="subcategory" v-model="item.subcategory" :disabled="!item.category">
          <option value="">Select Subcategory</option>
          <option v-for="subcat in subcategoryOptions" :key="subcat" :value="subcat">
            {{ subcat }}
          </option>
        </select>
      </div>

      <button class="btn-submit common-button" type="submit">Add New Item</button>
      
    </div>
  </div>
</form>
          </div>
        </div>
    </div>
   
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
        }
    },
};
</script>

<style scoped>

.top-nav {
  background-color: #333 ;
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

.main-content {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.vertical-nav {
  /* background-color: #eee; */
  width: 200px;
  padding: 20px;
  height: 100vh;
  box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.2); /* Add shadow to the right side */
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
  /* width: 100%;
  display: block; */
}
.vertical-nav li:hover {
  background-color: #efefef; 
  color: black;
  /* width: 100%; */
}

a, .router-link-exact-active {
  text-decoration: none;
  color: black;
}

.nav-right-link {
  text-decoration: none;
  color: white;
  margin-right: 20px; 
  cursor: pointer; 
}
.nav-right-link:hover {
  /* color: red;  */
  text-decoration: underline;

}
.addnewcontent {
 
  width: 100%;
}


.add-item-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 30px;
}

.left-column {
  flex: 1;
  padding: 20px;
  border: 1px solid #ccc;
  margin-right: 20px;
  height: 450px;
}


.right-column {
  flex: 1;
  padding: 20px;
  border: 1px solid #ccc;
  height: 450px;
}

.form-group-left,
.form-group-right,
.form-group-sub
 {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
.preview-image {
  max-width: 200px; 
}
.btn-submit {
    margin-top: 30px;
    }
.form-group-right {
    margin-bottom: 10px;
   } 

   .common-button {
    padding: 10px 20px;
    margin-right: 10px;
    background-color: #333;
    color: #fff;
    text-decoration: none;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}
.common-button:hover {
    /* Define the hover styles for the buttons here */
    background-color: #5D5955;
}

.form-group-right select,
.form-group-sub select
 {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: #f9f9f9; /* Light gray background */
}

.form-group-right select:focus,
.form-group-sub select:focus {
  border-color: #333; /* Blue border color on focus */
}

/* Style the labels for Category and Subcategory */
.form-group-right label,
.form-group-sub label {
  font-weight: bold;
  margin-bottom: 5px;
}
.label-similar {
  font-weight: bold;
  margin-bottom: 5px;
}
#picture {
 width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    background-color: #f9f9f9;
}

</style>