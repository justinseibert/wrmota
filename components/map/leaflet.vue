<template>
  <div
    ref="_map"
    class="map"
    style="height:100%"
  />
</template>

<script>
  import debounce from 'lodash.debounce';

  export default {

    computed: {
      artists() {
        return this.$store.getters.artistAlphaList;
      },
      index() {
        return this.$store.state.index;
      }
    },

    watch: {
      index() {
        this.findArtist();
      }
    },

    data() {
      return {
        config: {
          bounds: {
            n: 40.35535,
            s: 40.314719,
            w: -75.9746,
            e: -75.922069,
          },
          center: [40.3335,-75.9460],
          zoom: {
            init: 16,
            min: 14,
            max: 21,
            user: -1
          },
          allowZoom: true,
          dragging: true,
          padding: [20,20],
          icon: {
            radius: 7,
            weight: 6,
            fill: true,
            fillColor: '#FFF',
            fillOpacity: 1,
            opacity: 1,
          },
          map: `${process.env.SERVER}/img/map/map.min.svg`,
        },
        map: null,
        markers: {},
        layers: {
          overlay: null,
          streets: [],
        },
        componentActive: true,
        init: true,
      }
    },

    mounted() {
      this.createMap(this.$refs._map);
      this.createArtistPoints();
      this.findArtist();
    },

    created() {
      this.init = true;
      document.addEventListener('keydown', this.handleEscKey);
    },

    destroyed() {
      document.removeEventListener('keydown', this.handleEscKey);
    },

    activated() {
      this.componentActive = true;
      document.addEventListener('keydown', this.handleEscKey);

      if (this.init){
        this.map.setView(L.latLng(this.config.center), this.config.zoom.init);
        this.init = false;
      } else {
        try {
          this.map.invalidateSize();
          this.findArtist(false);
        } catch(e) {
          // console.log('can not find artist?');
        }
      }

    },

    deactivated() {
      this.componentActive = false;
      document.removeEventListener('keydown', this.handleEscKey);
    },

    methods: {
      createMap: function(container){
        let center = L.latLng(this.config.center);
        let bounds = L.latLngBounds(
          L.latLng(this.config.bounds.n,this.config.bounds.w),
          L.latLng(this.config.bounds.s,this.config.bounds.e)
        );
        let incr = 0.01;
        let maxBounds = L.latLngBounds(
          L.latLng(this.config.bounds.n+incr,this.config.bounds.w-incr),
          L.latLng(this.config.bounds.s-incr,this.config.bounds.e+incr)
        );
        this.map = L.map(container, {
            attributionControl: false,
            zoomControl: false,
            zoomSnap: 0,
            touchZoom: this.config.allowZoom,
            scrollWheelZoom: this.config.allowZoom,
            zoomAnimationThreshold: 0.025,
            dragging: this.config.dragging,
            minZoom: this.config.zoom.min,
            maxZoom: this.config.zoom.max,
            maxBounds: maxBounds,
            inertia: true,
            inertiaDeceleration: 1000,
            renderer: L.canvas(),
        }).setView(center, this.config.zoom.init);

        this.layers.overlay = L.imageOverlay(this.config.map, bounds).addTo(this.map);
        this.layers.streets = [0,1,2,3].map(n => L.imageOverlay(`${process.env.SERVER}/img/map/streets-${n}.svg`, bounds));
        this.showStreets();

        this.map.on('zoomend', debounce(this.showStreets.bind(this), 100));
      },

      showStreets: function(){
        let zoom = this.map.getZoom();
        if (this.config.zoom.user != 0 && zoom <= 15.2)
        {
          this.removeStreets(0);
          this.config.zoom.user = 0;
        }
        else if (this.config.zoom.user != 1 && zoom > 15.2 && zoom <= 16.6)
        {
          this.removeStreets(1);
          this.config.zoom.user = 1;
        }
        else if (this.config.zoom.user != 2 && zoom > 16.6 && zoom <= 18)
        {
          this.removeStreets(2);
          this.config.zoom.user = 2;
        }
        else if (this.config.zoom.user != 3 && zoom > 18)
        {
          this.removeStreets(3);
          this.config.zoom.user = 3;
        }
      },

      removeStreets: function(save){
        for (let i = 0; i < this.layers.streets.length; i++){
          let iLayer = this.layers.streets[i];
          if (i != save && this.map.hasLayer(iLayer)){
            this.map.removeLayer(iLayer);
          } else if (i == save && !this.map.hasLayer(iLayer)){
            this.map.addLayer(iLayer);
          }
        }
      },

      createMarker: function(coords,properties){
        return L.circleMarker(
          coords,
          { ...this.config.icon, ...properties }
        );
      },

      createArtistPoints: function(){
        this.artists.forEach((artist,index) => {
          artist.addresses.forEach(address => {

            let marker = this.createMarker(
              [address.lat,address.lng],
              { color: address.theme_color }
            ).addTo(this.map);

            marker.address = address;
            marker.index = index;

            this.markers[address.code] = marker;

            marker.on('click', function(el){
              this.$store.commit('index', index);
            }, this);
          })
        })
      },

      findArtist: function(animate=true){
        if (this.componentActive && this.index > -1){
          let addresses = this.artists[this.index].addresses;
          let code = addresses.map(address => address.code);

          if (code.length == 1){
            this.selectSingleCode(code[0], animate);
          } else {
            this.selectMultipleCodes(code, animate);
          }
        }
      },

      selectSingleCode: function(code, animate=true){
        this.minimizeAll();
        this.highlight(code);

        let currentZoom = this.map.getZoom();
        let maxZoom = this.config.zoom.max - 3;
        let zoom = (currentZoom > maxZoom) ? currentZoom : maxZoom;

        this.map.flyTo(
          L.latLng(this.markers[code].address.lat, this.markers[code].address.lng),
          zoom,
          {
            padding: this.config.padding,
            duration: 0.4,
            animate: animate
          }
        );
      },

      selectMultipleCodes: function(codes, animate=true){
        let bounds = [];
        this.minimizeAll();
        codes.forEach(code => {
          this.highlight(code);
          bounds.push([this.markers[code].address.lat, this.markers[code].address.lng]);
        });

        this.map.flyToBounds(
          L.latLngBounds(bounds),
          {
            padding: [100,100],
            duration: 0.4,
            animate: animate
          }
        );
      },

      highlight: function(code){
        this.markers[code]
          .bringToFront()
          .setStyle({
            radius: 10,
            weight: 8,
            fillColor: this.config.icon.fillColor,
            color: this.markers[code].address.theme_color
          });
      },

      minimizeAll: function(){
        for (let marker in this.markers){
          this.markers[marker].setStyle({
            ...this.config.icon,
            ...{
              fillColor: this.markers[marker].address.theme_color,
              radius: 6,
              weight: 0,
            }
          });
        }
      },

      removeHighlight: function(){
        for (let marker in this.markers){
          this.markers[marker].setStyle({
            ...this.config.icon,
            ...{color: this.markers[marker].address.theme_color}
          });
        }
      },

      handleEscKey: function(e){
        if (e.key.indexOf('Esc') > -1 && this.map){
          this.removeHighlight();
        }
      },

    }

  }
</script>
