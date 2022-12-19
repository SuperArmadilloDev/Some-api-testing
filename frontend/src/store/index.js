import Vue from 'vue'
import Vuex from 'vuex'

import axios from "axios";

//link should be on secret .env file
const API_URL = "http://localhost:8000/api/"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    actors: [],
    reviews: [],
  },
  getters: {
  },
  mutations: {
    editMovies() {
      // state.movies = data
    }
  },
  actions: {
    async fetchMovies({commit}, context) {
      console.log(context.page)
      try{
        const {data: {count, next, previous, results}} = await axios.get(`${API_URL}movies`, {
          params: {
            page: context.page
          }
        })
        console.log(count, next, previous, results)

        commit('editMovies')

      } catch (error){
        alert(error)
      }
    }
  },
  modules: {
  }
})
