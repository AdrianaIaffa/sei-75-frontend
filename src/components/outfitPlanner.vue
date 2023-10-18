<template>
  <div class="main-continer">
    <div class="clothesnav">
   
      <ul class="categories-navbar">
        <li
          v-for="(category, index) in Object.keys(categorizeItemsByCategory)"
          :key="index" class="btn"
        >
          <a href="#" @click.prevent="selectCategory(category)" class="btnlink">{{
            category
          }}</a>
        </li>
      </ul>
   
      <div class="items-of-category">
        <div v-if="selectedCategory">
          <div class="item-scroll-container">
            <div
              class="itemcard"
              v-for="(item, index) in categorizeItemsByCategory[
                selectedCategory
              ]"
              :key="index"
              @click="selectItem(item)"
            >
              <img :src="item.picture" :alt="item.category" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="outfit-panel">
      

      <div class="left-section">
        
        <div v-if="itemsEditable" class="outfit-selection">
          <!-- Editable selected items -->
          <div
            v-for="(selectedItem, index) in selectedItems"
            :key="index"
            class="outfit-image-selected"
          >
            <img :src="selectedItem.picture" :alt="selectedItem.category" />
            <button @click="removeSelectedItem(index)" class="remove-button">
              x
            </button>
          </div>
        </div>

        <div v-else class="outfit-selection">
          <!-- Non-editable selected items -->
          <div
            v-for="(selectedItem, index) in selectedItems"
            :key="index"
            class="outfit-image-selected-noteditable"
          >
            <img :src="selectedItem.picture" :alt="selectedItem.category" />
          </div>
    
        </div>
      </div>

      <div class="right-section">
        <div v-if="itemsEditable">
          <button class="btn" @click="toggleItemsEditable">Preview Outfit</button>
          <div>
            <input v-model="outfitName" placeholder="Enter outfit name" style="margin-top: 20px;"/>
          </div>
        </div>
        <!-- <button  @click="toggleItemsEditable">Outfit Done</button> -->
        <div v-else>
          <p>Outfit Name: {{ outfitName }}</p>
          <button class="btn" style="margin-right: 10px;" @click="toggleItemsEditable">Edit Outfit</button>

          <button class="btn" @click="saveOutfit">Save Outfit</button>
        </div>
      </div>




    </div>
  </div>

</template>

<script>

import { decodeCredential, googleLogout } from "vue3-google-login";

import { ref } from "vue";
export default {
  name: "outfitPlanner",
  data: () => ({
    error: "",
    items: {},
    
    isLoggedIn: false,
    userName: "",
    categories: {},
    currentIndex: {
      tops: 0,
      bottoms: 0,
      outwears: 0,
      accessories: 0,
      shoes: 0,
    },
    isCategorySelected: false,
    showCategories: true,
    selectedCategory: null,
    selectedItem: [],
    selectedItems: [],
    itemsEditable: true,
    outfitName: "", // Initial outfit name
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
  
    fetch(`${process.env.VUE_APP_BACKEND_API}/allitems/${this.useremail}`, {})
      .then((response) => response.json())
      .then((result) => {
        
        this.items = result;
      
      });
  },
  computed: {
    categorizeItemsByCategory() {
      let categorizedItems = {
        tops: [],
        bottoms: [],
        outwears: [],
        accessories: [],
        shoes: [],
      };

      if (this.items && this.items.wardrobeItems) {
        this.items.wardrobeItems.forEach((item) => {
          const category = item.category;

          // Check if the category is recognized
          if (category in categorizedItems) {
            categorizedItems[category].push(item);
          }
        });
      }

      return categorizedItems;
    },
  },
  methods: {
    handleLogout: function () {
      googleLogout();
      this.$cookies.remove("user_session");
      this.isLoggedIn = false;
      this.userName = "";
      this.$router.push({ name: "loginPage" });
    },
  
    selectCategory(category) {
      this.selectedCategory = category;
      this.isCategorySelected = true; // Set the flag to true when a category is selected
    },
  
    selectItem(item) {
      this.selectedItems.push(item);
      console.log("Selected items:", this.selectedItems); // Add this line for debugging
    },
    removeSelectedItem(index) {
      this.selectedItems.splice(index, 1);
    },
    toggleItemsEditable() {
      this.itemsEditable = !this.itemsEditable;
    },
    saveOutfit: function () {
      console.log("saveOutfit method called");

      const useremail = this.useremail;

      console.log("selectedItems:", this.selectedItems);

      fetch(`${process.env.VUE_APP_BACKEND_API}/outfitPlanner/${this.useremail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          outfitName: this.outfitName,
          selectedItems: this.selectedItems,
          useremail: useremail,
        }),
      })
        .then((res) => {
          console.log(res.status);
          if (res.ok) {
            this.outfitName = "";
            this.selectedItems = [];
            console.log("Saved outfit");
          } else {
            console.error("Failed to save outfit");
            console.log(res);
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    },
  },
};
</script>

<style scoped>

.itemcontainer {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Add a box shadow */
  margin: 20px; /* Add margin for spacing between items */
  padding: 10px; /* Add padding to space the content from the border */
}
img {
  width: 200px;
}
.itemcard {

    border: 1px solid #efefef;
    padding: 10px;

}
/* .leftpannel {
  height: 200px;
  width: 50%;
  display: flex;
  flex-wrap: wrap;
} */


.categories-navbar {
  list-style: none;
  display: flex;
  padding: 0;
  width: 100%;
  justify-content: space-evenly;
}

.categories-navbar li {
  margin-right: 20px; /* Adjust this margin to your desired spacing */
}

/* styles for category images */
.items-of-category {
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  /* border-bottom: 1px solid red; */
  height: 300px;
}

.item-scroll-container {
  display: flex;
  flex-wrap: nowrap;
  padding: 20px;
}

.itemcard {
  flex: 0 0 auto;
  margin-right: 10px; /* Adjust this margin to your desired spacing */
}
.outfit-panel {
  display: flex;
  width: 100%;
}

.left-section {
  flex: 3; /* Take up all available horizontal space */
  /* border-right: 1px solid red; */
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap */
  justify-content: flex-start; /* Align items to the left */
}
.outfit-selection {
  display: flex;
  flex-wrap: wrap; /* Allow outfit selection items to wrap */
  padding: 20px;
}

.outfit-selection img {
    /* padding-left: 20px; */
    border: 1px solid #efefef;
    padding: 10px;
}
.outfit-image-selected-noteditable {
    margin-right: 10px;
}
.right-section {
  flex: 1; /* Take up all available horizontal space */
  padding: 10px; /* Add some padding for spacing */
}

.btn {
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
.btnlink {
color: white;      /* Set link color to white */
  text-decoration: none;  /* Remove underlines */
}
</style>
