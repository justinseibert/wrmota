<template>
  <figure class="component__image-caption">
    <img
      :src="src"
      :title="this.title.length < 1 ? this.caption : this.title"
      :alt="this.alt.length < 1 ? this.caption : this.alt"
      />
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>

<script>
  export default {

    props: {
      src: {
        type: String,
        default: '/img/loading.png'
      },
      title: {
        type: String,
        default: ''
      },
      alt: {
        type: String,
        default: ''
      },
      caption: {
        type: String,
        default: ''
      },
    },

  }
</script>
