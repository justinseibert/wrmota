<template>
  <nav
    class="code-container"
    :style="y"
  >
    <div
      v-for="code in tiles"
      :class="code"
    ></div>
  </nav>
</template>

<script>
  export default {

    props: {
      top: {
        type: Number,
        deafult: 0,
      },
    },

    computed: {
      y: function() {
          return `top: ${this.top}px`;
      },

      tiles: {
        get: function(){
          return this.code.split('').map(code => `permutation-block permutation-${code}`);
        },
        set: function() {}
      }
    },

    data() {
      return {
        code: 'ABCD'
      }
    },

  }
</script>
