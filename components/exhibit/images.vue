<template>
  <div
    id="_scroll_artist_images"
    class="-full-container component__artist_images"
  >
    <div
      class="row image-container"
      v-for="(artist, index) in artists"
      ref="_image_containers"
      :id="'_images_'+index"
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
            v-lazy:background-image="address.image.large[0]"
          />
        </div>

      </section>
    </div>
  </div>
</template>

<script>
  import debounce from 'lodash.debounce';

  export default {

    computed: {
      artists() {
        return this.$store.getters.artistAlphaList;
      },
      index() {
        return this.$store.state.index;
      }
    },

    watch: {
      index() {
        this.update = false;
        if (this.componentActive && this.sync){
          this.scrollTo();
        }
        this.sync = true;
      }
    },

    data() {
      return {
        scrollbar: null,
        offsets: [],
        sync: true,
        update: true,
      }
    },

    mounted() {
      this.scrollbar = this.$overlayScrollbars('#_scroll_artist_images', {
          callbacks: {
            onScroll: debounce(this.handleScroll.bind(this), 50),
            onContentSizeChanged: debounce(this.handleContentSizeChanged.bind(this), 100)
          }
      });
    },

    activated() {
      this.componentActive = true;
      this.scrollbar.update(true);
      this.$nextTick(() => {
        this.scrollTo();
      });
    },

    deactivated() {
      this.componentActive = false;
    },

    methods: {
      scrollTo: function() {
        // console.log('image: handlePanTo');
        if (this.index > -1){
          this.scrollbar.scroll(document.getElementById(`_images_${this.index}`));
        }
      },

      handleScroll: function(){
        // console.log('image: handleScroll');
        if (this.update){
          let position = this.scrollbar.scroll().position.y + (window.innerHeight * 0.6);
          let index = this.offsets.slice().findIndex(y => y > position) - 1;

          if (index > -1){
            this.sync = false;
            this.$store.commit('index', index);
          }
        }
        this.update = true;
      },

      handleContentSizeChanged: function(e){
        // console.log('image: handleContentSizeChanged');
        let offsets = [];
        this.$refs._image_containers.forEach(el => {
          offsets.push(el.offsetTop);
        });
        this.offsets = offsets.slice();
      }

    }

  }
</script>
