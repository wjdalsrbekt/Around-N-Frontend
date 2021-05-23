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
          <template v-for="(board, index) in boards">
            <board-list-item :board="board" :key="index" v-if="board.title.includes(Sword)" />
          </template>
        </tbody>
      </table>
    </div>
    <div v-else>작성된 글이 없습니다.</div>
    <!--게시글 작성 시작-->
    <q-btn icon="edit" color="blue-grey-6" label="작성" @click="movePage" />
    <q-dialog v-model="alert">
      <q-card class="bg-blue-grey-9">
        <q-card-section class="text-lime-5">
          <div class="text-h6 text-bold">경고</div>
        </q-card-section>
        <q-card-section class="q-pt-none text-subtitle2 text-white">
          로그인된 회원만 글을 작성할 수 있습니다.</q-card-section
        >
        <q-card-actions align="right">
          <q-btn flat label="OK" color="teal-3" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--게시글 작성 끝-->
    <div>
      <br />
      <input type="text" placeholder="검색어 입력" name="word" id="word" v-model="Sword" />
    </div>
  </div>
</template>

<script>
import http from '@/util/http-common';
import BoardListItem from './BoardListItem.vue';
export default {
  name: 'BoardList',
  data() {
    return {
      alert: false,
      boards: '',
      Skey: '',
      Sword: '',
      Search: '',
      loginCookie: '',
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
      // console.log(this.loginCookie);
      if (this.loginCookie) {
        this.$router.push('/board/create');
      } else {
        this.alert = true;
        // alert('로그인 한 회원만 사용가능합니다.');
      }
    },
    // ...mapActions(['getBoardList']),
    searchBtn() {
      // if (this.Sword) this.getBoardList({ key: this.Skey, word: this.Sword });
      // this.Sword = '';
      // this.Search = {
      //   key: this.Skey,
      //   word: this.Sword,
      // };

      // console.log(this.Search);
      // console.log(this.Skey);
      // console.log(this.Sword);
      http
        .post('/board/list', {
          // params: this.Search,
          key: '',
          word: '',
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
    this.searchBtn();
    // http
    //   .post('/board/list', {
    //     key: this.Skey,
    //     word: this.Sword,
    //   })
    //   .then((resp) => {
    //     // console.log('리스트들어옴');
    //     // console.log(resp);
    //     // commit('GET_BOARD_LIST', resp.data);
    //     this.boards = resp.data;
    //   })
    //   .catch((error) => {
    //     console.dir(error);
    //   });
    // this.$store.dispatch('getBoardList', { key: '', word: '' });
  },
  created() {
    this.loginCookie = this.$cookie.get('userid');
  },
};
</script>

<style></style>
