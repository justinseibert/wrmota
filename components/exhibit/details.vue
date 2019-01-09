<template>
  <article class="component__exhibit_details -column">

    <nav-code
      :top="codeY"
    ></nav-code>

    <header ref="_exhibit_header" class="exhibit-header">
      <h1>{{ title }}</h1>
      <h2>{{ subtitle }}</h2>
    </header>

    <nav-tabs
      class="exhibit-nav nav-nostalgia-invert"
      :tabs="tabs"
      :active="activeTab"
    ></nav-tabs>

    <section ref="_exhibit_details" class="exhibit-details fill-column">
      <keep-alive>
        <component
          :is="tabs[activeTab]"
          :isMobile="isMobile"
        ></component>
      </keep-alive>
    </section>

  </article>
</template>

<script>
  import NavTabs from '~/components/nav/tabs';
  import NavCode from '~/components/nav/code';

  export default {

    components: {
      NavCode,
      NavTabs,
    },

    props: {
      title: {
        type: String,
        default: 'Archive'
      },
      subtitle: {
        type: String,
        default: ''
      },
      tabs: {
        type: Object,
        default: {
          tabName: 'tabComponent'
        }
      },
      initialTab: {
        type: String,
        default: 'tabName'
      },
      isMobile: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      activeTab: {
        get() {
          return this.active;
        },
        set(val){
          this.active = val;
        }
      }
    },

    data() {
      return {
        active: this.initialTab,
        codeY: 100,
      }
    },

    mounted() {
      this.codeY = this.$refs._exhibit_details.offsetTop;
    }

  }
</script>
