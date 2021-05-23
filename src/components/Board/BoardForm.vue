<template>
  <div class="q-pa-md">
    <q-input
      outlined
      name="title"
      id="title"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || '제목은 비울 수 없습니다.']"
      v-model="title"
      ref="title"
      label="제목을 입력해주세요."
    >
      <template v-slot:append>
        <q-icon name="title" />
      </template> </q-input
    ><br />
    <q-input
      outlined
      type="number"
      name="price"
      id="price"
      v-model="price"
      ref="price"
      label="가격을 입력해주세요."
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || '문의가격을 입력해주세요.']"
    >
      <template v-slot:append>
        <q-icon name="sell" />
      </template> </q-input
    ><br />
    <label for="content">내용</label>
    <textarea
      name="content"
      id="content"
      cols="30"
      rows="10"
      ref="content"
      v-model="content"
      placeholder="내용은 비울 수 없습니다."
    ></textarea
    ><br />
    <button v-if="type === 'create'" @click="checkValue">등록</button>
    <button v-else @click="checkValue">수정</button>
    <button @click="moveList">취소</button>
  </div>
</template>

<script>
import http from '@/util/http-common';
import { mapState } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'BoardForm',
  props: {
    type: { type: String },
  },
  computed: {
    ...mapState(['board']),
  },
  data() {
    return {
      bnum: '',
      title: '',
      userid: '',
      price: '',
      content: '',
      regdate: '',
    };
  },
  methods: {
    ...mapActions(['getBoard', 'postBoard']),
    checkValue() {
      let err = true;
      let msg = '';

      if (!this.title) {
        err = false;
        msg = '제목 입력!!';
        this.$refs.title.focus();
      } else if (!this.price) {
        err = false;
        msg = '가격 입력!!';
        this.$refs.price.focus();
      } else if (!this.content) {
        err = false;
        msg = '내용 입력!!';
        this.$refs.content.focus();
      }

      if (!err) alert(msg);
      else this.type === 'create' ? this.createHandler() : this.updateHandler();
    },
    createHandler() {
      // this.postBoard({
      //   bnum: this.bnum,
      //   title: this.title,
      //   // userid: this.userid,
      //   userid: 'ssafy',
      //   price: this.price,
      //   content: this.content,
      //   regdate: this.regdate,
      // });
      // alert('등록되었습니다.');
      // this.moveList();
      http
        .post('/board', {
          bnum: this.bnum,
          title: this.title,
          // userid: this.userid,
          userid: this.$cookie.get('userid'),
          price: this.price,
          content: this.content,
          regdate: this.regdate,
        })
        .then(({ data }) => {
          let msg = '등록 처리 중 문제가 발생하였습니다.';
          if (data === 'success') {
            msg = '등록이 완료되었습니다.';
          }

          alert(msg);
          this.moveList();
        })
        .catch(() => {
          this.moveList();
        });
    },
    updateHandler() {
      if (this.$cookie.get('userid') != this.userid) {
        alert('본인만 게시글을 수정할 수 있습니다.');
      } else {
        http
          .put('/board', {
            bnum: this.bnum,
            title: this.title,
            // userid: this.userid,
            userid: this.$cookie.get('userid'),
            price: this.price,
            content: this.content,
            regdate: this.regdate,
          })
          .then(({ data }) => {
            let msg = '수정 처리 중 문제가 발생하였습니다.';
            if (data === 'success') {
              msg = '수정이 완료되었습니다.';
            }

            alert(msg);
            this.moveList();
          })
          .catch(() => {
            this.moveList();
          });
      }
    },
    moveList() {
      this.$router.push('/board');
    },
  },
  created() {
    if (this.type === 'update') {
      this.$store.dispatch('getBoard', this.$route.query.bnum);
      this.bnum = this.$store.state.board.bnum;
      this.title = this.$store.state.board.title;
      this.content = this.$store.state.board.content;
      this.price = this.$store.state.board.price;
      this.regdate = this.$store.state.board.regdate;
      this.userid = this.$store.state.board.userid;
    }
  },
};
</script>

<style></style>
