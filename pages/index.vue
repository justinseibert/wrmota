<template>
    <section class="component__home -full-container" v-on:click="active = !active">
      <h1 class="-hide">West Reading Museum of Temporary Art</h1>
      <transition name="logo">
        <section class="logo-title-container" v-if="active">
          <svg-w class="logo-title-w"/>
          <svg-r class="logo-title-r"/>
          <svg-m class="logo-title-m"/>
          <div class="logo-title-o"><svg-o /></div>
          <svg-t class="logo-title-t"/>
          <p class="home-description">A public art project dedicated to exhibiting the work of contemporary artists from around the world throughout the streets of West Reading, PA.</p>
          <svg-a class="logo-title-a"/>
        </section>
    </transition>
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

    computed: {
      metaImages() {
        return this.$store.getters.randomImages;
      },
    },

    data(){
      return {
        active: false,
      }
    },

    head() {
      return {
        meta: [
          { property: 'og:title', content: 'West Reading Museum of Temporary Art' },
          { property: 'og:image', content: this.metaImages[0] },
          { property: 'og:image', content: this.metaImages[1] },
          { property: 'og:image', content: this.metaImages[2] },
          { property: 'og:url', content: `https://wrmota.org${this.$route.path}` },
        ],
      }
    },

    created() {
      if (this.$store.state.history > 0){
        window.setTimeout(function(){
          this.setActive();
        }.bind(this), 300);
      } else {
        this.setActive();
      }
    },

    destroyed() {
      // console.log('destroyed');
      this.active = false;
    },

    methods: {
      setActive() {
        this.active = false;

        this.$nextTick(() => {
          this.active = true;
          this.$store.commit('historyIncrement');
        });
      }
    }

  }
</script>
