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
          <div class="mb-5" v-if="res.avg_grade">
            <div class="text-h6">rating</div>
            <v-rating
              background-color="grey lighten-2"
              length="5"
              readonly
              size="20"
              :value="parseFloat(res.avg_grade)"
            ></v-rating>
          </div>
          <div class="mb-5">
            <div class="text-h6">
              description:
            </div>
            <div v-if="movieToEdit !== res.id">
              {{ res.description }}
            </div>
            <v-textarea
              v-else
              :name="`input${res.id}`"
              label="Edit Here!"
              :value="res.description"
              v-model="newDescr"
            ></v-textarea>
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

          <div class="d-flex flex-row" v-if="movieToEdit !== res.id">
            <CustomButton
            @clicked="addRating()">
              Add rating
            </CustomButton>
            <CustomButton
            @clicked="
            movieToEdit = res.id
              newDescr = res.description
            ">
              Edit
            </CustomButton>
          </div>
          <div class="d-flex flex-row" v-else>
          <CustomButton
          @clicked="applyChanges(res.id)">
          Apply
        </CustomButton>
          <CustomButton
          @clicked="movieToEdit = -1">
          Cancel
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


    async beforeMount(){
      this.getMovies(1)
    },

    data(){
      return {
        page: 1,
        movieToEdit: -1,
        newDescr: ''
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

      getReviews: async function() {
        await this.$store.dispatch('fetchReviews')
      },

      addRating: function(){
        console.log(this.movieToEdit)
      },

      applyChanges: function(){
        console.log(this.movieToEdit)
        console.log(this.newDescr)

        this.$store.dispatch({
          type: 'editMovieDescr',
          id: this.movieToEdit,
          descr : this.newDescr
        })

        this.newDescr = ''
        this.movieToEdit = -1
      }

    }
  }
</script>
