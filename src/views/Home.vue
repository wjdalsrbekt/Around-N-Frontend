<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <h1>Main 화면</h1>
      <q-btn color="purple" @click="showLoading" />
      <!--ajax bar -->
      <q-ajax-bar ref="bar" position="bottom" color="lime-5" size="12px" skip-hijack />
      <q-btn color="purple" label="탈퇴 스피너" @click="trigger" />
    </div>
  </div>
</template>

<script>
import { QSpinnerGears, QSpinnerHourglass } from 'quasar';
// @ is an alias to /src
export default {
  name: 'Home',
  components: {},
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
