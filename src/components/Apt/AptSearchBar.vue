<template>
  <div class="q-pa-md">
    <q-select
      outlined
      v-model="model"
      :options="options"
      option-value="id"
      option-label="desc"
      emit-value
      map-options
      style="width: 150px"
    />
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
      model: null,
      options: [
        {
          id: 'dong',
          desc: '동',
        },
        {
          id: 'aptName',
          desc: '아파트 이름',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['getAptList', 'getWeather']),
    checkValue() {
      let err = true;
      let msg = '';
      if (!this.model) {
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
        this.getAptList({ key: this.model, word: this.word });
        if (this.model === 'dong') {
          this.getWeather(this.model);
        }
        this.model = null;
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
