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
    meta: {needLogin: true}
  },
  {
    path: '/findclient',
    name: 'findclient',
    component: () => import('../components/findClient.vue')
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
    meta: {needLogin: true}
  },
  {
    path: '/findevents',
    name: 'findevents',
    component: () => import('../components/findEvents.vue')
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
  if (to.matched.some(record => record.meta.needLogin)) {
    // value is true, user is authenticated so proceed, using same var from app.vue
    const va = sessionStorage.getItem('auth')
    if (va) {
      next()
    } else {
      // Cannot access route without login, redirect to login page
      next('/loginPage')
    }
  } else {
    // Continue to route if no login needed
    next()
  }
})
export default router
