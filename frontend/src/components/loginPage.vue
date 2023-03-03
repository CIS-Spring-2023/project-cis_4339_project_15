<script>
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      // Variables from the login form
      username: '',
      password: '',
      fail: false,
      success: false
    }
  },

  // This is the front-end only method functionality, later we will make an api call instead
  // This is not a secure method, it uses the method in app.vue to change the states
  // USERNAME: 'viewer' / 'editor' PASSWORD: 'password'
  methods: {
    login() {
      if (this.username === 'viewer' && this.password === 'password') {
        // Updates variables for the alert in the html
        this.success = true;
        // Updates the state using the mentioned method
        this.$root.updateView(true);
      } 
      else if (this.username === 'editor' && this.password === 'password') {
        this.success = true;
        this.$root.updateEdit(true);
      } else {
        this.fail = true;
      }
    },

  }
}
</script>

<template>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form @submit.prevent="login">
        <label class="block text-sm font-medium text-gray-700">Username
          <input type="text" v-model="username" />
        </label><br>
        <label class="block text-sm font-medium text-gray-700 ml-1">Password
          <input type="password" v-model="password" />
        </label><br>
          <button class="w-full flex justify-center bg-red-700 text-white rounded" type="submit">Login</button>
      </form>
      <br>
      <div v-if="fail" class="text-red-700 w-full flex justify-center">Incorrect Username or Password</div>
      <div v-if="success" class="text-green-700 w-full flex justify-center">Success</div>
    </div>
  </div>
</template>
