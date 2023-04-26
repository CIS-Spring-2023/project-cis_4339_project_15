import { createRouter, createWebHistory } from 'vue-router'

// make all paths and names lowercase for consistency
const routes = [
  {
    path: '/',
    props: true,
    component: () => import('../components/homePage.vue')
  },
  {
    path: '/intakeform',
    name: 'intakeform',
    props: true,
    component: () => import('../components/intakeForm.vue'),
    meta: { needEdit: true }
  },
  {
    path: '/findclient',
    name: 'findclient',
    component: () => import('../components/findClient.vue'),
    meta: { needView: true }
  },
  {
    path: '/updateclient/:id',
    name: 'updateclient',
    props: true,
    component: () => import('../components/updateClient.vue')
  },
  {
    path: '/eventform',
    name: 'eventform',
    component: () => import('../components/eventForm.vue'),
    meta: { needEdit: true }
  },
  {
    path: '/findevents',
    name: 'findevents',
    component: () => import('../components/findEvents.vue'),
    meta: { needView: true }

  },
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    props: true,
    component: () => import('../components/eventDetails.vue'),
  },
  {
    path: '/loginpage',
    name: 'loginpage',
    props: true,
    component: () => import('../components/loginPage.vue')
  },
  {
    path: '/servicepage',
    name: 'servicepage',
    props: true,
    component: () => import('../components/servicePage.vue'),
    meta: { needEdit: true }
  },
  {
    path: '/findservices',
    name: 'findservices',
    props: true,
    component: () => import('../components/findServices.vue'),
    meta: { needView: true }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

// The routes that need login are not visibly shown
// However they can still be viewed if link is manually typed in
// So a route guard is used just in case, routes needing login will have meta 
router.beforeEach((to, from, next) => {
  // Does route need login?
  // If so, get the states from the session storage
  const va = sessionStorage.getItem('view')
  const ea = sessionStorage.getItem('edit')

  if (to.matched.some(record => record.meta.needView)) {
    // Both editors and viewers may view this page, so either can be true
    if (va || ea) {
      next()
    } else {
      // Cannot access route without login, redirect to login page
      next('/loginPage')
    }
  }
  else if (to.matched.some(record => record.meta.needEdit)) {
    // Only editors may see forms, so only ea is checked; same logic as above
    if (ea) {
      next()
    } else {
      next('/loginPage')
    }
  }
  // No record.meta was found = no login needed so proceed (this only applies to dashboard, login, and unused pages)
  else {
    next()
  }
})

export default router
