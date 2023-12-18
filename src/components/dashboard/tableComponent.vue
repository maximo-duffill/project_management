<template>
    <div>
      <header class="header">
        <h1>Project List</h1>
      </header>
  
      <el-table :data="projects" :row-key="row => row.id" :height="tableHeight" style="width: 100%" v-if="projects.length > 0">
        
        <el-table-column prop="name" label="Project Name"></el-table-column>
        <el-table-column prop="description" label="Description"></el-table-column>
        <el-table-column prop="start_date" label="Starting Date" ></el-table-column>
      <el-table-column prop="end_date" label="Ending Date" ></el-table-column>
        <el-table-column label="Actions">
        
        <el-button type="primary" @click="modifyProject(row)">Modify</el-button>
        <el-button type="danger" @click="() => removeProject(row)">Remove</el-button>
      
    </el-table-column>
      </el-table>
  
      <div v-else>
        Loading projects...
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { format } from 'date-fns';
  
  export default {
    data() {
      return {
        projects: [],
        tableHeight: '40vh',
      };
    },
    created() {
      this.fetchProjects();
      setInterval(this.fetchProjects, 10000);
    },
    methods: {
        async fetchProjects() {
      try {
        const response = await axios.get('http://localhost:3000/projects');

        if (response.data.success) {
          // Format the date strings using date-fns
          this.projects = response.data.projects.map(project => ({
            ...project,
            start_date: this.formatDate(project.start_date),
            end_date: this.formatDate(project.end_date),
          }));
        } else {
          console.error('Failed to fetch projects.');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    },
      async removeProject(row) {
        try {
          const response = await axios.delete(`http://localhost:3000/projects/${row.id}`);
  
          if (response.data.success) {
            // Remove the project from the local array
            const index = this.projects.findIndex(project => project.id === row.id);
            this.projects.splice(index, 1);
          } else {
            console.error('Failed to remove project.');
          }
        } catch (error) {
          console.error('Error removing project:', error);
        }
      },
      modifyProject(row) {
        // Implement the logic to open a dialog or form for modifying the project data
        console.log('Modify project:', row);
        // You can use a dialog or form here to capture the modified data
      },
      formatDate(dateString) {
      // Check if the date string is not empty
      if (!dateString) {
        return '';
      }

      try {
        // Parse the date string and format it using date-fns
        const parsedDate = new Date(dateString);
        return format(parsedDate, 'dd-MM-yyyy'); // Adjust the format string as needed
      } catch (error) {
        console.error('Error parsing date:', error);
        return 'Invalid Date';
      }
    },
    },
  };
  </script>
  
  <style scoped>
  .header {
    margin-top: 30px;
    background-color: #3498db;
    color: #ffffff;
    text-align: center;
    padding: 1rem;
    border-radius: 10px;
  }
  
  .el-table {
    margin-top: 2rem;
  }
  </style>
  