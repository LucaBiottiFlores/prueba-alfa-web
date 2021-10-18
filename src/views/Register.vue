<template>
  <v-container>
    <h1 class="mt-10">Registro de Usuario</h1>
    <div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :counter="20"
          :rules="passwordRules"
          label="Password"
          required
          type="password"
        ></v-text-field>
        <v-container
          class="
            mt-5
            d-flex
            justify-center
            align-content-center
            flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row
          "
        >
          <v-btn
            :disabled="!valid"
            color="success"
            class="mt-2 mt-sm-2 mt-md-0 mt-lg-0 mt-xl-0 mx-4"
            @click="validate"
          >
            Registrar
          </v-btn>
          <v-btn
            color="error"
            class="mt-4 mt-sm-4 mt-md-0 mt-lg-0 mt-xl-0 mx-4"
            @click="reset"
          >
            Limpiar Formulario
          </v-btn>
          <v-btn
            color="warning"
            class="mt-4 mt-sm-4 mt-md-0 mt-lg-0 mt-xl-0 mx-4"
            @click="resetValidation"
          >
            Limpiar Validación
          </v-btn>
        </v-container>
      </v-form>
    </div>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'
import firebase from 'firebase'

export default {
  name: 'Login',
  data() {
    return {
      valid: true,
      password: '',
      passwordRules: [
        (v) => !!v || 'Se requiere contraseña',
        (v) =>
          (v && v.length >= 8) ||
          'Escribe una contraseña mayor o igual a 8 caracteres'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'Se requiere correo electrónico',
        (v) => /.+@.+\..+/.test(v) || 'Escribe un correo electrónico válido'
      ]
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            setTimeout(() => {
              this.$router.push({ name: 'Home' }).catch(() => {})
            }, 400)
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ingresa la información requerida correctamente',
              footer: 'Intenta de nuevo'
            })
          })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ingresa la información requerida correctamente',
          footer: 'Intenta de nuevo'
        })
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style></style>
