<template>
  <nav ref="_nav" class="component__nav">
    <ul>
      <li
      v-for="(value, key) in tabs"
      :key="key"
      :class="(active == key) ? 'active' : ''"
      @click="setActive(key)"
      >{{ key }}</li>
    </ul>
  </nav>
</template>

<script>
  export default {

    props: {
      tabs: {
        type: Object,
        default: {
          tabName: 'tabComponent'
        }
      },
      active: {
        type: String,
        default: 'tabName'
      },
    },

    methods: {
      setActive: function(key){
        this.$parent.active = key;
      }
    },

  }
</script>
