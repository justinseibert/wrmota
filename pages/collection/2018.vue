<template>
  <div class="-full-container">
    <exhibit-details
      class="exhibit-container grid"
      :title="title"
      :subtitle="subtitle"
      :tabs="details"
      :initialTab="initialDetail"
      :isMobile="isMobile"
    ></exhibit-details>
    <exhibit-content
      v-if="!isMobile"
      class="content-container grid"
      :tabs="content"
      :initialTab="initialContent"
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

  import debounce from 'lodash.debounce';

  export default {

    components: {
      ExhibitDetails,
      ExhibitContent,
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
      },
      metaImages() {
        return this.$store.getters.randomImages;
      },
    },

    watch: {
      index() {
        this.updateRoute();
      },
      route() {
        this.updateIndex();
      },
    },

    head() {
      let images = this.metaImages;
      let description = 'Explore the stories and artwork of WRMOTA 2018.';

      if (this.index > -1){
        let artist = this.artists[this.index];
        images = artist.addresses[0].image.large;
        description = `${description.slice(0,-1)} featuring work by ${artist.visitor} artist ${artist.name} of ${artist.location}`;
      }

      return {
        meta: [
          { property: 'og:title', content: 'West Reading Museum of Temporary Art' },
          { property: 'og:description', content: description },
          { property: 'og:image', content: images[0] },
          { property: 'og:image', content: images[1] },
          { property: 'og:image', content: images[2] },
          { property: 'og:url', content: `https://wrmota.org${this.$route.path}` },
        ],
      }
    },

    data(){
      return {
        details: {
          about: About,
          artists: Artists,
          credits: Credits,
        },
        initialDetail: 'about',
        title: 'WRMOTA',
        subtitle: 'Summer, Fall 2018',
        content: {
          images: Images,
          map: LeafletMap,
        },
        initialContent: 'map',
        previous: -1,
        isMobile: true,
      }
    },

    created() {
      if (this.index > -1){
        this.updateRoute();
      } else if (typeof this.route != 'undefined' && this.route.length > 0){
        this.initialDetail = 'artists',
        this.initialContent = 'images',
        this.updateIndex();
      }
    },

    mounted() {
      window.addEventListener('resize', debounce(this.handleResize.bind(this), 100));
      this.handleResize();
    },

    destroyed() {
      window.removeEventListener('resize', debounce(this.handleResize.bind(this), 100));
    },

    methods: {

      updateRoute: function(){
        if (this.previous > -1 && this.previous != this.index){
          this.$router.replace({
            params: { artist: this.artists[this.index].stripped_name }
          });
        }
        this.initialDetail = 'artists';
        this.previous = this.index;
      },

      updateIndex: function(){
        let index = this.artists.findIndex(artist => artist.stripped_name == this.route);
        this.$store.commit('index', index);
      },

      handleResize: function(e){
        this.isMobile = window.innerWidth >= 600 ? false : true;
      }
    }

  }
</script>
