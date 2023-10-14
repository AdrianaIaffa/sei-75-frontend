<template>
  <h1>outfitplanner</h1>

  <div class="main-continer">

    <div class="leftpannel">
      <a href="#" @click.prevent="toggleCategoriesDropdown">
        <div class="wardrobe-tab">
          Wardrobe
          <i
            class="fas fa-caret-down"
            :class="{ 'rotate-arrow': showCategories }"
          ></i>
        </div>
      </a>
      <div v-if="showCategories" class="categories-dropdown">
        <ul>
          <li
            v-for="(category, index) in Object.keys(categorizeItemsByCategory)"
            :key="index"
          >
            <a href="#" @click.prevent="selectCategory(category)">{{
              category
            }}</a>
          </li>
        </ul>
      </div>
      <div v-if="selectedCategory" class="items-of-category">
        <div
          class="itemcard"
          v-for="(item, index) in categorizeItemsByCategory[selectedCategory]"
          :key="index"
          @click="selectItem(item)"
        >
          <img :src="item.picture" :alt="item.category" />
        </div>
      </div>
    </div>

    <div class="right-panel">
      <!-- <div v-if="selectedItem">
        <h2>Selected Item</h2>
        <div v-for="(selectedItem, index) in selectedItems" :key="index">
          <img :src="selectedItem.picture" :alt="selectedItem.category" />
          <button @click="removeSelectedItem(index)">Remove</button>

        </div>
      </div> -->
      <div v-if="itemsEditable">
  <!-- Editable selected items -->
  <div v-for="(selectedItem, index) in selectedItems" :key="index">
    <img :src="selectedItem.picture" :alt="selectedItem.category" />
    <button @click="removeSelectedItem(index)">Remove</button>
  </div>
  <button @click="toggleItemsEditable">outfit done</button>
  <div>
      <input v-model="outfitName" placeholder="Enter outfit name" />
    </div>
  </div>

<div v-else>
  <!-- Non-editable selected items -->
  <div v-for="(selectedItem, index) in selectedItems" :key="index">
    <img :src="selectedItem.picture" :alt="selectedItem.category" />
  </div>
</div>
<div>
    <p>Outfit Name: {{ outfitName }}</p>
  </div>
<button @click="saveOutfit">Save Outfit</button>
    </div>
  </div>

  <!-- 
    <div
      class="categorycard"
      v-for="(category, index) in Object.keys(categorizeItemsByCategory)"
      :key="index"
    >
      <div class="itemcard">
        <button @click="previousImage(category)">Previous</button>
        <div
          class="itemcontainer"
          v-if="categorizeItemsByCategory[category].length > 0"
        >
          <img
            :src="
              categorizeItemsByCategory[category][currentIndex[category]]
                .picture
            "
            :alt="category"
          />
        </div>
        <button @click="nextImage(category)">Next</button>
      </div>
    </div> -->
</template>

<script>
// console.log('Item:', item);
// console.log('Item _id:', item._id);
import { decodeCredential, googleLogout } from "vue3-google-login";
// import { useRoute } from "vue-router";
import { ref } from "vue"
export default {
  name: "outfitPlanner",
  data: () => ({
    error: "",
    items: {},
    // useremail: "",
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
    showCategories: false,
    selectedCategory: null,
    selectedItem: [],
    selectedItems: [], 
    itemsEditable: true,
    outfitName: "", // Initial outfit name
  }), setup() {
        const useremail = ref('')
        return { useremail }
    },
  mounted() {
    if (this.$cookies.isKey("user_session")) {
      this.isLoggedIn = true;

      const userData = decodeCredential(this.$cookies.get("user_session"));

      this.useremail = userData.email;
      this.userName = userData.given_name;
    }
    // const route = useRoute();
    // console.log("this is the route", route)
    fetch(`http://localhost:4000/allitems/${this.useremail}`, {})
      .then((response) => response.json())
      .then((result) => {
        // this.items = categorizeItems(result);
        this.items = result;
        // console.log(result.wardrobeItems);
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
    // previousImage(category) {
    //   if (this.currentIndex[category] > 0) {
    //     this.currentIndex[category]--;
    //   }
    // },
    // nextImage(category) {
    //   const categoryItems = this.categorizeItemsByCategory[category];
    //   if (this.currentIndex[category] < categoryItems.length - 1) {
    //     this.currentIndex[category]++;
    //   }
    // },
    toggleCategoriesDropdown() {
      this.showCategories = !this.showCategories; // Toggle visibility
    },
    selectCategory(category) {
      this.selectedCategory = category;
    },
    selectItem(item) {
        this.selectedItems.push(item)
        console.log("Selected items:", this.selectedItems); // Add this line for debugging

    },
    removeSelectedItem(index) {
    this.selectedItems.splice(index, 1);
  },  toggleItemsEditable() {
    this.itemsEditable = !this.itemsEditable;
    // if (!this.itemsEditable)
  },
  saveOutfit: function () {
    console.log("saveOutfit method called");

            // Get the user's email address from the component's data
            const useremail = this.useremail;
            // console.log("Data being sent in the request body:");
  
  console.log("selectedItems:", this.selectedItems);
  
            fetch(`http://localhost:4000/outfitPlanner/${this.useremail}`
            , {
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
.then(res => {
    console.log(res.status);
    if (res.ok) {
        this.outfitName = "";
        this.selectedItems = [];
        console.log("Saved outfit");
    } else {
        console.error("Failed to save outfit");
        console.log(res)
    }
})
.catch(error => {
    console.error("An error occurred:", error);
});
        },
  },
};
</script>

<style scoped>
.itemcard {
  display: flex;
  flex-wrap: wrap;
}
.itemcontainer {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Add a box shadow */
  margin: 20px; /* Add margin for spacing between items */
  padding: 10px; /* Add padding to space the content from the border */
}
img {
  width: 100px;
}

.leftpannel{
    height: 200px;
    width: 50%;
    display: flex;
    flex-wrap: wrap;
}

</style>
