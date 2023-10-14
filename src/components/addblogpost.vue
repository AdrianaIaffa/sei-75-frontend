<template>
   <div class="add-blog-post-container">
    <div class="left-section">
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
        :innerHTML="post.content"
        
        ></div>
        <button class="submit-post">submit</button>
      </form>
    </div>
    <div class="right-section">
      <div class="editing-tools">
        <!-- <button @click="bold">Edit</button>
        <button @click="bold">Save Draft</button> -->
        <button class="editing-btn"  @click="bold">Bold</button>
        <button class="editing-btn"  @click="italic">Italic</button>
        <button class="editing-btn"  @click="underline">Underline</button>
        <button class="editing-btn"  @click="strikethrough">Strikethrough</button>
      </div>
      <div class="form-group-left">
          <label for="picture" class="label-similar">Picture URL:</label>
          <input type="text" id="picture" v-model="post.picture" required />
          <img class="preview-image" :src="post.picture" alt="Preview" v-if="post.picture" />
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
        }, updateContent(event) {
    this.post.content = event.target.innerHTML;
  },
        bold() {
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
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;

}
.form-input-title {
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
    box-sizing: border-box;
}
.form-input-content {
    height: 50vh;
    border: 1px solid black;
    text-align: left; 
    padding: 10px;
    margin-bottom: 20px;
    overflow-y: auto;
}
.blog-post-form {
  margin-top: 20px;
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
  display: flex;
  gap: 10px;
  flex-direction: row;
  justify-content: center;
}
.form-group-left {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
.label-similar {
  margin-bottom: 5px;
}

.submit-post,
.editing-btn {
  padding: 10px 20px;
  /* margin-top: 20px; */
  background-color: #333;
  color: #fff;
  text-decoration: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
.submit-post {
  background-color: #5D5955;
}
.preview-image {
  width: 100%;
}
</style>