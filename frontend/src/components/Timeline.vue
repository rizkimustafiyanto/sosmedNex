<template>
    <div class="timeline">
      <h1>Timeline</h1>
  
      <form @submit.prevent="createPost">
        <input v-model="newPostContent" placeholder="What's on your mind?" required />
        <input v-model="newPostImageUrl" placeholder="Image URL (optional)" />
        <button type="submit">Post</button>
      </form>
  
      <div v-for="post in posts" :key="post.id" class="post">
        <p>{{ post.content }}</p>
        <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post Image" />
        <div class="actions">
            <button @click="toggleLike(post.id)">
                {{ post.hasLiked ? 'Unlike' : 'Like' }}
            </button>
            <span>{{ post.likes }} Likes</span>
            <button @click="toggleComments(post.id)">Comments</button>
        </div>
        <div v-if="showComments[post.id]" class="comments">
            <input v-model="newComment" placeholder="Add a comment" />
            <button @click="addComment(post.id)">Post</button>
            <div v-for="comment in post.comments" :key="comment.id">
                <p>{{ comment.content }}</p> 
            </div>
        </div>
      </div>

    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
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
          console.error('Error fetching posts:', error);
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
                console.error('Error fetching comments:', error.response? error.response.data : error);
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

            console.log(response.data);
            const post = this.posts.find(p => p.id === postId);
            if (post) {
              post.comments.push(response.data.comment);
            }
            console.log('New Comment:', response.data.comment);

            this.newComment = '';
          } catch (error) {
            console.error('Error adding comment:', error);
          }
        },
    },
    created() {
      this.fetchPosts();
    },
  };
  </script>
  
  <style scoped>

  .timeline {
    padding: 20px;
  }
  
  .post {
    margin-bottom: 20px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
  }
  
  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  
  .comments {
    margin-top: 10px;
  }
  </style>
  