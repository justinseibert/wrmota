<template>
  <div class="component__audio_button player-button">
    <svg-loading v-if="buttonState=='loading'"></svg-loading>
    <svg-play v-if="buttonState=='paused'"></svg-play>
    <svg-pause v-if="buttonState=='playing'"></svg-pause>
  </div>
</template>

<script>
  import SvgLoading from '~/components/svg/loading';
  import SvgPlay from '~/components/svg/play';
  import SvgPause from '~/components/svg/pause';

  export default {
    components: {
      SvgLoading,
      SvgPlay,
      SvgPause,
    },

    props: {
      buttonState: {
        type: String,
        default: 'loading'
      },
    }
  }
</script>
