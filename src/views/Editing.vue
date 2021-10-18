<template>
  <v-container>
    <h1 class="my-5 text-center text-h5 text-sm-h2">
      Editando el curso: {{ name }}
    </h1>
    <div class="mt-10">
      <v-form ref="form" v-model="valid" lazy-validation>
      
        <v-text-field
          v-model="name"
          :counter="20"
          :rules="nameRules"
          label="Nombre"
          required
        ></v-text-field>

        <v-text-field
          v-model="image"
          label="URL imagen"
          required
          type="url"
        ></v-text-field>

        <v-text-field
          v-model="room"
          :rules="roomRules"
          label="Cupos del curso"
          required
        ></v-text-field>

        <v-text-field
          v-model="enrolled"
          :rules="enrolledRules"
          label="Inscritos en el curso"
          required
        ></v-text-field>

        <v-text-field
          v-model="duration"
          label="Duración del curso"
          required
        ></v-text-field>

        <v-text-field
          v-model="cost"
          :rules="costRules"
          label="Costo del curso"
          required
        ></v-text-field>

        <v-text-field
          v-model="code"
          label="Código del curso"
          required
        ></v-text-field>

        <v-textarea
          outlined
          label="Descripción del curso"
          v-model="description"
        >
        </v-textarea>

        <v-text-field
          v-model="registerDate"
          label="Fecha de Registro"
          required
          type="date"
        ></v-text-field>

        <v-switch
          v-model="status"
          :label="status ? 'Terminado: Si' : 'Terminado: No'"
          color="indigo"
          :true-value="status"
          hide-details
        ></v-switch>

        <v-container
          class="mt-5 d-flex justify-center align-content-center flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row"
        >
          <v-btn
            :disabled="!valid"
            color="success"
            class="mt-2 mt-sm-2 mt-md-0 mt-lg-0 mt-xl-0 mx-4"
            @click="validate"
          >
            Actualizar
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

          <v-btn
            color="primary"
            class="mt-4 mt-sm-4 mt-md-0 mt-lg-0 mt-xl-0 mx-4"
            @click="$router.go(-1)"
          >
            Regresar
          </v-btn>
        </v-container>
      </v-form>
    </div>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'
export default {
     name: 'Editing',
  props: ['id'],
  computed: {
    ...mapGetters(['sendingCourses'])
  },
  data() {
    return {
      valid: true,
      name: '',
      image: '',
      code: '',
      enrolled: 0,
      description: '',
      room: 0,
      roomRules: [
        (v) => !!v || 'Debes ingresar cupos',
        (v) =>
          (v && v.length >= 0 && /\d/gim.test(v) && v >= 0) ||
          'Solo se admiten números positivos'
      ],
      enrolledRules: [
        (v) => !!v || 'Ingresa un número de inscritos',
        (v) =>
          (v && v.length >= 0 && /\d/gim.test(v) && v >= 0) ||
          'Solo se admiten números positivos',
        (v) =>
          v <= this.room ||
          'No pueden haber más inscritos que cupos'
      ],
      duration: '',
      cost: 0,
      costRules: [
        (v) => !!v || 'Ingresa un costo',
        (v) =>
          (v && v.length >= 0 && /\d/gim.test(v) && v >= 0) ||
          'Solo se admiten números positivos'
      ],
      nameRules: [
        (v) => !!v || 'El nombre es necesario',
        (v) =>
          (v && v.length >= 2) ||
          'El nombre debe ser mayor o igual a dos caracteres'
      ],
      dialog: false,
      registerDate: '',
      status: false
    }
  },
  watch: {
    status(nuevo) {
      if (nuevo) {
        this.enrolled = 0
      }
    }
  },
  mounted() {
    let foundCourse = this.sendingCourses.find(
      (result) => result.courseId === this.id
    )
    if (foundCourse !== undefined) {
      this.room = parseInt(foundCourse.room)
      this.duration = foundCourse.duration
      this.code = foundCourse.code
      this.courseId = foundCourse.courseId
      this.image = foundCourse.image
      this.description = foundCourse.description
      this.name = foundCourse.name
      this.cost = parseFloat(foundCourse.cost)
      this.status = foundCourse.status
      this.enrolled = parseInt(foundCourse.enrolled)
      this.registerDate = foundCourse.registerDate
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Curso no encontrado',
        footer: 'Intenta nuevamente'
      })
      setTimeout(() => {
        this.$router.replace({ name: 'Administracion' })
      }, 1000)
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        let newCourse = {
          name: this.name,
          code: this.code,
          cost: parseFloat(this.cost),
          room: parseInt(this.room),
          enrolled: parseInt(this.enrolled),
          image: this.image,
          duration: this.duration,
          status: this.status,
          registerDate: this.registerDate,
          courseId: this.courseId,
          description: this.description
        }
        this.$store.dispatch('updateCourse', newCourse).then(() => {
          Swal.fire('Ok', 'Curso Actualizado', 'éxito')
          this.reset()
          setTimeout(() => {
            this.$router.replace({ name: 'Administracion' })
          }, 1000)
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Algo salió mal',
          footer: 'Intenta nuevamente'
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

<style>

</style>