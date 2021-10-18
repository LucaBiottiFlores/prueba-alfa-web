import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'Login' }
  },
  {
    path: '*',
    redirect: { name: 'Login' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      requiredLogin: true
    },
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/administration',
    name: 'Administration',
    meta: {
      requiredLogin: true
    },
    component: () =>
      import(
        /* webpackChunkName: "administration" */ '../views/Administration.vue'
      )
  },
  {
    path: '/editing/:id',
    props: true,
    name: 'Editing',
    meta: {
      requiredLogin: true
    },
    component: () =>
      import(/* webpackChunkName: "editing" */ '../views/Editing.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = store.getters.sendingUser
  let requiredLogin = to.matched.some((res) => res.meta.requiredLogin)
  if (requiredLogin) {
    next({ name: 'Login' })
    console.log(user)
    console.log(requiredLogin)
  } else if (user && !requiredLogin) {
    next()
    console.log(user)
    console.log(requiredLogin)
  } else {
    next()
    console.log(user)
    console.log(requiredLogin)
  }
})

export default router
