<template>

<div class="mainuser">
      

        <div class="main-content">
            
          <div class="addnew-content">
            <div>
    <!-- <h1>Single Item</h1> -->
    <div class="card">
      <div v-for="id in item" :key="id._id" class="item-container">
        <img class="item-picture" :src="id.picture" alt="Wardrobe Item" />
        <div class="item-details">
          <p>Category: {{ id.category }}</p>
          <p>Subcategory: {{ id.subcategory }}</p>
        </div>
        <div class="item-actions">
          <router-link :to="'/editItem/' + id._id" class="action-button">
            Edit Item
          </router-link>
          <button class="action-button" @click="deleteItem(id._id)">
            Delete Item
          </button>
        </div>
      </div>
    </div>
  </div>
          </div>
        </div>
    </div>

      
</template>

<script>
import { decodeCredential } from "vue3-google-login";
import { useRoute } from 'vue-router';
import { ref } from "vue";
export default {
    name: 'singleItem',
    data: () => ({
        errors: '',
        item: {
          id:''
        },
        // useremail: ''
    }),
    setup() {
    const useremail = ref("");
    return { useremail };
  },
    mounted() {
            if (this.$cookies.isKey("user_session")) {
            
            this.isLoggedIn = true;
            
            const userData = decodeCredential(this.$cookies.get("user_session"));
            console.log(userData)
         
            this.useremail = userData.email;
            console.log(userData.email)
        }
            const route = useRoute()
            fetch(`${process.env.VUE_APP_BACKEND_API}/singleitem/${route.params.id}`, {
            })
            .then(response => response.json())
            .then(result => {
                this.item = result
                console.log(result)
        })
        }, methods: {
          logItemId() {
            console.log(this.item.id);
        },
          deleteItem: function () {
            // const id = this.$route.params.id;
            // console.log(this.$route.params.id)
            const useremail = this.useremail;
            console.log(useremail)
            const itemid = this.item[0]._id
            console.log(itemid)
            const route = useRoute()
            // fetch(`${process.env.VUE_APP_BACKEND_API}/books/titledetails/${route.params.id}`,{
            fetch(`${process.env.VUE_APP_BACKEND_API}/singleitem/${route.params}/${itemid}`,{
                method: "DELETE"
            })
            .then(() => {
                this.$router.replace({name: 'allWardrobeItems'})
            })
        } 
    }
}

</script>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
 
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
  margin-top: 10px;
}

.action-button  {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

/* .edit-button:hover,
.delete-button:hover {
  background-color: #5D5955;
} */


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
  /* box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.2);  */
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
  color: red; 

}
.addnew-content {
  flex: 1; 
  padding: 20px;
  width: 100%;
}

</style>