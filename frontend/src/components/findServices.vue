<script>
// TEMPLATE CSS, AND SCRIPT RECIEVED FROM OTHER FIND PAGES FOR CONSISTENCY PURPOSES
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      services: [],
      searchBy: '',
      number: '',
      name: '',
    };
  },
  methods: {
    async handleSubmitForm() {
      
      if (this.searchBy === 'number') {
        const response = await axios.get(
          `${apiURL}/services/by-number/${this.number}`
        );
        this.services = [response.data];
      } else if (this.searchBy === 'name') {
        const response = await axios.get(
          `${apiURL}/services/by-name/${this.name}`
        );
        this.services = [response.data];
      } else {
        const response = await axios.get(`${apiURL}/services`);
        this.services = response.data;
      }
    },
    async getEvents() {
      
      const response = await axios.get(`${apiURL}/services`);
      this.services = response.data;
    },
    clearSearch() {
      // Resets all the variables
      this.searchBy = '';
      this.number = '';
      this.name = '';

      this.getEvents();
    },
  },
  created() {
    // Fetch services when the component is created
    this.getEvents();
  },
};

</script>

<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        List of Services
      </h1>
    </div>
    <div class="px-10 pt-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Search Services By</h2>
        <!-- Displays Client Name search field -->
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy">
            <option value="number">Service Number</option>
            <option value="name">Service Name</option>
          </select>
        </div>
        <div class="flex flex-col" v-if="searchBy === 'number'">
          <label class="block">
            <input type="number"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="number" v-on:keyup.enter="handleSubmitForm" placeholder="Enter Service Number" />
          </label>
        </div>
        <!-- Displays event date search field -->
        <div class="flex flex-col" v-if="searchBy === 'name'">
          <input
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text" v-model="name" v-on:keyup.enter="handleSubmitForm" placeholder="Enter Service Name" />
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div></div>
        <div></div>
        <div class="mt-5 grid-cols-2">
          <button class="mr-10 border border-red-700 bg-white text-red-700 rounded" @click="clearSearch" type="submit">
            Clear Search
          </button>
          <button class="bg-red-700 text-white rounded" @click="handleSubmitForm" type="submit">
            Search Services
          </button>
        </div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Services</h2>
        <h3 class="italic">Click table row to edit/display an entry</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Service Number</th>
              <th class="p-4 text-left">Service Name</th>
              <th class="p-4 text-left">Description</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in services" :key="index" class="divide-y divide-gray-300">
            <tr v-if="item.serviceStatus">
              <td class="p-3 text-left">{{ item.serviceNumber }}</td>
              <td class="p-3 text-left">{{ item.serviceName }}</td>
              <td class="p-3 text-left">{{ item.serviceDescription }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
