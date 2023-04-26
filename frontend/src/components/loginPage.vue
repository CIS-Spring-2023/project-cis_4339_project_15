<script>
const apiURL = import.meta.env.VITE_ROOT_API
import axios from 'axios'

export default {
  data() {
    return {
      va: sessionStorage.getItem('view'),
      ea: sessionStorage.getItem('edit'),
      // Variables from the login form
      username: '',
      password: '',
      fail: false,
    }
  },

  methods: {
    login() {
      axios.post(`${apiURL}/user/login`, {
        username: this.username,
        password: this.password
      })
        .then(res => {
          // successful login, set sessionStorage
          console.log(res.data);
          if (res.data.isAuthorized === 'view') {
            this.$root.updateView(true)
            this.$router.push('/')
          }
          if (res.data.isAuthorized === 'edit') {
            this.$root.updateEdit(true)
            this.$router.push('/')
          }

        })
        .catch(err => {
          // login failed, handle error 
          console.log(err)
          this.fail = true
        })
    },
    logout() {
      sessionStorage.clear()
      location.reload();

    }

  }
}
</script>

<template>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="py-8 px-4 shadow sm:rounded-lg sm:px-10">

      <!-- Display logout button if user is logged in -->
      <button v-if="va || ea" class="w-full flex justify-center bg-red-700 text-white rounded"
        @click="logout">Logout</button>

      <form v-else @submit.prevent="login">
        <label class="block text-sm font-medium text-gray-700">Username
          <input required type="text" v-model="username" />
        </label><br>
        <label class="block text-sm font-medium text-gray-700 ml-1">Password
          <input required type="password" v-model="password" />
        </label><br>
        <button class="w-full flex justify-center bg-red-700 text-white rounded" type="submit">Login</button>
      </form>
      <br>
      <div v-if="fail" class="text-red-700 w-full flex justify-center">Failed Login!</div>
    </div>
  </div>
</template>
