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
  <div>
    ANYONE CAN SEE THIS
  </div>
</template>