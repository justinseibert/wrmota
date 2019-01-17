import Vue from 'vue';

import 'overlayscrollbars/css/OverlayScrollbars.min.css';
import OverlayScrollbars from 'overlayscrollbars';

Vue.prototype.$overlayScrollbars = (elem, config) => {
  elem = typeof elem === 'undefined' ? '._scrollable' : elem;
  let default_config = {
    className: "_esprcsso-scrollbars",
    sizeAutoCapable: true,
    paddingAbsolute: true,
    clipAlways: false,
  }

  if (typeof config === 'undefined'){
    config = default_config;
  } else {
    config = {
      ...default_config,
      ...config
    }
  }

  return OverlayScrollbars(document.querySelectorAll(elem), config);
};
