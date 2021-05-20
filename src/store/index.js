import Vue from 'vue';
import Vuex from 'vuex';
import http from '@/util/http-common';
// import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    boards: [],
    board: Object,
    comments: [],
  },
  mutations: {
    GET_BOARD_LIST(state, boards) {
      console.log(boards);
      state.boards = boards;
    },
    GET_BOARD(state, board) {
      state.board = board;
    },
    // DELETE_BOARD(state, result) {
    //   if (result === 'success') {
    //     alert('삭제완료');
    //   } else {
    //     alert('에러발생');
    //   }
    // },
    // POST_BOARD(state, result) {
    //   if (result === 'success') {
    //     alert('작성완료');
    //   } else {
    //     alert('에러발생');
    //   }
    // },
  },
  actions: {
    getBoardList({ commit }, search) {
      // console.log('리스트');
      console.log('키값입니다...' + search.key);
      console.log('워드값입니다...' + search.word);

      http
        .post('/board/list', {
          key: search.key,
          word: search.word,
        })
        .then((resp) => {
          // console.log('리스트들어옴');
          // console.log(resp);
          commit('GET_BOARD_LIST', resp.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    getBoard({ commit }, bnum) {
      http
        .get('/board/' + bnum)
        .then((resp) => {
          // console.log('한 개 얻어감');
          // console.log(resp.data);
          commit('GET_BOARD', resp.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    // postBoard({ commit }, board) {
    //   http.post('/board', board).then(({ data }) => {
    //     commit('POST_BOARD', data);
    //   });
    // },
    // deleteBoard({ commit }, bnum) {
    //   // console.log(bnum);
    //   http.delete('/board/' + bnum).then(({ data }) => {
    //     commit('DELETE_BOARD', data);
    //   });
    // },
  },
  getters: {
    alertCode(state) {
      return state.code;
    },
  },
});
