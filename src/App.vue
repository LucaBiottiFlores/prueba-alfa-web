<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import firebase from 'firebase'
import Swal from 'sweetalert2'

export default {
  name: 'App',
  components: {
    Navbar
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('loadingUser', user)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'ingreso exitoso',
          showConfirmButton: false,
          timer: 1600
        })
      } else {
        this.$store.dispatch('loadingUser', null)
      }
    })
    this.$store.dispatch('bringCourses')
  },
  data: () => ({
    //
  })
}
</script>
