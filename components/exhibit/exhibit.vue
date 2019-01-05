<template>
  <article class="component__exhibit">
    <header ref="_exhibit_header" class="exhibit-header">
      <h1>{{ title }}</h1>
      <h2>{{ subtitle }}</h2>
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
    <section ref="_exhibit_details" class="exhibit-details">
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
      title: {
        type: String,
        default: 'Archive'
      },
      subtitle: {
        type: String,
        default: ''
      },
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
