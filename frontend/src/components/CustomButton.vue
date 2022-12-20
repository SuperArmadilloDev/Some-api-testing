<template>
    <v-btn
    class="mr-4 white--text"
    color="blue"
    @click="$emit('clicked')"
    > 
        <slot/>
    </v-btn>
</template>
<script>
    export default {
        props: {
            data : Boolean,
            movieId : Number
        },
  }
</script>