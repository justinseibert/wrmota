<template>
  <div id="_scroll_artist_list" class="-full-container">
    <dl class="row component__artist_list">
      <template
        v-for="(artist, index) in artists"
      >
        <dt
          class="row spaced artist-item"
          :class="artist.visible ? 'selected' : ''"
          :id="`_artist_${index}`"
        >
          <div
            class="artist-info"
            v-on:click.stop="updateIndex(index)"
          >
            <h3>{{ artist.name }}</h3>
            <h4>{{ artist.location }}</h4>
          </div>
          <a
            :href="artist.website"
            :title="'Visit ' + artist.name + '\'s website.'"
            target="_blank"
            v-if="artist.website"
            class="artist-link"
          >
            <svg-link/>
          </a>
        </dt>
        <dd
          v-if="artist.visible"
          :key="artist.id"
          class="row"
        >
          <template
            v-for="address in artist.addresses"
          >
            <audio-player
              :key="address.id"
              :player="address"
            />
            <image-group
              v-if="isMobile"
              :address="address"
              :size="'medium'"
            />

          </template>
        </dd>
      </template>
    </dl>
  </div>
</template>

<script>
  import SvgLink from '~/components/svg/link';
  import AudioPlayer from '~/components/audio/player';
  import ImageGroup from '~/components/exhibit/image-group';

  export default {
    components: {
      SvgLink,
      AudioPlayer,
      ImageGroup
    },

    props: {
      isMobile: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      artistData() {
        return this.$store.getters.artistAlphaList;
      },
      index() {
        return this.$store.state.index;
      }
    },

    watch: {
      index() {
        // console.log('artists: index change');
        this.toggleArtist();

        if (this.componentActive){
          this.$nextTick(() => {
            this.scrollTo(500);
          });
        }
      }
    },

    data() {
      return {
        artists: {},
        scrollbar: null,
        componentActive: true,
      }
    },

    created() {
      // console.log('artists: created');
      this.artists = JSON.parse(JSON.stringify(this.artistData));
    },

    mounted() {
      // console.log('artists: mounted');
      this.toggleArtist();
      this.scrollbar = this.$overlayScrollbars('#_scroll_artist_list');
    },

    activated() {
      this.componentActive = true;
      this.scrollbar.update(true);
      this.$nextTick(() => {
        this.scrollTo(0);
      });
    },

    deactivated() {
      this.componentActive = false;
    },

    methods: {

      toggleArtist(){
        if (this.index > -1 && !this.artists[this.index].visible){
          let tmp = JSON.parse(JSON.stringify(this.artists));
          tmp[this.index].visible = true;
          this.artists = Object.assign({}, tmp);
        }
      },

      updateIndex(index){
        this.$store.commit('index', index);
      },

      scrollTo(duration){
        if (this.index > -1){
          this.scrollbar.scroll(document.getElementById(`_artist_${this.index}`), duration);
        }
      }

    }
  }
</script>
