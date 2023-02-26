<script>
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      // Variables from the login form
      username: '',
      password: '',
    }
  },

  // This is the front-end only method functionality, later we will make an api call instead
  // This is not a secure method, it sets auth (the global variable) to true
  // USERNAME: user PASSWORD: password
  methods: {
    login() {
      if (this.username === 'user' && this.password === 'password') {
        alert('Login successful!');
        this.$root.updateAuth(true);
      } else {
        alert('Invalid username or password.');
      }
    
    },
  }
}
</script>

<template>
  <main>
    <div>
    <form class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
        @submit.prevent="login">
      <label>
        Username
        <input type="text" v-model="username" />
      </label>
      <label>
        Password
        <input type="password" v-model="password" />
      </label>
      <button type="submit">Log in</button>
    </form>
    </div>
  </main>
</template>
