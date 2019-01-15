<template>
  <section class="component__audio_player row">
    <header class="row spaced -left">

      <div @click="toggleAudio">
        <audio-button
          :class="player.theme_class"
          :buttonState="audio.state"
        ></audio-button>
      </div>

      <div class="player-address">
        <h3>{{ player.address }}</h3>
        <h4>Theme:
          <span
          :class="player.theme_class"
          >{{ player.theme }}</span>
        </h4>
      </div>

    </header>

    <audio-track
      :class="player.theme_class"
      :percent="audio.progress"
      :handleSeek="seek"
    ></audio-track>

    <p>{{ player.story }}</p>
    <small v-if="player.installed < 1">This work is no longer installed.</small>
  </section>
</template>

<script>
  import {Howl, Howler} from 'howler';
  import AudioButton from '~/components/audio/button';
  import AudioTrack from '~/components/audio/track';

  export default {
    components: {
      AudioButton,
      AudioTrack,
    },

    props: {
      code: {
        type: String,
        default: 'ABCD'
      },
      player: {
        type: Object,
        default: function(){
          return {};
        }
      }
    },

    data() {
      return {
        audio: {
          current: null,
          loaded: false,
          state: 'paused',
          files: {},
          progress: 0,
        }
      }
    },

    created() {
      this.$root.$on('audio-pause', this.pauseAudio);
    },

    destroyed() {
      this.$root.$off('audio-pause', this.pauseAudio);
    },

    methods: {

      toggleAudio: function() {
        // console.log('fn: toggleState');
        switch (this.audio.state){
          case 'playing':
            this.audio.state = 'paused';
            this.pauseAudio();
            break;
          case 'paused':
            this.$root.$emit('audio-pause');
            if (this.audio.loaded){
              this.audio.state = 'playing';
              this.playAudio();
            } else {
              this.audio.state = 'loading';
              this.loadAudio(true);
            }
            break;
          default: break;
        }
      },

      loadAudio: function(autoplay){
        // console.log('fn: loadAudio');
        var id = this.player.audio_file;
        if (!this.audio[id]){
          this.audio.files[id] = new Howl({
            src: ['.mp3','.webm','.ogg','.m4a'].map(ext => this.player.audio + ext),
            html5: true,
          });
        } else {
          this.audio.button = 'paused';
        }
        this.audio.current = this.audio.files[id];
        this.progress = 0;

        this.audio.current.on('load', () => {
          this.audio.loaded = true;
          if (autoplay) {
            this.audio.state = 'playing';
            this.playAudio();
          } else {
            this.audio.state = 'paused';
          }
        });
        this.audio.current.on('end', () => {
          this.audio.state = 'paused';
        });
      },

      playAudio: function(){
        Howler.ctx.resume();
        this.audio.current.play();
        this.stepProgress();
      },

      pauseAudio: function(){
        if (this.audio.current){
          this.audio.current.pause();
          this.audio.state = 'paused';
        }
      },

      stepProgress: function(){
        var seek = this.audio.current.seek()*1 || 0;
        var progress = seek / this.audio.current.duration() * 100;

        if (this.audio.progress != progress){
          this.audio.progress = progress;
        }

        if (this.audio.current.playing()){
          requestAnimationFrame(this.stepProgress.bind(this));
        }
      },

      seek(percent){
        let duration = this.audio.current.duration() || 0;
        let position = percent * duration;

        this.audio.current.seek(position);
        this.stepProgress();
      },
    }
  }
</script>
