<template>
  <div>
    <header class="header">
      <h1>Project List</h1>
    </header>

    <el-table :data="projects" :height="tableHeight" style="width: 100%" v-if="projects.length > 0">
  <el-table-column prop="project_id" label="Project id"></el-table-column>
  <el-table-column prop="name" label="Project Name"></el-table-column>
  <el-table-column prop="description" label="Description"></el-table-column>
  <el-table-column prop="start_date" label="Starting Date"></el-table-column>
  <el-table-column prop="end_date" label="Ending Date"></el-table-column>
  <el-table-column label="Actions">
    <el-button type="danger" @click="removeProject(projects)">Remove</el-button>
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
    async removeProject(project) {
  try {
   console.log(project.project_id);
    // Call the endpoint to remove the project with the specified project_id
    const response = await axios.delete(`http://localhost:3000/projects/${project.project_id}`);

    if (response.data.success) {
      // Successfully removed the project, now update the project list
      this.fetchProjects();
    } else {
      console.error('Failed to remove project.');
    }
  } catch (error) {
    console.error('Error removing project:', error);
  }
},
  }
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

.el-dialog {
  z-index: 1000;
}

.el-table {
  margin-top: 2rem;
}
</style>
