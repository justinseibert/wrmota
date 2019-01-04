import Vue from 'vue';

import 'overlayscrollbars/css/OverlayScrollbars.min.css';
import OverlayScrollbars from 'OverlayScrollbars';

Vue.prototype.$overlayScrollbars = (elem) => {

  let selector = typeof elem === 'undefined' ? '._scrollable' : elem;

  return OverlayScrollbars(document.querySelectorAll(selector), {
    className       : "_esprcsso-scrollbars",
    sizeAutoCapable : true,
    paddingAbsolute : true,
    clipAlways: false,
  });

};
