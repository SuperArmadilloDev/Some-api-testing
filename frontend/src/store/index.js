import Vue from 'vue'
import Vuex from 'vuex'

import axios from "axios";

//link should be on secret .env file
const API_URL = "http://localhost:8000/api/"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: {
      count: 0,
      next: null,
      previous: null,
      results: []
    },
    actors: [],
    reviews: [],
  },
  getters: {
  },
  mutations: {
    editMovies(state, data) {
      state.movies = { ...data }
    }
  },
  actions: {
    async fetchMovies({commit}, context) {
      try{
        const {data: {count, next, previous, results}} = await axios.get(`${API_URL}movies`, {
          params: {
            page: context.page
          }
        })
        
        commit('editMovies', {count, next, previous, results})

      } catch (error){
        alert(error)
      }
    }
  },
  modules: {
  }
})
