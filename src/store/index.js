import Vue from 'vue';
import Vuex from 'vuex';
import http from '@/util/http-common';
// import PersistedState from 'vuex-persistedstate';
// import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    boards: [],
    board: Object,
    comments: [],
    apts: [],
    apt: Object,
    location: {
      lat: '',
      lon: '',
    },
    weather: Object,
    file: Object,
  },
  mutations: {
    GET_BOARD_LIST(state, boards) {
      // console.log(boards);
      state.boards = boards;
    },
    GET_BOARD(state, board) {
      state.board = board;
    },
    GET_APT_LIST(state, apts) {
      // console.log(apts);
      state.apts = apts;
    },
    SELECT_APT(state, apt) {
      state.apt = apt;
      state.location.lat = apt.lat;
      state.location.lon = apt.lng;
      // state.lat = apt.lat;
      // state.lon = apt.lng;
    },
    GET_WEATHER(state, result) {
      console.log(result);
      state.weather = result;
    },
    GET_FILE(state, file) {
      console.log(file);
      state.file = file;
    },
    GET_COMMENTS(state, comments) {
      state.comments = comments;
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
    getWeather({ commit }, query) {
      const url_base = 'https://api.openweathermap.org/data/2.5/';
      let fetchUrl =
        url_base +
        'weather?q=' +
        query +
        `&units=metric&lang=kr&APPID=${process.env.VUE_APP_OPENWEAHTER_API_KEY}`;

      fetch(fetchUrl)
        .then((res) => {
          return res.json();
        })
        .then((results) => {
          commit('GET_WEATHER', results);
        });
    },
    getAptList({ commit }, search) {
      http
        .post('/tempview/list', {
          key: search.key,
          word: search.word,
        })
        .then(({ data }) => {
          commit('GET_APT_LIST', data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    selectApt({ commit }, apt) {
      commit('SELECT_APT', apt);
    },
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
    getFile({ commit }, bnum) {
      http
        .get('/board/download/' + bnum)
        .then((resp) => {
          commit('GET_FILE', resp.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    getComments({ commit }, bnum) {
      http
        .get('/comment/' + bnum)
        .then(({ data }) => {
          console.log(data);
          commit('GET_COMMENTS', data);
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
    // alertCode(state) {
    //   return state.code;
    // },
  },
  // plugins: [PersistedState()],
});
