<template>
  <div class="blog-container">
    <div v-for="post in posts" :key="post._id" class="blog-post">
      <!-- Display the post picture -->
      <img :src="post.picture" alt="Post Picture" class="post-picture" />
      <h2>{{ post.title }}</h2>
      <p v-html="post.content"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogPage',
  data: () => ({
    error: "",
    posts: [],
  }),
  mounted() {
    fetch(`http://localhost:4000/blogPage`)
      .then(response => response.json())
      .then(result => {
        this.posts = result;
      });
  },
};
</script>

<style scoped>
.blog-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%; /* Set the width to 80% */
  margin: 0 auto; /* Center the container horizontally */
}

.blog-post {
  border: 1px solid #efefef;
  width: 100%; /* Each post is 100% wide within the container */
  margin: 10px 0;
  padding: 10px;
  text-align: left; /* Text is left-justified */
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  line-height: 1.6;
}

.post-picture {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>
