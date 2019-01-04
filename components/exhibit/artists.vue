<template>
  <div id="_scroll_artist_list" class="-full-container">
    <dl class="row component__artist_list">
      <template
        v-for="(artist, index) in artists"
      >
        <dt
          class="row spaced artist-item"
          v-on:click.stop="toggleAudio(index)"
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
        return this.$store.getters.artistSort;
      }
    },

    data() {
      return {
        artists: {},
      }
    },

    created() {
      this.artists = JSON.parse(JSON.stringify(this.artistData));
    },

    mounted() {
      this.scrollbar = this.$overlayScrollbars('#_scroll_artist_list');
    },

    methods: {

      toggleAudio(index){

        // this.$root.$emit('artist-selection', this.artists[index]);

        let tmp = JSON.parse(JSON.stringify(this.artists));
        let open = tmp[index].visible = !tmp[index].visible;
        this.artists = Object.assign({}, tmp);

        if (open){
          this.scrollbar.scroll(document.getElementById(`_artist_${index}`), 500);
        }
      }

    }
  }
</script>
