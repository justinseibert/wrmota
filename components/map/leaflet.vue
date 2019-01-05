<template>
  <div
    ref="_map"
    class="map"
    style="height:100%"
  ></div>
</template>

<script>
  import L from 'leaflet';
  import debounce from 'lodash.debounce';

  export default {

    computed: {
      codeData() {
        return this.$store.getters.filtered;
      }
    },

    data() {
      return {
        showFooter: true,
        fetch_attempt: 0,
        artistData: null,
        points: false,
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
          show_all: true,
        },
        map: null,
        markers: {},
        layers: {
          base: null,
          overlay: null,
          streets: [],
          marker: null,
          highlight: null,
        },
      }
    },

    created() {
      this.$root.$on('artist-selection', (selection) => this.findArtist(selection));
    },

    destroyed() {
      this.$root.$off('artist-selection', this.findArtist);
    },

    mounted() {
      this.createMap(this.$refs._map);
      this.createArtistPoints();
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
        // this.map.on('zoomend', () => this.showStreets());

        document.addEventListener('keydown', (e) => {
          if (e.key == 'Esc' || e.key == 'Escape'){
            this.removeHighlight();
          }
        })
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
        this.codeData.forEach(item => {
          let marker = this.createMarker(
            [item.lat,item.lng],
            { color: item.theme_color }
          ).addTo(this.map);
          marker.data = item;
          this.markers[item.code] = marker;

          marker.on('click', function(el){
            this.findArtist({code: item.code});
          }, this);
        });
      },

      selectSingleCode: function(code){
        this.highlight(code);

        let currentZoom = this.map.getZoom();
        let maxZoom = this.config.zoom.max - 3;
        let zoom = (currentZoom > maxZoom) ? currentZoom : maxZoom;
        this.map.flyTo(L.latLng(this.markers[code].data.lat, this.markers[code].data.lng), zoom, {padding: this.config.padding, duration: 0.4});
      },

      selectMultipleCodes: function(codes){
        let bounds = [];
        codes.forEach(code => {
          this.highlight(code);
          bounds.push([this.markers[code].data.lat, this.markers[code].data.lng]);
        });

        let currentZoom = this.map.getZoom();
        let maxZoom = this.config.zoom.max - 3;
        let zoom = (currentZoom > maxZoom) ? currentZoom : maxZoom;

        this.map.flyToBounds(L.latLngBounds(bounds), {padding: [100,100], duration: 0.4,});
      },

      findArtist: function(selection){
        for (let marker in this.markers){
          this.markers[marker].setStyle({
            ...this.config.icon,
            ...{
              fillColor: this.markers[marker].data.theme_color,
              radius: 6,
              weight: 0,
            }
          });
        }

        if (typeof selection === 'string'){
          this.selectSingleCode(selection);
        } else {
          this.selectMultipleCodes(selection);
        }
      },

      highlight: function(code){
        this.markers[code]
          .bringToFront()
          .setStyle({
            radius: 10,
            weight: 8,
            fillColor: this.config.icon.fillColor,
            color: this.markers[code].data.theme_color
          });
      },

      removeHighlight: function(){
        for (let marker in this.markers){
          this.markers[marker].setStyle({
            ...this.config.icon,
            ...{color: this.markers[marker].data.theme_color}
          });
        }
      }

    }

  }
</script>
