<template>
  <div class="q-pa-md" style="height: 150px">
    <div style="max-width: 500px; margin: 0 auto">
      <q-select
        outlined
        v-model="model"
        :options="options"
        option-value="id"
        option-label="desc"
        emit-value
        map-options
      />
      <q-input
        outlined
        v-model.trim="word"
        label="검색어"
        ref="word"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '필수입력 사항입니다.']"
        placeholder="검색어를 입력해주세요."
        @keypress.enter="checkValue"
      />
    </div>
    <q-space />
    <q-btn
      icon="search"
      label="검색"
      text-color="white"
      color="blue-grey-6"
      class="text-bold"
      @click="checkValue"
      style="height: 55px"
    />
    <br />
    <q-dialog v-model="alert">
      <q-card class="bg-blue-grey-9">
        <q-card-section class="text-lime-5">
          <div class="text-h6 text-bold">잠깐!</div>
        </q-card-section>
        <q-card-section class="q-pt-none text-subtitle2 text-white"> {{ msg }}</q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="teal-3" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      alert: false,
      msg: '',
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
      if (!this.model) {
        err = false;
        this.msg = '동이나 아파트 이름을 선택해주세요.';
      } else if (!this.word) {
        err = false;
        this.msg = '검색단어를 입력하세요.';
        this.$refs.word.focus();
      }

      if (!err) this.alert = true;
      else this.sendKeyword();
    },
    sendKeyword() {
      this.$q.loading.show();

      this.timer = setTimeout(() => {
        this.getAptList({ key: this.model, word: this.word });
        if (this.model === 'dong') {
          this.getWeather(this.word);
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
