<template>
  <div>
    <select name="key" id="key" v-model="key">
      <option value="dong">동</option>
      <option value="aptName">아파트 이름</option>
    </select>
    <input
      type="text"
      name="word"
      id="word"
      ref="word"
      v-model.trim="word"
      placeholder="검색어 입력."
      @keypress.enter="checkValue"
    />
    <q-btn
      icon="search"
      label="검색"
      text-color="white"
      color="blue-grey-6"
      class="text-bold"
      @click="checkValue"
    />
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'SearchBar',
  data() {
    return {
      key: '',
      word: '',
    };
  },
  methods: {
    ...mapActions(['getAptList', 'getWeather']),
    checkValue() {
      let err = true;
      let msg = '';
      if (!this.key) {
        err = false;
        msg = '동이나 아파트 이름을 선택해주세요.';
      } else if (!this.word) {
        err = false;
        msg = '검색단어를 입력하세요.';
        this.$refs.word.focus();
      }

      if (!err) alert(msg);
      else this.sendKeyword();
    },
    sendKeyword() {
      this.$q.loading.show();

      this.timer = setTimeout(() => {
        this.getAptList({ key: this.key, word: this.word });
        if (this.key === 'dong') {
          this.getWeather(this.word);
        }
        this.word = '';
        this.$q.loading.hide();
        this.timer = void 0;
      }, 1500);
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

<style></style>
