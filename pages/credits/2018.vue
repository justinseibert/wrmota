<template>
  <section id="_2018_credits" class="component__credits">
    <div class="container">
      <p>WRMOTA is produced and organized by Michael Miller of <a target="_blank" href="http://facebook.com/Berks-Community-Murals-303283199762632">Berks Community Murals</a> in collaboration with Kayla Mattes and Justin Seibert of <a target="_blank" href="http://besttest.studio">BESTTEST</a>.</p>
      <p>The project is generously funded by West Reading Elm Street, a program of the West Reading Community Revitalization Foundation (<a target="_blank" href="http://wrcrf.org'">WRCRF</a>), along with the Wyomissing Area Education Foundation (<a target="_blank" href="wyoarea-foundation.org">WAEF</a>) and Wyomissing Area School District.</p>
      <p>WRMOTA's innaugural collection has been a community effort, relying on the hard work and cooperation of the following participants:</p>
      <ul>
        <li><a target="_blank" href="http://facebook.com/Berks-Community-Murals-303283199762632">Michael L. Miller</a>, Creator<br><i>Resident Interviews, Local Artist Curation, Artwork Installation</i></li>
        <li><a target="_blank" href="http://kaylamattes.com">Kayla Mattes</a>, Co-creator<br><i>Visiting Artist Curation, Copywriting</i></li>
        <li><a target="_blank" href="http://damp.camp">Justin Seibert</a>, Co-creator<br><i>Design, Web and App Development</i></li>
        <li>Wyomissing Area High School's Public Art Workshop:<br><i>Site Identification</i><br> Michael L. Miller, Instructor</li>
        <li>Wyomissing Area High School's Humanities Class, WRMOTA Group:<br><i>Story Editing</i><br> Joelle Ostrich, Instructor</li>
        <li><a target="_blank" href="http://chadkouri.com">Chad Kouri</a><br><i>Brochure Design</i></li>
        <li><a target="_blank" href="http://pamshields.com">Pam Roule</a><br><i>Additional Artist Curation, Social Media</i></li>
        <li><a target="_blank" href="http://daniellayacono.com">Daniella Yacono</a><br><i>Artwork Photography</i></li>
        <li>The residents and business owners of West Reading, PA.</li>
        <li>Map data <a target="_blank" href="http://openstreetmap.org/copyright">&copy;&nbsp;OpenStreetMap</a></li>
      </ul>
      <img-caption
        class="grid -break-light"
        :src="dean.src"
        :caption="dean.caption"
      ></img-caption>
      <p>Finally, this project owes immeasurable gratitude to the vision and dedication of <a target="_blank" href="https://www.readingeagle.com/news/article/dean-rohrbach-west-reading-elm-street-program-manager-dies">Dean Rohrbach</a>, who launched countless projects like this one and whose presence will be greatly missed by the community he helped create.</p>
      <nuxt-link to="/collection/2018/MikeMiller"><img class="grid -break-light" src="/img/2018/gum-parker-brick.jpg"></nuxt-link>
    </div>
  </section>
</template>

<script>
  import ImgCaption from '~/components/utils/image-caption';

  export default {

    components: {
      ImgCaption
    },

    data() {
      return {
        scrollbar: null,
        dean: {
          src: 'https://www.readingeagle.com/storyimage/RE/20181008/NEWS/310089493/AR/0/AR-310089493.jpg&maxH=500&maxW=750&Q=40',
          caption: 'Dean Rohrbach at the "Knowledge of Athena" mural along West Reading\'s Cherry Street. Photo by Harold Hoch, Reading Eagle'
        }
      }
    },

    mounted() {
      this.scrollbar = this.$overlayScrollbars('#_2018_credits');
    },

  }
</script>
