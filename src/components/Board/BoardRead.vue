<template>
  <div>
    <table>
      <tr>
        <th>게시글번호</th>
        <td>{{ board.bnum }}</td>
      </tr>
      <tr>
        <th>제목</th>
        <td>{{ board.title }}</td>
      </tr>
      <!-- <tr>
        <th>내용</th>
        <td>{{ board.content }}</td>
      </tr> -->
      <q-card flat bordered>
        <q-card-section v-html="content" />
      </q-card>
      <tr>
        <th>작성자</th>
        <td>{{ board.userid }}</td>
      </tr>
      <tr>
        <th>문의가격</th>
        <td>{{ board.price | price }}</td>
      </tr>
      <tr>
        <th>작성일</th>
        <td>{{ board.regdate }}</td>
      </tr>
    </table>
    <div>
      <a v-if="board.userid === this.loginCookie">
        <router-link :to="'/board/update?bnum=' + board.bnum">수정</router-link>
        <!-- <button @click="deleteItem">삭제</button> -->
        <q-btn
          icon="clear"
          text-color="deep-orange"
          color="amber-4"
          class="text-bold"
          @click="showLoading"
          label="삭제"
        />
        <!-- <router-link :to="'/board/delete?bnum=' + board.bnum">삭제</router-link> -->
      </a>
    </div>
    <div v-if="image">
      <img :src="image" />
    </div>

    <hr />
    <!--댓글 시작 -->
    <h3>댓글[{{ comment.length }}]</h3>
    <table>
      <tr v-for="(item, index) in comment" :key="`${index}_comment`">
        <td>{{ item.comment_content }}</td>
        <td>{{ item.user_name }}</td>
        <td>{{ item.comment_time | date }}</td>
        <!-- <button @click="modifyComment">수정</button> -->
        <button @click="deleteComment(item.comment_no, item.user_name)">삭제</button>
      </tr>
    </table>
    <div>
      <label for="comment_content">내용</label>
      <input
        type="text"
        id="comment_content"
        name="comment_content"
        v-model="comment_content"
        ref="comment_content"
        placeholder="댓글 내용을 입력하세요."
      />
      <br />
      <button @click="checkValue">작성</button>
      <br />
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import http from '@/util/http-common';
import { mapState } from 'vuex';
// import { mapActions } from 'vuex';
export default {
  name: 'BoardDetail',
  data() {
    return {
      // code: '',
      comment: '',
      comment_no: '',
      user_name: '',
      comment_content: '',
      comment_time: '',
      bnum: '',
      loginCookie: '',
      content: '',
      file: '',
      image: null,
    };
  },
  components: {},
  computed: {
    ...mapState(['board'], ['file'], ['comments']),
    // ...mapState(['board'], ['commments']),
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    date(time) {
      return moment(new Date(time)).format('MM-DD h:m a');
    },
  },
  created() {
    // console.log('들어옴');
    // console.log(this.$route.query.bnum);
    this.$store.dispatch('getBoard', this.$route.query.bnum);
    this.$store.dispatch('getFile', this.$route.query.bnum);
    // this.$store.dispatch('getComments', this.$route.query.bnum);
    http.get(`/comment/${this.$route.query.bnum}`).then(({ data }) => {
      this.comment = data;
    });
    this.bnum = this.$route.query.bnum;
    this.loginCookie = this.$cookie.get('userid');
    // this.comment = this.$store.state.comments;
    this.content = this.$store.state.board.content;
    this.file = this.$store.state.file;

    if (this.$store.state.file.saveFolder != null && this.$store.state.file.saveFile != null) {
      this.image = require('../../../../../work-spring/Final_HappyBack/src/main/webapp/upload/' +
        this.$store.state.file.saveFolder +
        '/' +
        this.$store.state.file.saveFile);
    }
  },
  methods: {
    // ...mapActions(['deleteBoard']),
    // deleteItem() {
    //   //아이디 검사
    //   this.deleteBoard(this.$route.query.bnum);
    //   this.moveList();
    // },
    // moveList() {
    //   this.$router.push('/board');
    // },
    checkValue() {
      if (this.loginCookie) {
        let err = true;
        let msg = '';

        if (!this.comment_content) {
          err = false;
          msg = '내용을 입력해주세요.';
          this.$refs.comment_content.focus();
        }
        // else if (!this.user_name) {
        //   err = false;
        //   msg = '작성자를 입력해주세요.';
        //   this.$refs.user_name.focus();
        // }

        if (!err) alert(msg);
        else this.writeComment();
      } else {
        alert('댓글을 작성하려면 로그인 해주세요.');
      }
    },
    writeComment() {
      http
        .post('/comment', {
          comment_no: this.comment_no,
          user_name: this.$cookie.get('userid'),
          comment_content: this.comment_content,
          comment_time: this.comment_time,
          bnum: this.bnum,
        })
        .then(({ data }) => {
          let msg = '댓글 작성 중 문제가 발생했습니다.';
          if (data === 'success') {
            msg = '등록이 완료되었습니다.';
          }
          alert(msg);
          this.$router.go(this.$router.currentRoute);
        })
        .catch(() => {
          this.$router.push('/board/list');
        });
    },
    deleteComment(cnum, writer) {
      if (writer != this.$cookie.get('userid')) {
        alert('본인만 삭제를 할 수 있습니다.');
      } else {
        http.delete('/comment/' + cnum).then(({ data }) => {
          let msg = '댓글 삭제 중 문제가 발생했습니다.';
          if (data === 'success') {
            msg = '삭제가 완료되었습니다.';
          }
          alert(msg);
          this.$router.go(this.$router.currentRoute);
        });
      }
    },
    showLoading() {
      this.$q.loading.show();

      this.timer = setTimeout(() => {
        this.$router.push('/board/delete?bnum=' + this.bnum);
        this.$q.loading.hide();
        this.timer = void 0;
      }, 2000);
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
