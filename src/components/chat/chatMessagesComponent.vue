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
  
  <style scoped>
  .chat-messages {
    padding: 10px;
    background-color: #ffffff;
  }
  </style>
  