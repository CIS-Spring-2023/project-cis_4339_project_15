<template>
    <div>
        <!-- Your component content here -->
        <button @click="logout">Logout</button>
    </div>
</template>
  
<script>
export default {
    methods: {
        logout() {
            // Perform any logout logic, e.g., API call to invalidate session, clear local storage, etc.
            // Then, use Vue.js router to navigate to the login page
            this.$router.push({ name: 'loginPage.vue' });
        }
    }
}
</script>