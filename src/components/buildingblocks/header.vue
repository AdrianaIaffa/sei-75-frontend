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



<style scoped>
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

</style>