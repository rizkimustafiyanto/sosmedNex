<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'UserLogin',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    setup() {
      const router = useRouter();
      return { router };
    },
    methods: {
     async handleLogin() {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: this.email,
                password: this.password,
                });
                console.log(response.data);
                localStorage.setItem('token', response.data.token);
                
                this.router.push('/timeline');
            } catch (error) {
                console.error('Login failed:', error);
                alert('Login failed. Please check your credentials.');
            }
        }
    },
  };
  </script>
  
  <style scoped>
  /* Styling untuk halaman login */
  </style>
  