<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4 shadow-sm">
          <h2 class="text-center mb-4">Register</h2>
          <form @submit.prevent="registerUser">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input
                type="text"
                v-model="name"
                id="name"
                class="form-control"
                placeholder="Enter your name"
                required
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                v-model="email"
                id="email"
                class="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                v-model="password"
                id="password"
                class="form-control"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">Register</button>
          </form>
          <p v-if="message" class="alert alert-info mt-3 text-center">{{ message }}</p>
          <button @click="goToLogin" class="btn btn-link w-100 mt-2">Kembali ke Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { mapActions } from 'vuex';

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
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    ...mapActions(['login']),
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.message = response.data.message;
       
        localStorage.setItem('token', response.data.token);
        this.login();
       
        this.router.push('/timeline');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message;
        } else {
          this.message = 'An error occurred. Please try again later.';
        }
      }
    },
    goToLogin() {
      this.router.push('/login');
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 500px;
}
</style>
