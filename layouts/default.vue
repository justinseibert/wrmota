<template>
  <main class="-full-container">
    <nav-menu
      theme="blue"
      page="home"
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
