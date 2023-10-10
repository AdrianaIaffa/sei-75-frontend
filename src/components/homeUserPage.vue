<template>

    <div class="mainuser">

        <div class="dashboard">
            <nav class="top-nav">
                <div class="nav-left">Adriana{{ userName }}</div>
                <div class="nav-right">
                    <router-link to="/user/blog">Blog</router-link>
                    <router-link to="/user/marketplace">Marketplace</router-link>
                    <button @click="handleLogout">Logout</button>
                </div>
            </nav>
        </div>

        <div class="main-content">
            <nav class="vertical-nav">
                <ul>
                    <li><router-link to="/addnew">Add New Item</router-link></li>
                    <li><router-link to="/user/edit-item">Edit Item</router-link></li>
                    <li><router-link to="/user/view-wardrobe">View Wardrobe</router-link></li>
                    <li><router-link to="/addblogpost">New Blog Post</router-link></li>
                    <li><router-link to="/user/your-blog-posts">Your Blog Posts</router-link></li>
                </ul>
            </nav>
        </div>

    </div>
</template>

<script>
export default {
    name: 'homeUserPage',
    data: () => ({
        error: '',

    })
}
</script>

<style scoped>
/* .dashboard {
  display: flex;
  flex-direction: row;
} */

.top-nav {
  background-color: #333;
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
  background-color: #eee;
  width: 250px;
  padding: 20px;
}

.vertical-nav ul {
  list-style: none;
  padding: 0;
}

.vertical-nav li {
  margin-bottom: 10px;
}


</style>