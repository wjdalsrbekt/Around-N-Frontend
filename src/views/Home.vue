<template>
  <div class="home q-pa-md">
    <div class="row">
      <q-parallax :src="image" :height="480" :speed="0.5">
        <h1 class="text-white logo">Around:N</h1>
        <hr style="border: 1px solid white; width: 500px" />
        <p class="text-overline" style="margin-left: 10px; color: #5b818e">N세권을 찾아드립니다.</p>
      </q-parallax>
    </div>

    <h3 class="text-bold text-blue-grey-6" style="text-shadow: 1px 1px 3px black">
      Introduce Around:N
    </h3>
    <!--Stepper start -->
    <hr />
    <div>
      <q-stepper
        v-model="step"
        flat
        vertical
        color="teal-3"
        animated
        done-color="lime-5"
        active-color="teal-3"
        inactive-color="blue-grey-6"
        active-icon="check"
      >
        <q-step
          :name="1"
          title="커뮤니티 형성"
          icon="rss_feed"
          :done="step > 1"
          done-icon="rss_feed"
        >
          Around:N 은 사용자끼리의 <strong>커뮤니티</strong>를 형성하여 소비자의 합리적인 선택을
          적극 권장합니다.
          <br />
          활발한 의견공유를 통해 나만의 <strong>SWEET HOME</strong>을 만나보세요!
          <q-stepper-navigation>
            <q-btn @click="step = 2" round outline color="amber-4" icon="keyboard_arrow_down" />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          title="기분좋게 매물 보러 가볼까요?"
          icon="favorite"
          :done="step > 2"
          done-icon="favorite"
        >
          집 보러 가는 날, 맑은 날이면 더욱 좋겠지요? <br />
          해당 동네 <strong>날씨</strong> 확인하고 기분 좋게 길 찾기 해봐요!

          <q-stepper-navigation>
            <q-btn @click="step = 3" round outline color="amber-4" icon="keyboard_arrow_down" />
            &nbsp;
            <q-btn @click="step = 1" round outline color="blue-grey-6" icon="expand_less" />
          </q-stepper-navigation>
        </q-step>

        <q-step :name="3" title="내 매물은 과연 N세권?" icon="public" done-icon="public">
          <strong>맥세권</strong>이라는 말을 아시나요? 주택 인근에 맥도날드가 가까운 경우를 뜻하는
          말이에요. <br />
          Around:N 은 사용자가 선택한 매물이 <br />
          주변의 약국, 편의점, 문화공간 등 다양한 <strong>N세권</strong>에 포함되는지 바로 확인
          가능하답니다!
          <q-stepper-navigation>
            <q-btn color="deep-orange" round outline icon="done" @click="step = 1" />
            &nbsp;
            <q-btn @click="step = 2" round outline color="blue-grey-6" icon="expand_less" />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </div>
    <hr />
    <!--Stepper end -->

    <!--Thumbnails start-->
    <q-carousel
      swipeable
      animated
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      navigation
      infinite
      :autoplay="autoplay"
    >
      <q-carousel-slide :name="1" :img-src="image1" />
      <q-carousel-slide :name="2" :img-src="image2" />
      <q-carousel-slide :name="3" :img-src="image3" />
      <q-carousel-slide :name="4" :img-src="image4" />
    </q-carousel>
    <!--Thumbnails end-->
    <q-btn color="purple" @click="showLoading" />
    <!--ajax bar -->
    <q-ajax-bar ref="bar" position="bottom" color="lime-5" size="12px" skip-hijack />
    <q-btn color="purple" label="탈퇴 스피너" @click="trigger" />
  </div>
</template>

<script>
import { QSpinnerGears, QSpinnerHourglass } from 'quasar';
// @ is an alias to /src
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      image: require('../assets/main_logo.jpg'),
      image1: require('../assets/main.jpg'),
      image2: require('../assets/map.jpg'),
      image3: require('../assets/picnic.jpg'),
      image4: require('../assets/interior.jpg'),
      step: 1,
      slide: 1,
      autoplay: 2000,
    };
  },
  methods: {
    showLoading() {
      this.$q.loading.show();

      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 2000);
    },
    trigger() {
      const bar = this.$refs.bar;

      this.$q.loading.show({
        spinner: QSpinnerHourglass,
        spinnerColor: 'lime-5',
        messageColor: 'white',
        message: '<p class="text-overline">정보를 삭제하는 중입니다...</p>',
        delay: 200,
        spinnerSize: '5em',
      });

      bar.start();

      this.timer = setTimeout(() => {
        if (this.$refs.bar) {
          this.$refs.bar.stop();
          this.$q.loading.show({
            spinner: QSpinnerGears,
            spinnerColor: 'deep-orange',
            message: '이용해주셔서 감사합니다.',
          });

          this.timer = setTimeout(() => {
            this.$q.loading.hide();
            this.timer = void 0;
          }, 1500);
        }
      }, 3000);
    },
  },
  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  },
};
</script>
<style scoped>
.logo {
  text-shadow: 4px 4px 8px #1b233a, 0px 0px 2px white, 8px 8px 10px #ec9750;
}
</style>
