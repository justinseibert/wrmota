<template>
  <div
    id="_scroll_artist_images"
    class="-full-container -frame-medium component__artist_images"
  >
    <div
      class="row"
      v-for="(artist, index) in artistData"
      ref="_image_containers"
    >
      <section
        v-for="address in artist.addresses"
        :id="'_images_'+address.code"
        :data-code="address.code"
        :data-artist="artist.name"
      >
        <header class="row spaced -left">
          <div
            class="map-marker"
            :class="address.theme_class">
          </div>
          <h3>{{ artist.name }} <span>&mdash;</span> {{ address.address }}</h3>
        </header>

        <!-- <div class="row spaced -frame-light -unframe-x">
          <div
            v-for="image in address.image.large"
            class="lazy-images grid g4"
            v-lazy:background-image="image"
          />
        </div> -->

        <div
          v-for="image in address.image.large.slice().reverse()"
          class="lazy-images"
          v-lazy:background-image="image"
        />
      </section>
    </div>
  </div>
</template>

<script>
  import debounce from 'lodash.debounce';

  export default {

    computed: {
      codeData() {
        return this.$store.getters.codeFiltered;
      },
      artistData() {
        return this.$store.getters.artistSort;
      }
    },

    data() {
      return {
        selection: {},
        scrollbar: null,
        tops: [],
        sync: true,
      }
    },

    created(){
      this.$root.$on('artist-selection', (codes) => this.showArtwork(codes))
    },

    mounted() {
      this.scrollbar = this.$overlayScrollbars('#_scroll_artist_images', {
          callbacks: {
            onScroll: debounce(this.handleScroll.bind(this), 50),
            // onScrollStop: this.handleScroll,
            onContentSizeChanged: debounce(this.handleContentSizeChanged.bind(this), 100)
          }
      });
    },

    methods: {
      showArtwork: function(codes) {
        if (typeof codes === 'string'){
          this.panTo(codes);
        } else {
          this.panTo(codes[0]);
        }
      },

      panTo: function(code) {
        // console.log('image: handlePanTo');
        this.sync = false;
        let tmp = JSON.parse(JSON.stringify(this.selection));
        tmp[code] = [
          this.codeData[code].image1,
          this.codeData[code].image2,
          this.codeData[code].image3,
        ];
        this.selection = Object.assign({}, tmp);

        this.$nextTick(() => {
          this.scrollbar.scroll(document.getElementById(`_images_${code}`));
        })
      },

      handleScroll: function(){
        // console.log('image: handleScroll');
        if (this.sync){
          console.log('image: sync');
          let position = this.scrollbar.scroll().position.y + (window.innerHeight / 2);
          let index = this.tops.slice().findIndex(y => y > position);

          // console.log('emit: scroll-to-artist');
          this.$root.$emit('scroll-to-artist-index', index - 1);
        } else {
          this.sync = true;
        }
      },

      handleContentSizeChanged: function(e){
        // console.log('image: handleContentSizeChanged');
        let tops = [];
        this.$refs._image_containers.forEach(el => {
          tops.push(el.offsetTop);
        });
        this.tops = tops.slice();
      }

    }

  }
</script>
