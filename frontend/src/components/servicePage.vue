<script>
const apiURL = import.meta.env.VITE_ROOT_API

// TEMPLATE AND CSS FROM OTHER FORM PAGES FOR CONSISTENCY
export default {
  data() {
    return {
      numberAdd: '',
      numberEdit: '',
      numberDel: '',
      name: '',
      description: '',
      field: '',
      newVal: ''
    }
  },

  // Services are currently hard-coded, later we will use api calls
  // These are the form submit methods and they will run the methods in App.vue
  methods: {
    submitAddService() {
      this.$root.addServices(this.numberAdd, this.name, this.description);
      this.numberAdd = '';
      this.name = '';
      this.description = '';
    },
    submitEditService() {
      this.$root.updateServices(this.numberEdit, this.field, this.newVal);
      this.numberEdit = '';
      this.field = '';
      this.newVal = '';
    },
    submitActiveService() {
      const num = parseInt(this.numberDel)
      this.$root.activeServices(num)
      this.numberDel = '';
    }
  }
}
</script>

<template>
  <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
    Create And Edit Services
  </h1>
  <div class="px-10 py-20">
    <!-- @submit.prevent stops the submit event from reloading the page-->
    <form @submit.prevent="submitAddService">
      <!-- grid container -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Create Service</h2>
        <!-- form field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Number</span>
            <span style="color: #ff0000">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="numberAdd" />
          </label>
        </div>

        <!-- form field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Name</span>
            <span style="color: #ff0000">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="name" />
          </label>
        </div>
        <!-- form field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Description</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="description" />
          </label>
        </div>

        <!-- submit button -->
        <div class="flex justify-between mt-10 mr-20">
          <button class="bg-red-700 text-white rounded" type="submit">
            Add Service
          </button>
        </div>
      </div>
    </form>

  </div>
  <div class="px-10 py-20">
    <!-- @submit.prevent stops the submit event from reloading the page-->
    <form @submit.prevent="submitEditService">
      <!-- grid container -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Edit Service</h2>
        <!-- form field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Number</span>
            <span style="color: #ff0000">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="numberEdit" />
          </label>
        </div>

        <!-- form field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">name or description</span>
            <span style="color: #ff0000">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="field" />
          </label>
        </div>
        <!-- form field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">New Value</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="newVal" />
          </label>
        </div>

        <!-- submit button -->
        <div class="flex justify-between mt-10 mr-20">
          <button class="bg-red-700 text-white rounded" type="submit">
            Edit Service
          </button>
        </div>
      </div>
    </form>
  </div>
  <div class="px-10 py-20">
    <!-- @submit.prevent stops the submit event from reloading the page-->
    <form @submit.prevent="submitActiveService">
      <!-- grid container -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Toggle Service</h2>
        <!-- form field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Number</span>
            <span style="color: #ff0000">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="numberDel" />
          </label>
        </div>

        <!-- submit button -->
        <div class="flex">
          <button class="bg-red-700 text-white rounded" type="submit">
            Toggle Service
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
