<script>
const apiURL = import.meta.env.VITE_ROOT_API

// This is the form which allows to VIEW services
// Visible to viewers and editors
export default {
  data() {
    return {
      status: sessionStorage.getItem('edit')
    }
  },

  // Services are currently hard-coded, later we will use api calls
  methods: {
    addService() {


    }
  }
}
</script>

<template>
  <h1 v-if="status">ONLY EDITOR SHOULD SEE THIS</h1>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h1>Services</h1>
        <form @submit.prevent="viewevents">
          <div class="form-group">
          <label for="events">Name: </label>
          <input type="text" id="events" v-model="events">
          </div>
          <div class="form-group">
          <label for="title">Title: </label>
          <input type="text" id="title" v-model="title">
          </div>
          <div class="form-group">
          <label for="description">Description: </label>
          <input type="text" id="description" v-model="description">
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
</template>
