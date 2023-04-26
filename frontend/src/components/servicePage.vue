<script>
const apiURL = import.meta.env.VITE_ROOT_API
import axios from 'axios';

export default {
  data() {
  return {
    services: [],

  };
},
 
  methods: {
    async getServices() {
  const baseUrl = 'http://localhost:3000'; 
  const response = await axios.get(`${baseUrl}/services`);
  this.services = response.data;
},
    clearSearch() {
      // Resets all the variables
      this.serviceNumber= "",
      this.serviceName= "",
      this.serviceDescription= "",
      this.EditserviceNumber= "",
      this.EditserviceName= "",
      this.EditserviceDescription= "",
      this.EditserviceStatus= "",
      this.SelectedService= ""

      this.getServices();
    },
    async submitAddService() {
      const baseUrl = 'http://localhost:3000'; 
      try {
        const response = await axios.post(`${baseUrl}/services/`, {
          serviceNumber: this.serviceNumber,
          serviceName: this.serviceName,
          serviceDescription: this.serviceDescription,
        });
        console.log(response.data);
        this.clearSearch()
        this.numberAdd = "";
        this.name = "";
        this.description = "";
      } catch (error) {
        console.error("Error adding service:", error);
      }
    },
    updateEditFields(serviceId) {
    if (serviceId) {
      const selectedService = this.services.find(service => service._id === serviceId);
      if (selectedService) {
        this.EditserviceNumber = selectedService.serviceNumber;
        this.EditserviceName = selectedService.serviceName;
        this.EditserviceDescription = selectedService.serviceDescription;
        this.EditserviceStatus = selectedService.status;
      }
    } else {
      this.EditserviceNumber = '';
      this.EditserviceName = '';
      this.EditserviceDescription = '';
      this.EditserviceStatus = '';
    }
  },

    async submitEditService() {
      const baseUrl = 'http://localhost:3000'; 
      try {
        const response = await axios.put(`${baseUrl}/services/${this.SelectedService}`, {
          serviceNumber: this.EditserviceNumber,
          serviceName: this.EditserviceName,
          serviceDescription: this.EditserviceDescription,
          serviceStatus: this.EditserviceStatus

        });

        console.log(response.data);

        this.numberEdit = "";
        this.field = "";
        this.newVal = "";
      } catch (error) {
        console.error("Error updating service:", error);
      }
      this.updateEditFields(this.SelectedService);
    },
  },
  
  created() {
    // Fetch services when the component is created
    this.getServices();
  },
  watch: {
  SelectedService(newValue) {
    this.updateEditFields(newValue);
  },
},
};

</script>

<template>
  <div>
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
            <span class="text-gray-700">Service Number</span>
            <span style="color: #ff0000">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="EditserviceNumber" />
          </label>
        </div>

        <!-- form field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Service Name</span>
            <span style="color: #ff0000">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="EditserviceName" />
          </label>
        </div>
        <!-- form field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Service Description</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="EditserviceDescription" />
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
   <!-- Edit Services  -->
  <div class="px-10 py-20">
    <!-- @submit.prevent stops the submit event from reloading the page-->
    <form @submit.prevent="submitEditService">
      <!-- grid container -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Edit Service</h2>
        <!-- form field -->

        <div class="flex flex-col">
        <label class="block">
          <span class="text-gray-700">Select Service</span>
          <select v-if="services" v-model="SelectedService" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="" disabled selected>Select a service</option>
            <option v-for="(item, index) in services" :key="index" :value="item._id">{{ item.serviceName }}, {{ item.serviceNumber }} </option>
          </select>
          <span v-else class="text-gray-500">Loading services...</span>
        </label>
        </div>
        
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Service Number</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="EditserviceNumber" />
          </label>
        </div>

        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Service Name</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="EditserviceName" />
          </label>
        </div>
        <br>
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Service Description</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="EditserviceDescription" />
          </label>
        </div>

        <!-- form field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Active/Inactive</span>
            <select v-model="EditserviceStatus"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <option value=true>Active</option>
              <option value=false>Inactive</option>
            </select>
          </label>
        </div>

        <!-- submit button -->
        <br>
        <div class="flex justify-between mt-10 mr-20">
          <button class="bg-red-700 text-white rounded" type="submit">
            Edit Service
          </button>
        </div>
      </div>
    </form>
  </div>
</div>

</template>
