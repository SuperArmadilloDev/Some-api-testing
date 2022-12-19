import Vue from 'vue'
import Vuex from 'vuex'

import axios from "axios";

//link should be on secret .env file but since it's just a localhost link, it's fine
const API_URL = "http://localhost:8000/api/"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: {
      count: 0,
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
    },

    editActors(state, data) {
      state.actors.push(data)
    },
  },
  actions: {
    async fetchMovies({commit}, context) {
      try{
        const {data: {count, results}} = await axios.get(`${API_URL}movies`, {
          params: {
            page: context.page
          }
        })

        commit('editMovies', {count, results})

      } catch (error){
        alert(error)
      }
    },

    async fetchActorById({commit, state}, context) {
      const find = state.actors.find(e => e == context.id)
      if (find)
        return find

      try{
        const {data} = await axios.get(`${API_URL}actors/${context.id}`)

        commit('editActors', data)

        return data


      } catch (error){
        alert(error)
      }
    }
  },
  modules: {
  }
})
