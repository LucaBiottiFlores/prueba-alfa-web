<template>
  <v-container>
    <div class="my-6 d-flex justify-center">
      <h2 class="my-2 text-center mx-1 text-h5 text-sm-h2">Administración</h2>
 
      <section class="my-auto">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on"
              >Agregar Curso</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Agregando Curso</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="valid" lazy-validation>

                  <v-text-field
                    v-model="name"
                    :counter="40"
                    :rules="nameRules"
                    label="Nombre"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="image"
                    label="URL imagen curso"
                    required
                    type="url"
                  ></v-text-field>

                  <v-text-field
                    v-model="room"
                    :rules="roomRules"
                    label="Cupos curso"
                    required
                    type="number"
                  ></v-text-field>
      
                  <v-text-field
                    v-model="enrolled"
                    :rules="enrolledRules"
                    label="Inscritos curso"
                    required
                    type="number"
                  ></v-text-field>
     
                  <v-text-field
                    v-model="duration"
                    label="Duración del curso"
                    required
                  ></v-text-field>
    
                  <v-text-field
                    v-model="cost"
                    :rules="costRules"
                    label="Costo curso"
                    required
                    type="number"
                  ></v-text-field>
     
                  <v-text-field
                    v-model="code"
                    label="Código curso"
                    required
                  ></v-text-field>
  
                  <v-textarea
                    outlined
                    label="Descripción del curso"
                    v-model="description"
                  >
                  </v-textarea>

                  <v-container
                    class="
                      mt-5
                      d-flex
                      justify-center
                      align-content-center
                      flex-column
                      flex-sm-column
                      flex-md-row
                      flex-lg-row
                      flex-xl-row
                    "
                  >
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      class="mt-2 mt-sm-2 mt-md-0 mt-lg-0 mt-xl-0 mx-4"
                      @click="validate"
                    >
                      Agregar
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
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </section>
    </div>

    <div>
      <v-data-table
        :headers="headers"
        :items="sendingCourses"
        :items-per-page="5"
        item-key="nombre"
        class="elevation-1"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus'
        }"
      >
        <template v-slot:item.cost="{ item }">
          <v-chip color="green" dark>
            {{ item.cost | numberFormat }}
          </v-chip>
        </template>

        <template v-slot:item.registerDate="{ item }">
          <v-chip color="green" dark>
            {{ item.registerDate }}
          </v-chip>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip
            :color="item.status ? 'blue lighten-1' : 'brown lighten-3'"
            dark
          >
            {{ item.status ? 'Si' : 'No' }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                class="mr-3"
                @click="editing(item)"
                v-bind="attrs"
                v-on="on"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon small @click="deleting(item)" v-bind="attrs" v-on="on">
                mdi-delete
              </v-icon>
            </template>
            <span>Eliminar</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </div>
    <div class="mt-8">
      <v-alert
        color="purple"
        dense
        elevation="1"
        icon="mdi-account-group"
        outlined
      >
        Cantidad total de alumnos permitidos:
        <strong>{{ sendStudentTotalAllowed }}</strong> alumnos
      </v-alert>
      <v-alert
        color="blue"
        dense
        elevation="1"
        icon="mdi-account-multiple-check"
        outlined
      >
        Cantidad total de alumnos inscritos:
        <strong>{{ sendEnrolledStudents }}</strong> alumnos
      </v-alert>
      <v-alert
        color="red"
        dense
        elevation="1"
        icon="mdi-account-clock"
        outlined
      >
        Cantidad total de cupos restantes:
        <strong>{{ remainingRoom }}</strong> alumnos
      </v-alert>
      <v-alert
        color="pink"
        dense
        elevation="1"
        icon="mdi-block-helper"
        outlined
      >
        Cantidad total de cursos terminados:
        <strong>{{ sendFinishedCourses }}</strong> cursos.
      </v-alert>
      <v-alert color="brown" dense elevation="1" icon="mdi-bell-ring" outlined>
        Cantidad total de cursos activos:
        <strong>{{ activeCourses }}</strong> cursos.
      </v-alert>
      <v-alert
        color="deep-orange"
        dense
        elevation="1"
        icon="mdi-bell-ring"
        outlined
      >
        Cantidad total de cursos:
        <strong>{{ totalCoursesAmount }}</strong> cursos.
      </v-alert>
    </div>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'

export default {
  name: 'AdminList',
  data() {
    return {
      valid: true,
      name: '',
      image: '',
      code: '',
      room: 0,
      enrolled: 0,
      roomRules: [
        (value) => !!value || 'Ingresa una cantidad de cupos',
        (value) =>
          (value && value.length >= 0 && /\d/gim.test(value) && value >= 0) ||
          'No se permiten números negativos'
      ],
      enrolledRules: [
        (value) => !!value || 'Es necesario ingresar inscritos',
        (value) =>
          (value && value.length >= 0 && /\d/gim.test(value) && value >= 0) ||
          'Solo enteros positivos permitidos',
        (value) => value <= this.room || 'No hay más cupos disponibles'
      ],
      duration: '',
      cost: 0,
      description: '',
      costRules: [
        (value) => !!value || 'Es necesario que ingreses un costo',
        (value) =>
          (value && value.length >= 0 && /\d/gim.test(value) && value >= 0) ||
          'solo se permiten enteros positivos'
      ],
      nameRules: [
        (value) => !!value || 'Se requiere un nombre',
        (value) =>
          (value && value.length >= 2) ||
          'el nombre debe ser menor a 10 caracteres'
      ],
      dialog: false,
      headers: [
        {
          text: 'Curso',
          align: 'start',
          value: 'nombre'
        },
        { text: 'Cupos', value: 'cupos' },
        { text: 'Inscritos', value: 'inscritos' },
        { text: 'Duración', value: 'duracion' },
        { text: 'Costo', value: 'costo' },
        { text: 'Terminado', value: 'estado' },
        { text: 'Fecha', value: 'fecharegistro' },
        { text: 'Acciones', value: 'acciones' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'sendingCourses',
      'sendStudentTotalAllowed',
      'sendEnrolledStudents',
      'sendFinishedCourses'
    ]),
    remainingRoom() {
      return this.sendStudentTotalAllowed - this.sendEnrolledStudents
    },
    activeCourses() {
      return this.sendingCourses.length - this.sendFinishedCourses
    },
    totalCoursesAmount() {
      return this.sendingCourses.length
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
          image: this.image,
          enrolled: parseInt(this.enrolled),
          duration: this.duration,
          status: false,
          description: this.description,
          registerDate: this.registerDate
        }
        Swal.fire({
          title: '¿Quieres agregar este curso?',
          text: '',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: '<span style="color: white">Cancelar</span>',
          confirmButtonText: 'Agregar curso'
        }).then((resolution) => {
          if (resolution.isConfirmed) {
            this.$store.dispatch('addCourse', newCourse).then(() => {
              Swal.fire('Ok', 'Curso agregado con éxito', 'Curso agregado')
              this.reset()
              this.dialog = false
            })
          } else {
            this.reset()
            this.dialog = false
          }
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
    },
    deleting(item) {
      Swal.fire({
        title:
          '<span class="font-weight-regular">¿Seguro de eliminar el curso?</span>',
        text: 'No podrás recuperarlo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2196F3',
        cancelButtonColor: '#F44336',
        cancelButtonText:
          '<span style="color: white"><strong>Cancelar</strong></span>',
        confirmButtonText:
          '<span style="color: white"><strong>Borrar</strong></span>'
      }).then((resolution) => {
        if (resolution.isConfirmed) {
          this.$store.dispatch('deleteCourse', item.courseId).then(() => {
            Swal.fire('Eliminado', 'Curso eliminado exitosamente', 'Hecho')
          })
        }
      })
    },
    editing(item) {
      this.$router.push({ name: 'Editing', params: { id: item.courseId } })
    }
  }
}
</script>

<style></style>
