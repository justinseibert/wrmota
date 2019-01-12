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
    <transition name="menu">
      <section
        v-if="menuVisible"
        class="main-menu-container">
        <nav class="main-menu -column">
          <ul class="fill-column">
            <li
              v-for="(link, index) in links"
              :class="itemClass(link.url)"
            >
              <span
                class="main-menu-item"
                :style="{ transitionDelay: animationDelay(index) }"
                v-on:click="goTo(link.url)">{{ link.page }}</span>
            </li>
            <li class="social-media-container">
              <a href="https://www.facebook.com/wrmotaevent/" class="main-menu-item" target="_blank"><svg-facebook /></a>
              <a href="https://www.instagram.com/wrmota_org/" class="main-menu-item" target="_blank"><svg-instagram /></a>
            </li>
          </ul>
          <footer class="main-menu-footer row spaced -center">
            <p>a <a href="https://www.facebook.com/Berks-Community-Murals-303283199762632/" target="_blank">Berks Community Murals</a> project in collaboration with <a href="https://besttest.studio" target="_blank">BESTTEST</a></p>
          </footer>
        </nav>
      </section>
    </transition>
  </section>
</template>

<script>
  import SvgMenu from '~/components/svg/menu';
  import SvgClose from '~/components/svg/close';

  import SvgFacebook from '~/components/svg/facebook';
  import SvgInstagram from '~/components/svg/instagram';

  export default {

    components: {
      SvgMenu,
      SvgClose,
      SvgFacebook,
      SvgInstagram
    },

    props: {
      theme: {
        type: String,
        default: 'blue'
      }
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
      url() {
        return this.$route.path;
      }
    },

    data() {
      return {
        links: [
          { page: 'home', url: '/' },
          { page: 'collection', title: 'current collection', url: '/collection/2018' },
          { page: 'donate', url: 'https://www.gofundme.com/wrmota'}
        ]
      }
    },

    methods: {
      toggleVisibility: function(){
        this.$store.commit('menu', !this.menuVisible);
      },

      animationDelay: function(index){
        let reverseOrder = (this.links.length-1) - index;
        return `${ reverseOrder * 80 }ms`;
      },

      goTo: function(url) {
        if (url.indexOf('http') > -1) {
          window.location = url;
        } else if (url != this.$route.path) {
          this.$router.push({ path: url });
        }
        this.toggleVisibility();
      },

      itemClass: function(url){
        if (url == '/' && this.url == '/'){
          return 'selected';
        } else if (url != '/' && this.url.indexOf(url) > -1){
          return 'selected';
        }
      }
    }

  }
</script>
