<template>
  <div class="addnewcontent">
    <form @submit.prevent="newItem" class="wardrobe-item-form">
      <div class="add-item-container">
        <div class="left-column">
          <div class="form-group-left">
            <label for="picture" class="label-similar">Picture URL:</label>
            <input type="text" id="picture" v-model="item.picture" required />
            <img
              class="preview-image"
              :src="item.picture"
              alt="Preview"
              v-if="item.picture"
            />
          </div>
        </div>
        <div class="right-column">
          <div class="form-group-right">
            <label for="category">Category:</label>
            <select
              id="category"
              v-model="item.category"
              @change="categoryChanged"
            >
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
            <select
              id="subcategory"
              v-model="item.subcategory"
              :disabled="!item.category"
            >
              <option value="">Select Subcategory</option>
              <option
                v-for="subcat in subcategoryOptions"
                :key="subcat"
                :value="subcat"
              >
                {{ subcat }}
              </option>
            </select>
          </div>
          <button class="btn-submit common-button" type="submit">
            Add New Item
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { decodeCredential } from "vue3-google-login";
import { ref } from "vue";

export default {
  name: "addWardrobeItem",
  data: () => ({
    item: {
      picture: "",
      category: "",
      subcategory: "",
    },
    subcategoryOptions: [],
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
    }
  },
  methods: {
    newItem: function () {
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
          useremail: useremail,
        }),
      }).then((res) => {
        console.log(res.status);
        this.item.picture = "";
        this.item.category = "";
        this.item.subcategory = "";
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
  border: 1px solid #efefef;
  margin-right: 20px;
  height: 450px;
}

.right-column {
  flex: 1;
  padding: 20px;
  border: 1px solid #efefef;
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
  background-color: #5d5955;
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
