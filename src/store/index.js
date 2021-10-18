import firebase from 'firebase'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courses: [],
    user: null
  },
  getters: {
    sendingCourses(state) {
      return state.courses
    },
    sendingUser(state) {
      return state.user
    },
    sendStudentTotalAllowed(state, getters) {
      return getters.sendingCourses
        .map((state) => state.room)
        .reduce((total, addition) => total + addition, 0)
    },
    sendEnrolledStudents(state, getters) {
      return getters.sendingCourses
        .map((state) => state.enrolled)
        .reduce((total, addition) => total + addition, 0)
    },
    sendFinishedCourses(state, getters) {
      let coursesCounter = 0
      getters.sendingCourses.filter((state) => {
        if (state.status) {
          coursesCounter++
        }
      })
      return coursesCounter
    }
  },
  mutations: {
    MUTATE_LOCAL_USER(state, userData) {
      state.user = userData
    },
    MUTATE_COURSES(state, courses) {
      state.courses = courses
    }
  },

  actions: {
    loadingUser({ commit }, userData) {
      commit('MUTATE_LOCAL_USER', userData)
    },
    bringCourses({ commit }) {
      firebase
        .firestore()
        .collection('courses')
        .onSnapshot((result) => {
          let courses = []
          result.forEach((element) => {
            courses.push({
              code: element.data().code,
              cost: element.data().cost,
              description: element.data().description,
              duration: element.data().duration,
              enrolled: element.data().enrolled,
              image: element.data().image,
              name: element.data().name,
              room: element.data().room,
              status: element.data().status,
              courseId: element.id,
              registerDate: element.data().registerDate
            })
          })
          commit('MUTATE_COURSES', courses)
        })
    },
    addCourse(context, newCourse) {
      return firebase
        .firestore()
        .collection('courses')
        .add({ ...newCourse })
    },
    deleteCourse(context, courseId) {
      return firebase.firestore().collection('courses').doc(courseId).delete()
    },
    updateCourse(context, course) {
      return firebase
        .firestore()
        .collection('courses')
        .doc(course.courseId)
        .update({ ...course })
    }
  },
  modules: {}
})
