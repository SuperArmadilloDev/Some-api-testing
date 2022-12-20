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
    movies: state => state.movies,
    actors: state => state.actors
  },
  mutations: {
    editMovies(state, data) {
      state.movies = { ...data }
    },

    editActors(state, data) {
      state.actors.push({ ...data })
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

    async fetchActorById({commit, getters}, context) {
      const find = getters.actors.find((e) => e.id == context.id)
      if (find)
        return find

      try{
        const {data: {id, first_name, last_name}} = await axios.get(`${API_URL}actors/${context.id}`)

        commit('editActors', {id, first_name, last_name})

        return {id, first_name, last_name}


      } catch (error){
        alert(error)
      }
    }
  },
  modules: {
  }
})
