<template>
  <div class="post-detail">
    <h1>Post Detail</h1>
    <div v-if="post">
      <h2>{{ post.content }}</h2>
      <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post Image" />
      <p>{{ post.likes }} Likes</p>
      <div class="comments">
        <h3>Comments:</h3>
        <div v-for="comment in post.comments" :key="comment.id">
          <p>{{ comment.text }}</p>
        </div>
        <input v-model="newComment" placeholder="Add a comment" />
        <button @click="addComment">Post</button>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PostDetail',
  data() {
    return {
      post: null,
      newComment: '',
    };
  },
  methods: {
    async fetchPost() {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${this.$route.params.id}`);
        this.post = response.data;
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    },
    async addComment() {
  if (this.newComment.trim()) {
    try {
      await axios.post(`http://localhost:5000/api/posts/${this.post.id}/comments`, {
        content: this.newComment,
      });
      this.post.comments.push({ text: this.newComment });
      this.newComment = ''; // Reset input after adding
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }
},
  },
  created() {
    this.fetchPost();
  },
};
</script>

<style scoped>
.post-detail {

}
.comments {
  margin-top: 20px;
}
</style>
