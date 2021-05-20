<template>
  <div>
    <div v-if="boards.length">
      <table>
        <colgroup>
          <col :style="{ width: '5%' }" />
          <col :style="{ width: '50%' }" />
          <col :style="{ width: '10%' }" />
          <col :style="{ width: '25%' }" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          <board-list-item v-for="(board, index) in boards" :key="index" :board="board" />
          <!-- :bnum="board.bnum"
            :title="board.title"
            :userid="board.userid"
            :regdate="board.regdate" -->
        </tbody>
      </table>
    </div>
    <div v-else>작성된 글이 없습니다.</div>
    <button @click="movePage">작성</button>
    <div>
      <form action="" id="searchform" method="get">
        <select name="key" id="key" v-model="Skey">
          <option value="all">전체</option>
          <option value="id">아이디</option>
          <option value="content">내용</option>
        </select>
        <input type="text" placeholder="검색어 입력" name="word" id="word" v-model="Sword" />
        <button @click="searchBtn">검색</button>
      </form>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
// import { mapActions } from 'vuex';
import http from '@/util/http-common';
import BoardListItem from './BoardListItem.vue';
export default {
  name: 'BoardList',
  data() {
    return {
      boards: '',
      Skey: '',
      Sword: '',
    };
  },
  components: {
    BoardListItem,
  },
  computed: {
    // ...mapState(['boards']),
  },
  methods: {
    movePage() {
      this.$router.push('/board/create');
    },
    // ...mapActions(['getBoardList']),
    searchBtn() {
      // if (this.Sword) this.getBoardList({ key: this.Skey, word: this.Sword });
      // this.Sword = '';
      console.log(this.Skey);
      console.log(this.Sword);
      http
        .post('/board/list', {
          key: this.Skey,
          word: this.Sword,
        })
        .then((resp) => {
          // console.log('리스트들어옴');
          // console.log(resp);
          // commit('GET_BOARD_LIST', resp.data);
          console.log(resp.data);
          this.boards = resp.data;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
  },
  mounted: function () {
    http
      .post('/board/list', {
        key: this.Skey,
        word: this.Sword,
      })
      .then((resp) => {
        // console.log('리스트들어옴');
        // console.log(resp);
        // commit('GET_BOARD_LIST', resp.data);
        this.boards = resp.data;
      })
      .catch((error) => {
        console.dir(error);
      });
    // this.$store.dispatch('getBoardList', { key: '', word: '' });
  },
};
</script>

<style></style>
