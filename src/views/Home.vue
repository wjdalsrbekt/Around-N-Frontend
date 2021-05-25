<template>
  <div class="home q-pa-md">
    <div class="row">
      <q-parallax :src="image" :height="500" :speed="0.5">
        <h1 class="text-white logo">Around:N</h1>
      </q-parallax>
    </div>
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
