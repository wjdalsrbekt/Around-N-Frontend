<template>
  <div class="q-pa-md">
    <div v-if="typeof weather.main != 'undefined'">
      <q-icon name="light_mode" color="amber-4" style="font-size: 2em" />
      <div>
        <q-chip class="text-overline">{{ weather.name }}</q-chip>
        <div class="text-overline" v-if="weather.sys.country === 'KR'">대한민국</div>
        <div class="text-overline">{{ dateBuilder() }}</div>
      </div>
      <div>
        <q-chip
          icon-right="thermostat"
          color="deep-orange"
          text-color="white"
          class="glossy text-overline text-bold"
          >{{ weather.main.temp }}℃</q-chip
        >
        <q-chip icon-right="mood" color="amber-4" class="glossy text-overline text-bold">{{
          weather.weather[0].main
        }}</q-chip>
      </div>
    </div>
    <br />
    <div class="map_wrap">
      <div id="map"></div>
      <br />
      <p>
        <q-btn round icon="zoom_in" text-color="blue-grey-9" color="lime-5" @click="zoomIn" />
        &nbsp;
        <q-btn round icon="zoom_out" text-color="lime-5" color="blue-grey-9" @click="zoomOut" />
      </p>
      <br />
      <p>
        <label class="text-caption">
          <q-toggle v-model="value1" color="amber-4" keep-color @input="setOverlayMapTypeId" />
          교통정보
        </label>
        &nbsp;
        <label class="text-caption">
          <q-toggle v-model="value2" color="teal-3" keep-color @input="setOverlayMapTypeId" />
          자전거도로
        </label>
      </p>
      <div>
        <ul id="category">
          <li id="BK9" data-order="0" @click="select">
            <span class="category_bg bank"></span>
            은행
          </li>
          <li id="MT1" data-order="1" @click="select">
            <span class="category_bg mart"></span>
            마트
          </li>
          <li id="PM9" data-order="2" @click="select">
            <span class="category_bg pharmacy"></span>
            약국
          </li>
          <li id="OL7" data-order="3" @click="select">
            <span class="category_bg oil"></span>
            주유소
          </li>
          <li id="CE7" data-order="4" @click="select">
            <span class="category_bg cafe"></span>
            카페
          </li>
          <li id="CS2" data-order="5" @click="select">
            <span class="category_bg store"></span>
            편의점
          </li>
          <!-- 신규-->
          <li id="FD6" data-order="6" @click="select">
            <span class="category_bg food"></span>
            음식점
          </li>
          <li id="SW8" data-order="7" @click="select">
            <span class="category_bg train"></span>
            지하철역
          </li>
          <li id="CT1" data-order="8" @click="select">
            <span class="category_bg culture"></span>
            문화시설
          </li>
        </ul>
      </div>
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
      id: '',
      contentNode: '',
      placeOverlay: '',
      markers: [],
      className: '',
      dataOrder: '',
      value1: false,
      value2: false,
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

      this.placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
      this.contentNode = document.createElement('div');

      this.ps = new kakao.maps.services.Places(this.map);
      kakao.maps.event.addListener(this.map, 'idle', this.searchPlaces);
      this.contentNode.className = 'placeinfo_wrap';

      this.addEventHandle(this.contentNode, 'mousedown', kakao.maps.event.preventMap);
      this.addEventHandle(this.contentNode, 'touchstart', kakao.maps.event.preventMap);

      this.placeOverlay.setContent(this.contentNode);

      this.addCategoryClickEvent();
    },
    addCategoryClickEvent() {
      var category = document.getElementById('category'),
        children = category.children;

      for (var i = 0; i < children.length; i++) {
        children[i].onclick = this.onClickCategory;
        //console.log(children[i]);
      }
    },
    select(event) {
      //console.log(event.currentTarget);
      this.id = event.currentTarget.id;
      this.dataOrder = event.currentTarget.dataset.order;
      //this.className = event.currentTarget.className;
      console.log(this.id);
      console.log(this.dataOrder);
    },
    onClickCategory() {
      console.log(this.id);
      console.log(this.className);

      this.placeOverlay.setMap(null);

      this.currCategory = this.id;
      this.searchPlaces();
    },
    searchPlaces() {
      if (!this.currCategory) {
        return;
      }

      this.placeOverlay.setMap(null);

      this.removeMarker();

      this.ps.categorySearch(this.currCategory, this.placesSearchCB, {
        useMapBounds: true,
      });
      //console.log(this.ps);
    },
    placesSearchCB(data, status, pagination) {
      console.log(pagination);
      if (status === kakao.maps.services.Status.OK) {
        this.displayPlaces(data);
      }
    },
    displayPlaces(places) {
      for (var i = 0; i < places.length; i++) {
        var marker = this.addMarker(
          new kakao.maps.LatLng(places[i].y, places[i].x),
          this.dataOrder
        );

        (function (marker, place) {
          kakao.maps.event.addListener(marker, 'click', function () {
            this.displayPlaceInfo(place);
          });
        })(marker, places[i]);
      }
    },
    addMarker(position, order) {
      var imageSrc =
          'https://lab.ssafy.com/at8in/finalhappyvue/uploads/1967ac4257aa15885815b81f43ef7f4d/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(72, 316), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },
    displayPlaceInfo(place) {
      var content =
        '<div class="placeinfo">' +
        '   <a class="title" href="' +
        place.place_url +
        '" target="_blank" title="' +
        place.place_name +
        '">' +
        place.place_name +
        '</a>';

      if (place.road_address_name) {
        content +=
          '    <span title="' +
          place.road_address_name +
          '">' +
          place.road_address_name +
          '</span>' +
          '  <span class="jibun" title="' +
          place.address_name +
          '">(지번 : ' +
          place.address_name +
          ')</span>';
      } else {
        content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
      }

      content +=
        '    <span class="tel">' + place.phone + '</span>' + '</div>' + '<div class="after"></div>';

      this.contentNode.innerHTML = content;
      this.placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
      this.placeOverlay.setMap(this.map);
    },
    removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
    addEventHandle(target, type, callback) {
      if (target.addEventListener) {
        target.addEventListener(type, callback);
      } else {
        target.attachEvent('on' + type, callback);
      }
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
      if (this.value1) {
        this.map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
      } else {
        this.map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
      }

      if (this.value2) {
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
  width: 800px;
  height: 500px;
  margin: 0 auto;
  border-radius: 10px;
}
/*
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
*/
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
  left: 350px;
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
  background: #f4f5cd;
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
  background: url(../../assets/places_category.png) no-repeat;
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
#category li .food {
  background-position: -10px -216px;
}
#category li .train {
  background-position: -10px -252px;
}
#category li .culture {
  background-position: -10px -288px;
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
