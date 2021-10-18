<template>
  <div>
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="cursor">Cursos AlfaWeb</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="mr-14">
        <v-btn icon @click="logOut">
          <span class="ml-3 text-caption d-none d-sm-inline" alt="Salir"
            >LogOut</span
          >
          <v-icon
            right
            class="mr-0 mr-sm-14 mr-md-14 ml-16 ml-sm-1"
            alt="Salida"
            >mdi-logout</v-icon
          >
        </v-btn>
        <v-btn icon :to="{ name: 'Login' }">
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text
text--accent-4"
        >
          <v-list-item :to="{ name: 'Home' }">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Login' }">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Register' }">
            <v-list-item-icon> </v-list-item-icon>
            <v-list-item-title>Registro</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Administration' }">
            <v-list-item-icon>
              <v-icon>mdi-wrench</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Administración</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from 'firebase'
import Swal from 'sweetalert2'

export default {
  name: 'Navbar',
  data() {
    return {
      drawer: false,
      group: null
    }
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Nos vemos a la próxima, vuelve pronto',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            this.$router.push({ name: 'Login' }).catch(() => {})
          }, 1200)
        })
    }
  }
}
</script>

<style></style>
