<template>
  <section class="component__main-menu">
    <div
      class="main-menu-button theme-container"
      :class="themeClass"
      v-on:click="toggleVisibility"
    >
      <svg-menu v-if="!menuVisible"/>
      <svg-close v-if="menuVisible"/>
    </div>
    <transition
      name="menu"
    >
      <section
        v-if="menuVisible"
        class="main-menu-container">
        <nav class="main-menu">
          <ul>
            <li
              v-for="(link, index) in links"
              v-if="menuVisible"
              :class="page == link.title ? 'selected' : ''"
            >
              <a href="#"
                :style="{ animationDelay: animationDelay(index) }"
                v-on:click="goTo(link.page)">{{ link.title }}</a>
            </li>
          </ul>
        </nav>
      </section>
    </transition>
  </section>
</template>

<script>
  import SvgMenu from '~/components/svg/menu';
  import SvgClose from '~/components/svg/close';

  export default {

    components: {
      SvgMenu,
      SvgClose,
    },

    props: {
      theme: {
        type: String,
        default: 'blue'
      },
      page: {
        type: String,
        default: ''
      },
    },

    computed: {
      themeClass() {
        return `theme-${this.theme}`
      },
      menuVisible() {
        return this.$store.state.menuVisible;
      },
      menuTransition() {
        return this.$store.state.menuTransition;
      },
    },

    data() {
      return {
        links: [
          { title: 'home', page: '/' },
          { title: 'collection', page: '/collection/2018' },
          { title: 'contact', page: '/contact' },
          { title: 'privacy', page: '/privacy' },
        ],
      }
    },

    mounted() {
      if (this.menuTransition){
        this.$store.commit('menuTransition', false);
        this.toggleVisibility();
      }
    },

    methods: {
      toggleVisibility: function(){
        this.$store.commit('menu', !this.menuVisible);
      },

      animationDelay: function(index){
        return `${ ((this.links.length - index) * 50) + 300 }ms`;
      },

      goTo(url) {
        this.$store.commit('menuTransition', true);
        this.$router.push(url);
      }
    }

  }
</script>
