<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  name: 'App',
  data() {
    return {
      orgName: 'Dataplatform',
      // Define the states for user status, set as session storage so 'login status' persists across reload page
      // The 'login status' persists but expires after exiting the page so you have to login again
      view: sessionStorage.getItem('view') || false,
      edit: sessionStorage.getItem('edit') || false,
      services: []
    }
  },
  created() {
    axios.get(`${apiURL}/org`).then((res) => {
      this.orgName = res.data.name
    })
  },

  // This is the method to update the state which is used in other vues
  methods: {
    updateView(newValue) {
      this.view = newValue;
      sessionStorage.setItem('view', newValue)
    },
    updateEdit(newValue){
      this.edit = newValue;
      sessionStorage.setItem('edit', newValue)
    },
    addServices: function(number, name, description) {
      const newService = { number, name, description };
      this.services.push(newService);
      localStorage.setItem('services', JSON.stringify(this.services));
      console.log(this.services)
    },
    updateServices(){
      
    },
    deleteServices(num){
      const tempList = JSON.parse(localStorage.getItem('services'));
      for (const i in tempList) {
        if (parseInt(tempList[i].number) === parseInt(num)) {      
          
          tempList.splice(i, 1)
          break;
        }
      }
      localStorage.setItem('services', JSON.stringify(tempList))
    },
  }
}

</script>
<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <li>
              <router-link to="/">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >dashboard</span
                >
                Dashboard
              </router-link>
            </li>
            <li v-if="edit">
              <router-link to="/intakeform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >people</span
                >
                Client Intake Form
              </router-link>
            </li>
            <li v-if="edit">
              <router-link to="/eventform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >event</span
                >
                Create Event
              </router-link>
            </li>
            <li v-if="edit || view">
              <router-link to="/servicepage">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >event</span
                >
                Edit Services
              </router-link>
            </li>
            <li v-if="edit || view"
            >
              <router-link to="/findclient">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Client
              </router-link>
            </li>
            <li v-if="edit || view">
              <router-link to="/findevents">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Event
              </router-link>
            </li>
            <li v-if="edit || view">
              <router-link to="/findservices">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Services
              </router-link>
            </li>
            <li>
              <router-link to="/loginpage">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >key</span
                >
                User Login
              </router-link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section
        class="justify-end items-center h-24 flex"
        style="background: linear-gradient(250deg, #c8102e 70%, #efecec 50.6%)"
      >
        <h1 class="mr-20 text-3xl text-white">{{ this.orgName }}</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>
