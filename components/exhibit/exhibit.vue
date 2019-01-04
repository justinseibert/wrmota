<template>
  <article class="component__exhibit">
    <header ref="_exhibit_header" class="exhibit-header">
      <h1>WRMOTA</h1>
      <h2>Summer, Fall 2018</h2>
    </header>
    <nav ref="_exhibit_nav" class="exhibit-nav">
      <ul>
        <li
        v-for="(value, key) in details"
        :key="key"
        :class="(active == key) ? 'active' : ''"
        @click="active = key"
        >{{ key }}</li>
      </ul>
    </nav>
    <section ref="_exhibit_details" class="exhibit-details -full-container">
      <keep-alive>
        <component
          :is="details[active]"
        ></component>
      </keep-alive>
    </section>
  </article>
</template>

<script>
  export default {

    props: {
      details: {
        type: Object,
        default: {
          tabName: 'tabComponent'
        }
      },
      initialTab: {
        type: String,
        default: 'tabName'
      }
    },

    data() {
      return {
        active: this.initialTab,
      }
    }

  }
</script>
