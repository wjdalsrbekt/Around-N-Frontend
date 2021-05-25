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
      <tr>
        <th colspan="2">
      <!--<q-card flat bordered>
        <q-card-section v-html="content" />
      </q-card>-->
      <div class="center" v-html="content"></div>
        </th>
      </tr>
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
      <br/>
      <a v-if="board.userid === this.loginCookie">
        <q-btn
          icon="mode_edit"
          label="수정"
          text-color="deep green-5"
          color="lime-5"
          class="text-bold"
          style="height: 55px"
        >
        <router-link :to="'/board/update?bnum=' + board.bnum"></router-link>
        </q-btn>
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
              <q-btn dense round flat color="grey" @click="deleteComment(props.row.comment_no, props.row.user_name)" icon="delete"></q-btn>
            </q-td>          
          </template>

      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>
            저런! 비어있네요 .. {{ message }}

          </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
    </q-table>
    <br/>
    <div class="row">
      <div class="col-6">
     <q-input 
        type="text"
        id="comment_content"
        name="comment_content"
        v-model="comment_content"
        ref="comment_content"
        placeholder="댓글 내용을 입력하세요."
      />
      </div>
      <div class="col-6">
      <q-btn size="30px" dense color="teal-3" label="댓글 작성" @click="checkValue" no-caps></q-btn>
      </div>
  </div>
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
     columns: [
        {
          name: 'comment_no',
          required: true,
          label: '댓글번호',
          align: 'left',
          field:'comment_no',
          sortable: true
        },
        {
          name: 'user_name',
          required: true,
          label: '작성한 ID',
          align: 'left',
          field:'user_name',
          sortable: true
        },
        {
          name: 'comment_content',
          required: true,
          label: '댓글내용',
          align: 'left',
          field:'comment_content',
          sortable: true
        },
        {
          name: 'comment_time',
          required: true,
          label: '댓글시간',
          align: 'left',
          field:'comment_time',
          sortable: true
        },
        {
          name:'actions',
          label:'Actions',
          field:'',
          align:'center'
        }
     ]
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
        console.log( this.$cookie.get('userid'));
        console.log(writer);
        console.log(cnum);
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
