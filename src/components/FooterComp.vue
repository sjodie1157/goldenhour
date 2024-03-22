<template>
    <footer class="bg-white">
      <p class="text-black">&copy; {{ currentYear }} Copyright</p>
    </footer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear()
      };
    }
  };
  </script>
  
  <style scoped>
  footer {
    background-color: #f0f0f0;
    padding: 10px 0;
    text-align: center;
    font-weight: bolder;
  }
  </style>