<!-- Login.vue -->
<template>
    <div>
      <header class="header">
        <router-link to="/" class="brand">
          <div class="brand-text">OrganizeHub</div>
        </router-link>
      </header>
      <div class="login-container">
        <el-card class="login-card">
          <h2>Login</h2>
          <el-form ref="loginForm" :model="loginForm" label-width="80px">
            <el-form-item label="Email" prop="email" :error="emailError">
              <el-input v-model="loginForm.email" placeholder="Enter your email" @input="validateEmail"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="Enter your password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login"  >Login</el-button>
            </el-form-item>
            <div class="feedback-message" v-if="feedbackMessage">{{ feedbackMessage }}</div>
          </el-form>
          <p class="signup-link">Not signed in? <router-link to="/signin">Sign in here</router-link></p>
        </el-card>
      </div>
    </div>
  </template>
  
  <script>
    import axios from 'axios';
    import router from '@/router';



    export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      emailError: '', // Holds the error message for email validation
      feedbackMessage: '', // Holds general feedback message for the user
    };
  },
  methods: {
    async login() {
      // Validate email
      if (this.isValidEmail(this.loginForm.email)) {
        try {
          const response = await axios.post('http://localhost:3000/login', {
            email: this.loginForm.email,
            password: this.loginForm.password,
          });

          if (response.data.success) {
            this.$store.commit('setUser', { email: this.loginForm.email });
console.log('User set in store:', this.$store.state.user);
            this.feedbackMessage = 'Login successful!';
            router.push('/dashboard');
          } else {
            this.feedbackMessage = 'Incorrect email or password. Please try again.';
          }
        } catch (error) {
          console.error('Login error:', error);
          this.feedbackMessage = 'An error occurred during login.';
        }
      } else {
        // Handle invalid email case
        this.feedbackMessage = 'Invalid email. Please check your input.'; // Display error message
      }
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  },
};

  </script>
  
  <style scoped>

.header {
  display: flex;
  justify-content: center;
  padding: 20px;
  position: relative;
  margin-top: 4rem;
  margin-bottom: 1rem;
}
  .brand{
    z-index: 1;
    text-decoration: none;
  }

  .brand-text {
  font-size: 5rem;
  color: black;
}

  @media screen and (max-width: 768px) {
  .brand-text {
    font-size: 3rem;
  }
}
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
     background-image: url('@/assets/Pictures/WorldGlobe.jpg');
     
     background-size: cover;
     background-position: center;
     background-repeat: no-repeat;
  }

  .login-container::before{
    content: '';
     position: absolute;
     top: 0;
     right: 0;
     bottom: 0;
    left: 0;
    background: linear-gradient(to right, rgba(0, 170, 255, 0), rgba(0, 170, 255, 0.8), rgba(0, 170, 255, 1), rgba(0, 170, 255, 0.8), rgba(0, 170, 255, 0));
    pointer-events: none;
  }
  
  .login-card {
    
    width: 400px;
    border-color: black;
    z-index: 1;
  }

  h2 {
    display: flex;
    justify-content: center;
  }

  .feedback-message {
  margin-top: 10px;
  color: red; /* You can customize the color */
}

.signup-link {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}

.signup-link a {
  color: #409eff; /* or any other color you prefer */
}
  
  </style>