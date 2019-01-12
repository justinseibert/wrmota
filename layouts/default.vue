<template>
  <main class="-full-container">
    <nav-menu
      :theme="this.$route.path.indexOf('collection') > -1 ? 'nostalgia' : 'blue'"
    />
    <nuxt/>
  </main>
</template>

<script>
  import NavMenu from '~/components/nav/menu';

  export default {

    components: {
      NavMenu
    }

  }
</script>
