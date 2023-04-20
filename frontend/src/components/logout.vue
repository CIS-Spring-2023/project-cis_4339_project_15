<template>
    <div class="container">
        <div class="center">
            <button @click="logout" class="logout-button">Click here to Logout</button>
            <p v-if="success" class="text-green-700 w-full flex justify-center">Logout Success!</p>
        </div>
    </div>
    <!-- <div v-if="success" class="text-green-700 w-full flex justify-center">Logout Success!</div> -->
</template>
  
<script>
export default {
    data() {
        return {
            success: false
        }
    },
    methods: {
        logout() {
            this.success = true;
            sessionStorage.clear(); // Your logout logic here
            console.log("Logged out");
        }
    }
};
</script>
  
<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* Set container height to fill the viewport */
}

.center {
    text-align: center;
}

.logout-button {
    background-color: #ff0000;
    /* Button background color */
    color: #ffffff;
    /* Button text color */
    padding: 12px 24px;
    /* Button padding */
    font-size: 18px;
    /* Button font size */
    border: none;
    /* Remove button border */
    cursor: pointer;
    /* Add cursor pointer on hover */
}

.logout-button:hover {
    opacity: 0.8;
    /* Reduce opacity on hover */
}
</style>
  
