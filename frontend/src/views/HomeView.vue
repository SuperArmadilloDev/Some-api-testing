<template>
  <div>
  <v-card>
    <v-list-item 
    v-for="res in this.$store.state.movies.results"
    :key="res.id"
    >
      <v-list-item-content two-line>
        <v-list-item-title>{{ res.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ res.description }}</v-list-item-subtitle>
      </v-list-item-content>

    </v-list-item>

    <div class="text-center">
    <v-pagination
      v-model="page"
      :length="Math.trunc(this.$store.state.movies.count / 5)"
      :total-visible="7"
      @input="getMovies"
    ></v-pagination>
  </div>
  </v-card>
</div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'HomeView',


    beforeMount(){
      this.getMovies(1)
    },

    data(){
      return {
        page: 1
      }
    },

    components: {
      // HelloWorld,
    },

    methods: {
      getMovies: function(page) {
        this.$store.dispatch(
          {
            type:'fetchMovies',
            page: page
          }
          )
        }
    }
  }
</script>
