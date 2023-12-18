<!-- Main component template -->
<template>
    <div v-if="loggedInUser" class="chat-box" :class="{ 'chat-box-shrink': isShrunk }">
      <div class="chat-header" @click="toggleChat">Chat</div>
      <div v-if="!isShrunk">
        <!-- Pass users array to user-list and listen for the users-fetched event -->
        <UserListComponent :users="users" @users-fetched="updateUsers" @open-chat="openChat" />
        <chat-messages :messages="messages" />
      </div>
    </div>
  </template>
  
  <!-- Main component script -->
  <script>
  import axios from 'axios';
  import UserListComponent from './userListComponent.vue';
  
  export default {
    data() {
      return {
        isShrunk: false,
        users: [],
        messages: [],
      };
    },
    computed: {
      loggedInUser() {
        return this.$store.state.user;
      },
    },
    created() {
      // Fetch messages when the component is created
      this.fetchMessages();
    },
    methods: {
      async fetchMessages() {
        try {
          const response = await axios.get('http://localhost:3000/messages');
          this.messages = response.data;
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      },
      updateUsers(users) {
        // Update the users data with the fetched users
        this.users = users;
      },
      toggleChat() {
        this.isShrunk = !this.isShrunk;
        // Implement additional logic as needed
        console.log('Toggle chat');
      },
      openChat(user) {
        // Implement logic to open a chat with the selected user
        console.log('Open chat with user:', user);
      },
    },
    components: {
      UserListComponent,
    },
  };
  </script>
  
  <!-- Main component style -->
  <style scoped>
  .chat-box {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 300px;
    height: 400px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease-in-out, border-radius 0.3s ease-in-out;
  }
  
  .chat-box-shrink {
    width: 100px; /* Adjust the width when shrunk */
    height: min-content; /* Adjust the height when shrunk */
    transition: width 0.3s ease-in-out, height 0.3s ease-in-out, border-radius 0.3s ease-in-out;
  }
  
  .chat-header {
    background-color: #3498db;
    color: #fff;
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    border-radius: 6px;
  }
  </style>
  