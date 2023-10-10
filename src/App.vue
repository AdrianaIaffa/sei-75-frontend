<template>
  <header>
    <div class="header-wrapper">
    <div class="top-bar">
      <h1>Outfit Forecast</h1>
    </div>
    <nav class="bottom-bar">
      <div class="links">
        <!-- <router-link to="/">Home</router-link> -->
        <p>Home</p>
        <p>Blog</p>
        <p>Marketplace</p>
        
        <!-- Add other links as needed -->
      </div>
    </nav>
  </div>

  </header>
  <main>
    <router-view :key="$route.path" />
  </main>

 
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
/* main {
  height: 100vh;
} */
.header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Align top and bottom bars */
  height: 100px;
  border-bottom: 3px solid #efefef;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2); /* Add shadow to the bottom border */

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

/* footer {
  height: 80px; 
  position: fixed; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  background-color: #efefef; 
  z-index: 1; 
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.2); 

}
.footer-content {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  
}

.footer-content p {
  margin: 5px; 
  padding-top: 20px;
  
} */

</style>
