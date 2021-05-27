<template>
  <div class="q-pa-md">
    <q-markup-table flat bordered>
      <thead class="bg-teal">
        <tr>
          <th colspan="2">
            <div class="text-h3 q-ml-md text-white">글 상세보기</div>
          </th>
        </tr>
      </thead>
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
      <tr>
        <th colspan="2">
          <div class="center" v-if="image"><img :src="image" width="850" /></div>
        </th>
      </tr>
      <br />
      <br />
      <br />
      <tr>
        <th colspan="2">
          <!--<q-card flat bordered>
        <q-card-section v-html="content" />
      </q-card>-->

          <div class="center" v-html="board.content"></div>
        </th>
      </tr>
      <br />
      <br />
      <br />
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
    </q-markup-table>
    <div>
      <br />
      <a v-if="board.userid === this.loginCookie">
        <router-link :to="'/board/update?bnum=' + board.bnum">
          <q-btn
            icon="mode_edit"
            label="수정"
            text-color="deep green-3"
            color="lime-5"
            class="text-bold"
            style="height: 55px"
          >
          </q-btn>
        </router-link>
        &nbsp;
        <!-- <button @click="deleteItem">삭제</button> -->
        <q-btn
          icon="clear"
          text-color="deep-orange"
          color="amber-4"
          class="text-bold"
          style="height: 55px"
          @click="showLoading"
          label="삭제"
        />
        <!-- <router-link :to="'/board/delete?bnum=' + board.bnum">삭제</router-link> -->
      </a>
    </div>

    <!--댓글 시작 -->
    <!--<h3>댓글[{{ comment.length }}]</h3>
    <table>
      <tr v-for="(item, index) in comment" :key="`${index}_comment`">
        <td>{{ item.comment_content }}</td>
        <td>{{ item.user_name }}</td>
        <td>{{ item.comment_time | date }}</td>
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
    </div>-->

    <div class="q-pa-md">
      <q-table
        title="댓글"
        :data="comment"
        :columns="columns"
        :filter="filter"
        no-data-label="아무것도 적혀있지 않습니다."
        no-results-label="해당 댓글 내용이 없습니다."
        row-key="name"
        dense
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <q-icon slot="append" name="search" />
          </q-input>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              color="grey"
              @click="deleteComment(props.row.comment_no, props.row.user_name)"
              icon="delete"
            ></q-btn>
          </q-td>
        </template>

        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span> 저런! 비어있네요 .. {{ message }} </span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template>
      </q-table>
      <br />
      <div class="q-mt-md">
        <q-input
          type="text"
          id="comment_content"
          name="comment_content"
          v-model="comment_content"
          ref="comment_content"
          placeholder="댓글 내용을 입력하세요."
        />

        <br />
        <q-btn
          style="height: 55px; width: 150px"
          dense
          color="teal-3"
          icon="mode_edit"
          label="작성"
          @click="checkValue"
          no-caps
        ></q-btn>
      </div>
    </div>

    <div class="q-pa-md">
      <q-dialog v-model="alert">
        <q-card class="bg-blue-grey-9">
          <q-card-section class="text-lime-5">
            <div class="text-h6 text-bold">알림</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-subtitle2 text-white"> {{ msg }}</q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="teal-3" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div class="q-pa-md">
      <q-dialog v-model="alert2">
        <q-card class="bg-blue-grey-9">
          <q-card-section class="text-lime-5">
            <div class="text-h6 text-bold">알림</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-subtitle2 text-white"> {{ msg }}</q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="teal-3" @click="moveList" />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
      filter: '',
      // code: '',
      comment: [],
      comment_no: '',
      user_name: '',
      comment_content: '',
      comment_time: '',
      bnum: '',
      loginCookie: '',
      content: '',
      file: null,
      image: null,
      alert: false,
      alert2: false,
      msg: '',
      columns: [
        {
          name: 'comment_no',
          required: true,
          label: '댓글번호',
          align: 'left',
          field: 'comment_no',
          sortable: true,
        },
        {
          name: 'user_name',
          required: true,
          label: '작성한 ID',
          align: 'left',
          field: 'user_name',
          sortable: true,
        },
        {
          name: 'comment_content',
          required: true,
          label: '댓글내용',
          align: 'left',
          field: 'comment_content',
          sortable: true,
        },
        {
          name: 'comment_time',
          required: true,
          label: '댓글시간',
          align: 'left',
          field: 'comment_time',
          sortable: true,
        },
        {
          name: 'actions',
          label: 'Actions',
          field: '',
          align: 'center',
        },
      ],
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
    // this.$store.dispatch('getFile', this.$route.query.bnum);
    // this.$store.dispatch('getComments', this.$route.query.bnum);
    http.get(`/comment/${this.$route.query.bnum}`).then(({ data }) => {
      this.comment = data;
    });
    this.bnum = this.$route.query.bnum;
    this.loginCookie = this.$cookie.get('userid');
    // this.comment = this.$store.state.comments;
    this.content = this.$store.state.board.content;
    http.get('/board/download/' + this.$route.query.bnum).then(({ data }) => {
      // console.log('파일');
      // console.log(data);
      if (data != '') {
        this.image = require('../../../../../work-spring/Final_HappyBack/src/main/webapp/upload/' +
          data.saveFolder +
          '/' +
          data.saveFile);
      }
      this.file = data;
    });
    // console.log(this.file);
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
        this.msg = '';

        if (!this.comment_content) {
          err = false;
          this.msg = '내용을 입력해주세요.';
          this.$refs.comment_content.focus();
        }
        // else if (!this.user_name) {
        //   err = false;
        //   msg = '작성자를 입력해주세요.';
        //   this.$refs.user_name.focus();
        // }

        if (!err) this.alert = true;
        else this.writeComment();
      } else {
        this.msg = '댓글을 작성하려면 로그인 해주세요.';
        this.alert = true;
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
          this.msg = '댓글 작성 중 문제가 발생했습니다.';
          if (data === 'success') {
            this.msg = '등록이 완료되었습니다.';
          }

          this.alert2 = true;
          // alert(msg);
          // this.$router.go(this.$router.currentRoute);
        })
        .catch(() => {
          this.$router.push('/board/list');
        });
    },
    deleteComment(cnum, writer) {
      if (writer != this.$cookie.get('userid')) {
        console.log(this.$cookie.get('userid'));
        console.log(writer);
        console.log(cnum);
        this.msg = '본인만 삭제를 할 수 있습니다.';
        this.alert = true;
      } else {
        http.delete('/comment/' + cnum).then(({ data }) => {
          this.msg = '댓글 삭제 중 문제가 발생했습니다.';
          if (data === 'success') {
            this.msg = '삭제가 완료되었습니다.';
          }
          this.alert2 = true;
          //this.$router.go(this.$router.currentRoute);
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
    moveList() {
      this.$router.go(this.$router.currentRoute);
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

<style>
a {
  text-decoration: none;
}
</style>
