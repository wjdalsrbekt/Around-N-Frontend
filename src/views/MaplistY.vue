<template>
  <div id="app">
    <div id="map"></div>
    <button @click="panTo()">부드럽게 이동하기!</button>
  </div>
</template>

<script>
export default {
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_API_KEY}`;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      var container = document.getElementById('map');
      var options = {
        center: new kakao.maps.LatLng(37.576028, 126.97692),
        level: 3,
      };

      var map = new kakao.maps.Map(container, options);
      map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
    },
    panTo() {
      //   var moveLatLon = new kakao.mpas.LatLng(37.575999, 126.97);
      //   map.panTo(moveLatLon);
    },
  },
};
</script>

<style>
#map {
  width: 1200px;
  height: 1200px;
  margin: 0 auto;
}
</style>
