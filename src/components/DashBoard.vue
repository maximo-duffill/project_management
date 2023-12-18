<template>
    <div>
    <project />
    <project-table />
    </div>
  </template>
  
  <script>
  import project from './dashboard/porjectComponent.vue';
  import projectTable from "./dashboard/tableComponent.vue";
  
  
  export default {
  components: {
    project,
    projectTable,
  },
};
  </script>
  
  <style>

  </style>