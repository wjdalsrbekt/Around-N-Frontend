<template>
  <div class="map_wrap">
    <div id="map"></div>
    <button @click="panTo">이동</button>
    <div class="custom_zoomcontrol radius_border">
      <span @click="zoomIn"
        ><img
          src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
          alt="확대"
      /></span>
      <span @click="zoomOut"
        ><img
          src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
          alt="축소"
      /></span>
    </div>
    <p>
      <input type="checkbox" id="chkTraffic" @click="setOverlayMapTypeId" />교통정보 보기
      <input type="checkbox" id="chkBicycle" @click="setOverlayMapTypeId" />자전거도로 정보 보기
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      map: '',
    };
  },
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

      this.map = new kakao.maps.Map(container, options);
      this.map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
    },
    panTo() {
      var moveLatLon = new kakao.maps.LatLng(37.575999, 126.97);
      this.map.panTo(moveLatLon);
    },
    zoomIn() {
      var level = this.map.getLevel();
      this.map.setLevel(level - 1);
    },
    zoomOut() {
      var level = this.map.getLevel();
      this.map.setLevel(level + 1);
    },
    setOverlayMapTypeId() {
      var chkTraffic = document.getElementById('chkTraffic'),
        chkBicycle = document.getElementById('chkBicycle');
      if (chkTraffic.checked) {
        this.map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
      } else {
        this.map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
      }

      if (chkBicycle.checked) {
        this.map.addOverlayMapTypeId(kakao.maps.MapTypeId.BICYCLE);
      } else {
        this.map.removeOverlayMapTypeId(kakao.maps.MapTypeId.BICYCLE);
      }
    },
  },
};
</script>

<style>
.map_wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 50%;
}
#map {
  width: 1200px;
  height: 1200px;
  margin: 0 auto;
}
.custom_zoomcontrol {
  position: absolute;
  top: 50px;
  right: 10px;
  width: 36px;
  height: 80px;
  overflow: hidden;
  z-index: 1;
  background-color: #f5f5f5;
}
.custom_zoomcontrol span {
  display: block;
  width: 36px;
  height: 40px;
  text-align: center;
  cursor: pointer;
}
.custom_zoomcontrol span img {
  width: 15px;
  height: 15px;
  padding: 12px 0;
  border: none;
}
.custom_zoomcontrol span:first-child {
  border-bottom: 1px solid #bfbfbf;
}
</style>
