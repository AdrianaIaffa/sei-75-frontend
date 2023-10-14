<template>
    <div class="addnewcontent">
      <form @submit.prevent="updateItem" class="wardrobe-item-form">
        <div class="add-item-container">
          <div class="left-column">
            <div class="form-group-left">
              <label for="picture">Picture URL:</label>
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
  
            <button class="btn-submit" type="submit">EDIT Item</button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { useRoute } from "vue-router";
  import { decodeCredential } from "vue3-google-login";
  
  export default {
    name: "editItem",
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
        // Extract the 'email' property from the decoded user data
        // and assign it to the useremail variable
        this.useremail = userData.email;
      }
      const route = useRoute();
      console.log("Route param id:", route.params.id);
      fetch(`http://localhost:4000/singleitem/${route.params.id}`, {})
        .then((response) => response.json())
        .then((result) => {
          this.item = result[0];
          this.categoryChanged();
        });
    },
    methods: {
      updateItem: function () {
        fetch(`http://localhost:4000/singleitem/${this.item._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.item),
        }).then(() => {
          this.$router.push({
            name: "singleItem",
            params: { id: this.item._id },
          });
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
  
  <style scoped>
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
  .form-group-sub {
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
    background-color: #5D5955;
  }
  
  .form-group-right select,
  .form-group-sub select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    background-color: #f9f9f9;
  }
  
  .form-group-right select:focus,
  .form-group-sub select:focus {
    border-color: #333;
  }
  
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
  