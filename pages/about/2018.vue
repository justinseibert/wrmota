<template>
  <div id="_2018_about" class="component__about -full-container -frame-medium -full-container">
    <div class="row">
      <img class="grid -break-light" src="/img/2018/west-reading-homes.jpg">
      <p>During the summer and fall of 2018, the West Reading Museum of Temporary Art invited neighbors and vistors alike to explore the streets of West Reading, PA in search of a selection of brick-sized murals installed on homes and businesses throughout.</p>
      <p>The collection sought to unearth personal histories of the borough that would otherwise remain unrecorded.</p>
      <p>Each mural is a response to a story told by a local site-owner that reflects a memory related to the specific location.</p>
      <img class="grid -break-light" src="/img/2018/dylan-hayes-install.jpg">
      <img class="grid -break-light" src="/img/2018/katie-batten.jpg">
      <p>Themes of community, nostalgia, connection and loss arise from the dozens of catalogued stories collected across generations and interpreted by 100 artists from Spain, Germany, the Netherlands, UK and all over the United States, including a selection of local Berks County participants.</p>
      <img-caption
        class="grid -break-light"
        :src="image.envelopes.src"
        :caption="image.envelopes.caption"
      />
      <p>Planning for the project began in June of 2017, led by local artist Mike Miller of <a href="https://www.facebook.com/Berks-Community-Murals-303283199762632/" targer="_blank">Berks Community Murals</a> in collaboration with Kayla Mattes and Justin Seibert of <a href="https://besttest.studio" target="_blank">BESTTEST</a>.</p>
      <img-caption
        class="grid -break-light"
        :src="image.paste.src"
        :caption="image.paste.caption"
      />
      <img class="grid -break-light" src="/img/2018/madeline-gallucci-install.jpg">
    </div>

    <hr>

    <div class="row">
      <p>The process of uninstalling the artwork began in November, however, many are still up. You can download the app for iOS and Android to experience the work and their stories in-person.</p>
      <p>Work that is no longer installed will not appear on the app's map. These works currently have on a grey icon on this website.</p>
      <p class="row spaced -left -break-light">
        <a href="https://itunes.apple.com/us/app/wrmota/id1373824275?mt=8">
          <img class="dl-badge" alt='Download on the App Store' src="/img/icon/badge-ios.svg">
        </a>
        <a href='https://play.google.com/store/apps/details?id=org.wrmota.app'>
          <img class="dl-badge" alt='Get it on Google Play' src='/img/icon/badge-android.png'/>
        </a>
      </p>
      <p>Though intended as a temporary installation to accompany the borough's large array of permanent murals, the full collection will remain archived on this website.</p>
      <p>Use the tabs and interactive map on this page to listen to the stories and view the original artwork.</p>
    </div>
  </div>
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
        image: {
          paste: {
            src: '/img/2018/wheatpaste.jpg',
            caption: 'The underside of the murals, awaiting a wheat paste primer.'
          },
          envelopes: {
            src: '/img/2018/envelopes.jpg',
            caption: 'Envelopes containing each mural as sent by the artist. Organized by their destined locations and stored in sketch books.'
          }
        }
      }
    },

    mounted() {
      this.scrollbar = this.$overlayScrollbars('#_2018_about');
    },

  }
</script>

<style>
  .dl-badge {
    margin-right: 0.5em;
    height: 40px;
  }
</style>
