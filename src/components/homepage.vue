<template>
    <!-- <header>
        <div class="header-wrapper">
        <div class="top-bar">
        <h1>Outfit Forecast</h1>
        </div>
            <nav class="bottom-bar">
            <div class="links">
             
                <p>Home</p>
                <p>Blog</p>
                <p>Marketplace</p>
                
              
            </div>
            </nav>
        </div>
    </header> -->
   
      
      <main>
      <!-- Landing Page Section with Image -->
      <section class="landing-section">
        <div class="landing-image">
          <!-- <img src="/path/to/your-image.jpg" alt="Landing Image" /> -->
        </div>
      </section>

      <!-- Welcome to Outfit Forecast Section -->
      <section class="welcome-section">
        <div class="welcome-text">
          <h2>Welcome to Outfit Forecast</h2>
          <p>Explain what fashion forecast is here.</p>
        </div>
        <div class="welcome-images">
          <!-- Add images or content here -->
        </div>
      </section>


    </main>
     <footer>
        <div class="footer-content">
            <p>insta</p>
        </div>
    </footer>
</template>


<script>
export default {
  name: 'homePage',

}
</script>


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
footer {
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
  
}
</style>