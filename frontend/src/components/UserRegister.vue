<template>
    <div>
      <h2>User Register</h2>
      <form @submit.prevent="registerUser">
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="name" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserRegister',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        message: '',
      };
    },
    methods: {
      async registerUser() {
        try {
          const response = await axios.post('http://localhost:5000/api/auth/register', {
            name: this.name,
            email: this.email,
            password: this.password,
          });
          this.message = response.data.message;
        } catch (error) {
          // Cek jika ada error dari response
          if (error.response && error.response.data && error.response.data.message) {
            this.message = error.response.data.message;
          } else {
            this.message = 'An error occurred. Please try again later.';
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Tambahkan gaya sesuai kebutuhan */
  </style>
  