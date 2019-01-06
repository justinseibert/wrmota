<template>
  <section class="component__exhibit_content -column">

    <keep-alive>
      <component
        class="fill-column -break-light"
        :is="tabs[active]"
      ></component>
    </keep-alive>

    <nav-tabs
      class="nav-blue"
      :tabs="tabs"
      :active="active"
    ></nav-tabs>

  </section>
</template>

<script>
  import NavTabs from '~/components/nav/tabs';

  export default {

    components: {
      NavTabs
    },

    props: {
      tabs: {
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
    },

  }
</script>
