<template>
  <section class="component__home -full-container">
    <h1 class="-hide">West Reading Museum of Temporary Art</h1>
    <section class="logo-title-container">
      <svg-w class="logo-title-w"/>
      <svg-r class="logo-title-r"/>
      <svg-m class="logo-title-m"/>
      <svg-o class="logo-title-o"/>
      <svg-t class="logo-title-t"/>
      <p class="home-description">A public art project dedicated to exhibiting the work of contemporary artists from around the world throughout the streets of West Reading, PA.</p>
      <svg-a class="logo-title-a"/>
    </section>
  </section>
</template>

<script>
  import SvgW from '~/components/svg/title/west';
  import SvgR from '~/components/svg/title/reading';
  import SvgM from '~/components/svg/title/museum';
  import SvgO from '~/components/svg/title/of';
  import SvgT from '~/components/svg/title/temporary';
  import SvgA from '~/components/svg/title/art';

  export default {

    components: {
      SvgW,
      SvgR,
      SvgM,
      SvgO,
      SvgT,
      SvgA
    },

    data(){
      return {
      }
    },

  }
</script>
