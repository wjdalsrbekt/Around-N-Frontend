<template>
  <div>
    <form action="" id="searchform" method="get">
      <select name="key" id="key" v-model="Skey">
        <option value="all">전체</option>
        <option value="id">아이디</option>
        <option value="content">내용</option>
      </select>
      <q-input type="text" placeholder="검색어 입력" name="word" id="word" v-model="Sword" />
      <button @click="searchBtn">검색</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'SearchBar',
  data() {
    return {
      Skey: '',
      Sword: '',
    };
  },
  methods: {
    ...mapActions(['getBoardList']),
    searchBtn() {
      if (this.Sword) this.getBoardList({ key: this.Skey, word: this.Sword });
      this.Sword = '';
    },
  },
};
</script>

<style></style>
