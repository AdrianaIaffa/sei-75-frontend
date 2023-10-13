<template><header>
  <div class="header-wrapper">
  <div class="top-bar">
  <h1>Outfit Forecast</h1>
  </div>
      <nav class="bottom-bar">
      <div class="links">
     
      </div>
      </nav>
  </div>
</header>

    <!-- <div class="mainuser">
        <div class="dashboard">
            <nav class="top-nav">
                <div class="nav-left">Adriana{{ userName }}</div>
                <div class="nav-right">
                    <router-link to="/user/blog" class="nav-right-link" >Blog</router-link>
                    <router-link to="/user/marketplace" class="nav-right-link">Marketplace</router-link>
                    <span @click="handleLogout" class="nav-right-link">Logout</span>
                   
                </div>
            </nav>
        </div>

        <div class="main-content">
            <nav class="vertical-nav">
                <ul>
                  <li><router-link to="/addnew">Add New</router-link></li>
                    <li><router-link to="/editItem">Edit Item</router-link></li>
                    <li><router-link to="/allitems/:email">View Wardrobe</router-link></li>
                    <ul v-if="subcategories.wardrobe" class="subcategories">
                      <li>Tops</li>
                      <li>Bottoms</li>
                      <li>Outwear</li>
                      <li>Shoes</li>
                      <li>Accessories</li>
                    </ul>
                    <li><router-link to="/singleItem/:id">View Garment</router-link></li>

                </ul>
            </nav>
          <div class="addnew-content">
          
          </div>
        </div>
    </div> -->
</template>

<script>
// import addWardrobeItem from '../components/addnew'

export default {
    name: 'homeUserPage',
    data: () => ({
        error: '',
        activeComponent: null,
  //       return: {
  //         subcategories: {
  //         tops: false,
  //         bottoms: false,
  //         outwear: false,
  //         shoes: false,
  //         accessories: false,
  //   },
  // }
    }),
  // methods: {
  //   loadComponent(addWardrobeItem) {
  //     this.activeComponent = addWardrobeItem; // Set the active component based on what's clicked
  //   },
  //   toggleSubcategories(category) {
  //   this.subcategories[category] = !this.subcategories[category];
  // },
  // }
  // ,
  // components: {
  //   'addWardrobeItem'  
  // }
}
</script>

<style scoped>
/* .dashboard {
  display: flex;
  flex-direction: row;
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
.header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  height: 100px;
  border-bottom: 3px solid #efefef;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2); 

}
.top-bar {
  display: flex;
  justify-content: center; 
  align-items: center; 
  padding-top: 40px;
  height: 50%; 
}
.links {
  display: flex;
  justify-content: center; 
  align-items: center;
  flex: 1; 
}
.links p {
  margin-left: 10px; 
}

.bottom-bar {
  display: flex;
  justify-content: center; 
  padding-top: 40px;
  height: 50%; 
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

addnew-content {
  flex: 1; /* Take up the remaining space */
  padding: 20px; /* Add some padding for spacing */
}

</style>