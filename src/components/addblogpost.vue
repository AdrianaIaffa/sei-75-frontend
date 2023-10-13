<template>
   <div class="add-blog-post-container">
    <div class="left-section">
      <h1>ADD BLOG POST</h1>
      <form @submit.prevent="newBlogPost" class="blog-post-form">
        <input
          type="text"
          v-model="post.title"
          name="title"
          placeholder="Blog Post Title"
          class="form-input-title"
        />
        <div
        class="form-input-content"
        contenteditable="true"
        ref="editor"
        @input="updateContent"
        v-html="post.content"
        ></div>
        <button class="submit-post">submit</button>
      </form>
    </div>
    <div class="right-section">
      <div class="editing-tools">
        <!-- <button @click="bold">Edit</button>
        <button @click="bold">Save Draft</button> -->
        <button @click="bold">Bold</button>
        <button @click="italic">Italic</button>
        <button @click="underline">Underline</button>
        <button @click="strikethrough">Strikethrough</button>
      </div>
    </div>
  </div>
</template>

<script>
import { decodeCredential } from "vue3-google-login";
export default {
    name: 'addBlogPost',
    data: () => ({
        error: '',
        post: {
            title: '',
            content: '',
            userid: '',
            picture: '',
            useremail: '',

        }
    }),
    mounted() {
        // Check if a specific cookie key, 'user_session', exists
        if (this.$cookies.isKey("user_session")) {
            // If the 'user_session' cookie exists, set isLoggedIn to true
            this.isLoggedIn = true;
            // Get the value of the 'user_session' cookie and decode its content
            const userData = decodeCredential(this.$cookies.get("user_session"));
            console.log(userData)
            // Extract the 'email' property from the decoded user data
            // and assign it to the useremail variable
            this.useremail = userData.email;
        }
    },
    methods: {
        newBlogPost: function () {
         
          console.log(this.useremail)
            fetch('http://localhost:4000/addblogpost', {
              method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title: this.post.title,
                    content: this.post.content,
                    picture: this.post.picture,
                    useremail: this.useremail,
                })
            })
            .then(res => {
                console.log(res.status);
                this.post.title = ''
                this.post.content = ''
                this.post.picture = ''
                this.post.userid = ''
            })
        }, bold() {
            document.execCommand('bold', false, null);
        }, italic() {
            document.execCommand('italic', false, null);
        }, underline() {
            document.execCommand('underline', false, null);
        }, strikethrough() {
            document.execCommand('strikethrough', false, null);
        }

    }
}

</script>

<style scoped>
.add-blog-post-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.left-section {
  flex: 2; 
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.form-input-title {
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
}
.form-input-content {
    width: 100%;
    height: 50vh;
    border: 1px solid black;
}

.right-section {
  flex: 1; 
  margin: 20px;
  height: 50vh;
}

.editing-tools {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;   
}
</style>