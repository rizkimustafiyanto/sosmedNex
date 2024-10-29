<template>
    <div id="app" class="container mt-4">
      <header class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="text-dark">Nexmedis Social Media</h1>
        <strong>
          <h4>
            <span v-if="isLoggedIn" class="me-3">{{ userName }}</span>
          </h4>
        </strong>
        <button 
          v-if="isLoggedIn" 
          @click="handleLogout" 
          class="btn btn-outline-danger"
        >
          Logout
        </button>
      </header>
  
      <router-view />
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['isLoggedIn', 'userName']),
    },
    methods: {
      handleLogout() {
        this.$store.dispatch('logout');
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style scoped>
  h1 {
    font-weight: 600;
    font-size: 2rem;
  }
  </style>
  