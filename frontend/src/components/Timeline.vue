<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Timeline</h1>

    <!-- Form untuk membuat post baru -->
    <form @submit.prevent="createPost" class="mb-4">
      <div class="mb-3">
        <input 
          v-model="newPostContent" 
          placeholder="What's on your mind?" 
          class="form-control" 
          required 
        />
      </div>
      <div class="mb-3">
        <input 
          v-model="newPostImageUrl" 
          placeholder="Image URL (optional)" 
          class="form-control" 
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">Post</button>
    </form>

    <div v-for="post in posts" :key="post.id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <p class="card-text">{{ post.content }}</p>
        <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post Image" class="img-fluid mb-3" />

        <div class="d-flex justify-content-between align-items-center">
          <button @click="toggleLike(post.id)" class="btn btn-outline-primary">
            {{ post.hasLiked ? 'Unlike' : 'Like' }}
          </button>
          <span class="text-muted">{{ post.likes }} Likes</span>
          <button @click="toggleComments(post.id)" class="btn btn-outline-secondary">Comments</button>
        </div>

        <div v-if="showComments[post.id]" class="mt-3">
          <div class="mb-2">
            <input v-model="newComment" placeholder="Add a comment" class="form-control" />
            <button @click="addComment(post.id)" class="btn btn-primary mt-2">Post Comment</button>
          </div>
          <div v-for="comment in post.comments" :key="comment.id" class="mt-2 p-2 bg-light rounded">
            <p class="mb-0">{{ comment.content }}</p> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'UserTimeline',
  data() {
    return {
      posts: [],
      newPostContent: '',
      newPostImageUrl: '',
      showComments: {},
      newComment: '',
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    async fetchPosts() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.posts = response.data.map(post => ({
          ...post,
          likes: post.likes ?? 0,
          hasLiked: post.hasLiked,
          comments: [],
        }));
      } catch (error) {
        console.error('Error fetching posts:', error.response ? error.response.data : error);
      }
    },
    async createPost() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5000/api/posts', {
          content: this.newPostContent,
          imageUrl: this.newPostImageUrl,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.posts.unshift(response.data.post);
        this.newPostContent = '';
        this.newPostImageUrl = '';
      } catch (error) {
        console.error('Error creating post:', error);
      }
    },
    async toggleLike(postId) {
      try {
        const token = localStorage.getItem('token');
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        if (post.hasLiked) {
          await axios.delete(`http://localhost:5000/api/posts/${postId}/like`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          post.likes--;
        } else {
          await axios.post(`http://localhost:5000/api/posts/${postId}/like`, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          post.likes++;
        }

        post.hasLiked = !post.hasLiked;
      } catch (error) {
        console.error('Error toggling like:', error.response ? error.response.data : error);
      }
    },
    toggleComments(postId) {
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        if (post.comments.length === 0) {
          this.fetchComments(postId);
        }
        this.showComments[postId] = !this.showComments[postId];
      }
    },
    async fetchComments(postId) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/posts/${postId}/comments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const post = this.posts.find(p => p.id === postId);
        if (post) {
          post.comments = response.data.comments;
        }
      } catch (error) {
        console.error('Error fetching comments:', error.response ? error.response.data : error);
      }
    },
    async addComment(postId) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://localhost:5000/api/posts/${postId}/comments`, {
          content: this.newComment,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const post = this.posts.find(p => p.id === postId);
        if (post) {
          post.comments.push(response.data.comment);
        }
        this.newComment = '';
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },
  },
  created() {
    if (this.isLoggedIn) {
      this.fetchPosts();
    } else {
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
.card {
  max-width: 600px;
  margin: auto;
}
</style>
