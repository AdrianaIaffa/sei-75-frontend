<template>
      <div>
    <h1>Single Item</h1>
    <div class="card">
      <div v-for="id in item" :key="id._id" class="item-container">
        <img class="item-picture" :src="id.picture" alt="Wardrobe Item" />
        <div class="item-details">
          <p>Category: {{ id.category }}</p>
          <p>Subcategory: {{ id.subcategory }}</p>
        </div>
        <div class="item-actions">
          <router-link :to="'/editItem/' + id._id" class="action-button edit-button">
            Edit Item
          </router-link>
          <button class="action-button delete-button" @click="deleteItem(id._id)">
            Delete Item
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { decodeCredential } from "vue3-google-login";
import { useRoute } from 'vue-router';
export default {
    name: 'singleItem',
    data: () => ({
        errors: '',
        item: {},
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
            fetch(`http://localhost:4000/singleitem/${route.params.id}`, {
            })
            .then(response => response.json())
            .then(result => {
                this.item = result
                console.log(result)
        })
        }
}

</script>

<style>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); */
}

.item-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.item-picture {
  width: 300px;
  height: auto;
}

.item-details {
  margin-top: 10px;
}

.item-actions {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.action-button {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.edit-button:hover,
.delete-button:hover {
  background-color: #5D5955;
}
</style>