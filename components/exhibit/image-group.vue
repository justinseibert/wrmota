<template>
  <div class="row spaced">
    <div
      class="lazy-images grid g6"
      v-lazy:background-image="address.image.medium[2]"
    />

    <div
      class="lazy-images grid g6"
      v-lazy:background-image="address.image.medium[1]"
    />

    <div
      class="lazy-images -break-heavy grid"
      v-lazy:background-image="address.image[size][0]"
    />
  </div>
</template>

<script>
  export default {

    props: {
      address: {
        type: Object,
        default: function(){
          return {};
        }
      },
      size: {
        type: String,
        default: 'large'
      }
    },

  }
</script>
