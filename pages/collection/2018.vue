<template>
  <div class="-fullscreen-container">
    <exhibit-details
      class="exhibit-container grid"
      :title="title"
      :subtitle="subtitle"
      :tabs="details"
      :initialTab="'about'"
    ></exhibit-details>
    <exhibit-content
      class="content-container grid"
      :tabs="content"
      :initialTab="'map'"
    ></exhibit-content>
  </div>
</template>

<script>
  import ExhibitDetails from '~/components/exhibit/details';
  import ExhibitContent from '~/components/exhibit/content';

  import About from '~/pages/about/2018';
  import Artists from '~/components/exhibit/artists';
  import Credits from '~/pages/credits/2018';

  import Images from '~/components/exhibit/images';
  import LeafletMap from '~/components/map/leaflet';

  export default {

    components: {
      ExhibitDetails,
      ExhibitContent
    },

    computed: {
      artists() {
        return this.$store.getters.artistAlphaList;
      },
      index() {
        return this.$store.state.index;
      },
      route() {
        return this.$route.params.artist;
      }
    },

    watch: {
      index() {
        this.updateRoute();
      },
      route() {
        this.updateIndex();
      },
    },

    data(){
      return {
        details: {
          about: About,
          artists: Artists,
          credits: Credits,
        },
        title: 'WRMOTA',
        subtitle: 'Summer, Fall 2018',
        content: {
          images: Images,
          map: LeafletMap,
        },
        previous: -1,
      }
    },

    mounted() {
      if (this.index > -1){
        this.updateRoute();
      } else if (typeof this.route != 'undefined' && this.route.length > 0){
        this.updateIndex();
      }
    },

    methods: {

      updateRoute: function(){
        if (this.previous != this.index){
          this.$router.push({
            params: { artist: this.artists[this.index].stripped_name }
          });
        }
        this.previous = this.index;
      },

      updateIndex: function(){
        let index = this.artists.findIndex(artist => artist.stripped_name == this.route);
        this.$store.commit('index', index);
      }
    }

  }
</script>
