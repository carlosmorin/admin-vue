import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activity_logs: []
  },
  mutations: {
    setActivityLogs(state, ActivityLogs){
      state.activity_logs = ActivityLogs
    }
  },
  actions: {
   fetchActivityLogs({commit}){
      axios.get('http://localhost:3000/api/activity_logs')
      .then(response => {
        console.log("response", response.data)
        commit('setActivityLogs', response.data)
      })
      .catch(error => {
        console.log("Error", error)
      })
    }

  }
})