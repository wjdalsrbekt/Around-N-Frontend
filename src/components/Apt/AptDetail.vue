<template>
  <div>
    {{ apt }} <br />
    {{ location }} <br />
    <div v-if="typeof weather.main != 'undefined'">
      <div>
        <div>{{ weather.name }}</div>
        <div v-if="weather.sys.country === 'KR'">대한민국</div>
        <div>{{ dateBuilder() }}</div>
      </div>
      <div>
        <div>{{ weather.main.temp }}℃</div>
        <div v-if="weather.weather[0].main === 'Clouds'">흐림</div>
      </div>
      <div>
        <div>경도 {{ weather.coord.lon }}</div>
        <div>위도 {{ weather.coord.lat }}</div>
      </div>
    </div>
    <hr />
    <div class="map_wrap">
      <div id="map"></div>

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
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'AptDetail',
  data() {
    return {
      map: '',
      loc: { lat: '', lon: '' },
      currCategory: '',
      ps: '',
      contentNode: '',
      placeOverlay: '',
      markers: [],
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_API_KEY}&libraries=services`;
      document.head.appendChild(script);
    }
  },
  computed: {
    ...mapState(['apt', 'location', 'weather']),
    changeInfo: function () {
      const params = {
        lat: this.$store.state.location.lat,
        lon: this.$store.state.location.lon,
      };
      return params;
    },
  },
  watch: {
    changeInfo(val) {
      this.loc.lat = val.lat;
      this.loc.lon = val.lon;

      var moveLatLon = new kakao.maps.LatLng(this.loc.lat, this.loc.lon);
      var marker = new kakao.maps.Marker({
        position: moveLatLon,
      });
      // marker.setMap(null);
      this.map.panTo(moveLatLon);
      marker.setMap(this.map);

      var info = `<div style="padding:5px;">${this.$store.state.apt.aptName}</div>
      <a href="https://map.kakao.com/link/to/${this.$store.state.apt.aptName},${this.loc.lat},${this.loc.lon}"
      style="color:blue" target="_blank">길 찾기</a>
      `;

      var infowindow = new kakao.maps.InfoWindow({
        position: moveLatLon,
        content: info,
      });

      infowindow.open(this.map, marker);
    },
  },
  methods: {
    initMap() {
      var container = document.getElementById('map');
      var options = {
        center: new kakao.maps.LatLng(37.576028, 126.97692),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, options);
      this.map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
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
    dateBuilder() {
      let d = new Date();
      let months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
      let days = ['일', '월', '화', '수', '목', '금', '토'];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day}요일 ${date}일 ${month}월 ${year}년`;
    },
  },
};
</script>

<style scoped>
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
.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
  font-size: 12px;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 50%;
}
#category {
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 5px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  z-index: 2;
}
#category li {
  float: left;
  list-style: none;
  width: 50px;
  border-right: 1px solid #acacac;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
}
#category li.on {
  background: #eee;
}
#category li:hover {
  background: #ffe6e6;
  border-left: 1px solid #acacac;
  margin-left: -1px;
}
#category li:last-child {
  margin-right: 0;
  border-right: 0;
}
#category li span {
  display: block;
  margin: 0 auto 3px;
  width: 27px;
  height: 28px;
}
#category li .category_bg {
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png)
    no-repeat;
}
#category li .bank {
  background-position: -10px 0;
}
#category li .mart {
  background-position: -10px -36px;
}
#category li .pharmacy {
  background-position: -10px -72px;
}
#category li .oil {
  background-position: -10px -108px;
}
#category li .cafe {
  background-position: -10px -144px;
}
#category li .store {
  background-position: -10px -180px;
}
#category li.on .category_bg {
  background-position-x: -46px;
}
.placeinfo_wrap {
  position: absolute;
  bottom: 28px;
  left: -150px;
  width: 300px;
}
.placeinfo {
  position: relative;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  background: #fff;
}
.placeinfo:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.placeinfo_wrap .after {
  content: '';
  position: relative;
  margin-left: -12px;
  left: 50%;
  width: 22px;
  height: 12px;
  background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png');
}
.placeinfo a,
.placeinfo a:hover,
.placeinfo a:active {
  color: #fff;
  text-decoration: none;
}
.placeinfo a,
.placeinfo span {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.placeinfo span {
  margin: 5px 5px 0 5px;
  cursor: default;
  font-size: 13px;
}
.placeinfo .title {
  font-weight: bold;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
  margin: -1px -1px 0 -1px;
  padding: 10px;
  color: #fff;
  background: #d95050;
  background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
    no-repeat right 14px center;
}
.placeinfo .tel {
  color: #0f7833;
}
.placeinfo .jibun {
  color: #999;
  font-size: 11px;
  margin-top: 0;
}
</style>
