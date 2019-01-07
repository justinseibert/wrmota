<template>
  <div id="_scroll_artist_list" class="-full-container">
    <dl class="row component__artist_list">
      <template
        v-for="(artist, index) in artists"
      >
        <dt
          class="row spaced artist-item"
          v-on:click.stop="toggleArtist(index)"
          :id="`_artist_${index}`"
        >
          <div class="artist-info">
            <h3>{{ artist.name }}</h3>
            <h4>{{ artist.location }}</h4>
          </div>
          <a
            :href="artist.website"
            :title="'Visit ' + artist.name + '\'s website.'"
            target="blank"
            v-if="artist.website"
            class="artist-link"
          >
            <svg-link></svg-link>
          </a>
        </dt>
        <dd
          v-if="artist.visible"
          :key="artist.id"
          class="row"
        >
          <audio-player
            v-for="address in artist.addresses"
            :key="address.id"
            :player="address"
          ></audio-player>
        </dd>
      </template>
    </dl>
  </div>
</template>

<script>
  import SvgLink from '~/components/svg/link';
  import AudioPlayer from '~/components/audio/player';

  export default {
    components: {
      SvgLink,
      AudioPlayer
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
        if (this.index > -1 && !this.artists[this.index].visible){
          let tmp = JSON.parse(JSON.stringify(this.artists));
          tmp[this.index].visible = true;
          this.artists = Object.assign({}, tmp);
        }

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

      toggleArtist(index){
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
