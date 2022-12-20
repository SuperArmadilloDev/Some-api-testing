<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center" class="mx-10">
    <v-expansion-panels accordion >
      <v-expansion-panel
        v-for="res in this.$store.getters.movies.results"
        :key="res.id"
      >
        <v-expansion-panel-header class="text-h5">{{ res.title }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="mb-5">
          <div class="text-h6">rating</div>
          <v-rating
            background-color="grey lighten-2"
            length="5"
            readonly
            size="20"
            :value="3"
          ></v-rating>
          </div>
          <div class="mb-5">
            <div class="text-h6">
              description:
            </div>
            <div>
              {{ res.description }}
            </div>
          </div>

          <div class="mb-5" v-if="res.actors.length > 0">
            <div class="text-h6">
              Actors:
            </div>
            <div class="d-flex flex-row">
              <v-card class="mr-5 pa-5" outlined v-for="actor in res.actors" :key="actor">
                {{ actor }}
              </v-card>
            </div>
          </div>

          <div class="d-flex flex-row gap-5">
            <CustomButton>
              Add rating
            </CustomButton>
            <CustomButton>
              Edit
            </CustomButton>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="text-center mt-5">
    <v-pagination
      v-model="page"
      :length="Math.trunc(this.$store.state.movies.count / 5)"
      :total-visible="5"
      @input="getMovies"
    ></v-pagination>
  </div>
  </v-row>
</v-container>
</template>

<script>
  import CustomButton from '@/components/CustomButton.vue'

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
      CustomButton,
    },

    methods: {
      getMovies: function(page) {
        this.$store.dispatch(
          {
            type:'fetchMovies',
            page: page
          }
          )
      },   

      getActors: function(page) {
        this.$store.dispatch(
          {
            type:'fetchActors',
            page: page
          }
          )
      },
    }
  }
</script>
