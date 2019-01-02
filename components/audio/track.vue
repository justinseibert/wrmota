<template>
  <div
    ref="_player_track"
    class="component__audio_track player-track"
    @mousemove="handleMouseMove"
    @mouseout="handleMouseOut"
    @click="handleClick"
  >
    <div class="player-progress" v-bind:style="progressTransform"></div>
    <div class="player-seek" v-bind:style="seekTransform"></div>
  </div>
</template>

<script>
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      },
      handleSeek: {
        type: Function,
        default: function(){
          return 0;
        }
      }
    },

    data() {
      return {
        seek: -100,
      }
    },

    computed: {
      progressTransform() {
        return this.transformString(this.percent);
      },
      seekTransform() {
        return this.transformString(this.seek);
      }
    },

    methods: {

      transformString: function(x){
        return `transform: translate3d(${x}%, 0, 0)`;
      },

      handleClick: function(){
        this.handleSeek((100 + this.seek)/100);
      },

      handleMouseOut: function(e){
        this.seek = -100;
      },

      handleMouseMove: function(e){
        let position = e.target.clientWidth - this.getClientPosition(e).x;
        this.seek = 1- ((position / e.target.clientWidth) * 100);
      },

      getClientPosition(e) {
        // grab touches or mouse position
        let x,y;
        if (e.touches){
          x = e.touches[0].clientX;
          y = e.touches[0].clientY;
        } else {
          x = e.clientX;
          y = e.clientY;
        }

        // return x,y touch position adjusted for position of canvas on page
        const interactive = this.$refs._player_track.getBoundingClientRect();
        return {
          x: x - interactive.left,
          y: y - interactive.top
        }
      },

    }
  }
</script>
