<!-- ChatMessagesComponent.vue -->
<template>
    <div class="chat-messages">
      <div v-for="message in messages" :key="message.id">
        {{ message.sender }}: {{ message.text }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['messages'],
  };
  </script>
  
  <style scoped>
  .chat-messages {
    padding: 10px;
    background-color: #ffffff;
  }
  </style>
  