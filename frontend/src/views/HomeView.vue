<template>
  <v-btn @click="test">this is a test</v-btn> 
    <!-- <hello-world /> -->
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'HomeView',

    components: {
      // HelloWorld,
    },


    methods: {
      test: function() {
        // console.log(this.$store.state)
        this.$store.dispatch(
          {
            type:'fetchMovies',
            page: 2
          }
         )
      }
    }

    
    // setup() {
    //   const movies = this.$store.state.movies
    //   const test = this.$store.state.testData

    //   console.log(test)

    //   return {movies, test}
    // },
  }
</script>
