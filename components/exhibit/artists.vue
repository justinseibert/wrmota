<template>
  <dl class="row component__artist_list">
    <template
      v-for="(artist, index) in artists"
    >
      <dt
        class="row spaced artist-item"
        v-on:click="toggleAudio(index)"
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

    methods: {

      toggleAudio(index){
        let tmp = JSON.parse(JSON.stringify(this.artists));
        tmp[index].visible = !tmp[index].visible;
        this.artists = Object.assign({}, tmp);
      }

    }
  }
</script>
