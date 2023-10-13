<template>
    <h1>blog</h1>
    
    <div class="blog-posts">
      <div v-for="post in posts" :key="post._id" class="blog-post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
      </div>
    </div>

</template>

<script>
// import { useRoute } from "vue-router";
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
            this.posts = result
        })
        }
}
</script>

<style scoped>

.blog-post {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin: 10px 0;
  padding: 10px;
}

h1 {
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  line-height: 1.6;
}

</style>