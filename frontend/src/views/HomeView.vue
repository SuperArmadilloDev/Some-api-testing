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
              color="yellow"
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
          <v-row class="mb-10 mt-5 ml-1" v-if="movieToEdit === res.id">
            <v-dialog
              v-model="dialog"
              max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  @click="getActors"
                >
                  Edit Actors
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Edit Actors</span>
                </v-card-title>
                <v-card-text>
                  <v-list-item v-for="actor in $store.getters.actors" :key="actor.id">
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-checkbox
                          v-model="form.parent_id[actor.id]"
                          :label="`${actor.first_name} ${actor.last_name}`"
                        />
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>


          <div class="d-flex flex-row" v-if="movieToEdit !== res.id">
            <div>
              <v-dialog
                v-model="dialogReview"
                max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mr-4 white--text"
                    color="blue"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Add review
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Add Review</span>
                  </v-card-title>
                  <v-card-text>
                    <v-rating
                      color="yellow"
                      v-model="rating"
                      increments
                      hover
                      background-color="grey lighten-2"
                      length="5"
                      size="64"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialogReview = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="addRating(res.id)"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
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
        newDescr: '',
        dialog: false,
        dialogReview: false,
        checkbox: false,
        rating: 0,
        form: {
        parent_id: []
      }
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
            page
          }
          )
      },   

      getActors: function() {
        this.$store.dispatch('fetchActors')
      },

      getReviews: async function() {
        await this.$store.dispatch('fetchReviews')
      },

      addRating: async function(movieId){
        this.dialogReview = false

          await this.$store.dispatch(
          {
            type:'newReview',
            movieId,
            rating: this.rating
          }
        )

        this.$store.dispatch(
          {
            type:'fetchMovies',
            page: this.page
          }
          )

        this.rating = 0

      },

      applyChanges: function(){
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
