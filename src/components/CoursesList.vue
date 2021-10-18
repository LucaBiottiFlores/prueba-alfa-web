<template>
  <v-container>
    <h2 class="my-6 text-center display-3">Lista de Cursos</h2>
    <div v-if="show">
      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="6"
          lg="4"
          xl="4"
          v-for="(course, index) in sendingCourses"
          :key="index"
        >
          <v-sheet
            :color="`grey ${grey ? 'darken-2' : 'lighten-4'}`"
            class="pa-3"
          >
            <v-skeleton-loader
              class="mx-auto"
              max-width="300"
              type="card"
            ></v-skeleton-loader>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="6"
          lg="4"
          xl="4"
          v-for="(course, index) in sendingCourses"
          :key="index"
        >
          <v-card max-width="400" class="mx-auto">
            <v-img
              min-height="250px"
              max-height="250px"
              max-width="250px"
              class="mx-auto"
              :src="course.image"
            ></v-img>
            <v-card-text class="fondoCardText">
              <v-card-title class="">
                <p class="ml-3">
                  {{ course.name }}
                </p>
              </v-card-title>
              <div class="font-weight-bold ml-8 mb-2">Información</div>
              <v-timeline align-top dense>
                <v-timeline-item color="deep-purple lighten-1" small>
                  <div>
                    <div class="font-weight-normal">
                      Costo: <strong>{{ course.cost }}</strong>
                    </div>
                    <div>Duración: {{ course.duration }}</div>
                  </div>
                </v-timeline-item>
                <v-timeline-item color="green" small>
                  <div>
                    <div class="font-weight-normal">
                      Cupos: <strong>{{ course.room }}</strong>
                    </div>
                    <div>Completado: {{ course.status ? 'Si' : 'No' }}</div>
                  </div>
                </v-timeline-item>
                <v-timeline-item color="deep-purple lighten-1" small>
                  <div>
                    <div class="font-weight-normal">Fecha de Registro:</div>
                    <div>{{ course.registerDate }}</div>
                  </div>
                </v-timeline-item>
                <v-timeline-item color="green lighten-1" small>
                  <div>
                    <div class="font-weight-normal">Descripción:</div>
                    <div>{{ course.description }}</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CoursesList',
  data() {
    return {
      show: true
    }
  },
  //mapGetters permite utilizar getters de la store en un componente.
  computed: {
    ...mapGetters(['sendingCourses'])
  },
  mounted() {
    setTimeout(() => {
      this.show = false
    }, 2500)
  }
}
</script>

<style></style>
