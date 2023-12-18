<template>
  <div class="chat-window">
    <div class="chat-header">
      {{ activeUser ? activeUser.email : 'Chat' }}
      <span class="close-button" @click="closeChat">&times;</span>
    </div>
    <div class="chat-messages">
      <div v-for="message in messages" :key="message.id">
        {{ message.sender.email }}: {{ message.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeUser: Object,
    messages: Array,
  },
  methods: {
    closeChat() {
      // Emit an event to notify the parent component to close the chat
      this.$emit('close-chat');
    },
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
  