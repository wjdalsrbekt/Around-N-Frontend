<template>
  <div class="q-pa-md">
    <p class="text-h5">게시글 작성</p>
    <hr />
    <q-input
      outlined
      name="title"
      color="teal-3"
      id="title"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || '제목은 비울 수 없습니다.']"
      v-model="title"
      ref="title"
      label="제목을 입력해주세요."
    >
      <template v-slot:append>
        <q-icon name="title" />
      </template>
    </q-input>
    <br />
    <q-input
      outlined
      type="number"
      name="price"
      color="teal-3"
      id="price"
      v-model="price"
      ref="price"
      label="가격을 입력해주세요."
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || '문의가격을 입력해주세요.']"
    >
      <template v-slot:append>
        <q-icon name="sell" />
      </template>
    </q-input>
    <br />
    <!-- <label for="content">내용</label>
    <textarea
      name="content"
      id="content"
      cols="30"
      rows="10"
      ref="content"
      v-model="content"
      placeholder="내용은 비울 수 없습니다."
    ></textarea
    > -->
    <q-file
      color="teal-3"
      v-model="upfile"
      label="추가사진 (.jpg , .png, .gif)(5MB)"
      outlined
      accept=".jpg,.png,.gif"
      max-file-size="5120000"
    >
      <template v-slot:append>
        <q-icon name="image" />
      </template>
    </q-file>

    <br />

    <q-editor
      v-model="content"
      :definitions="{
        /*
          insert_img: {
          tip: '사진 첨부',
          icon: 'photo',
          handler: this.insertImg,
        },
          */
      }"
      :toolbar="[
        ['left', 'center', 'right', 'justify'],
        ['bold', 'italic', 'underline', 'strike'],
        ['undo', 'redo'],
        //['insert_img'],
      ]"
    />
    <br />
    <q-btn
      icon="mode_edit"
      label="등록"
      v-if="type === 'create'"
      text-color="deep-green-3"
      color="lime-5"
      class="text-bold"
      style="height: 55px"
      @click="checkValue"
    />
    <q-btn
      v-else
      @click="checkValue"
      icon="mode_edit"
      text-color="deep-green-3"
      color="lime-5"
      class="text-bold"
      style="height: 55px"
      label="수정"
    />
    <q-btn
      @click="moveList"
      icon="clear"
      text-color="deep-orange"
      color="amber-4"
      class="text-bold"
      style="height: 55px"
      label="취소"
    />

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
            <div class="text-h6 text-bold">경고</div>
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
      upfile: null,
      alert: false,
      msg: '',
      alert2: false,
    };
  },
  methods: {
    ...mapActions(['getBoard', 'postBoard']),
    checkValue() {
      let err = true;
      this.msg = '';

      if (!this.title) {
        err = false;
        this.msg = '제목 입력!!';
        this.$refs.title.focus();
      } else if (!this.price) {
        err = false;
        this.msg = '가격 입력!!';
        this.$refs.price.focus();
      } else if (!this.content) {
        err = false;
        this.msg = '내용 입력!!';
        // this.$refs.content.focus();
      }

      if (!err) this.alert = true;
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
      console.log(this.upfile);

      const formData = new FormData();
      // formData.append('bnum', this.bnum);
      formData.append('title', this.title);
      formData.append('userid', this.$cookie.get('userid'));
      formData.append('price', this.price);
      formData.append('content', this.content);
      formData.append('regdate', new Date());
      formData.append('upfile', this.upfile);

      console.log('흠...');
      console.log(formData);

      for (let key of formData.values()) {
        console.log(`${key}`);
      }

      http
        .post(
          '/board',
          // {
          //   bnum: this.bnum,
          //   title: this.title,
          //   // userid: this.userid,
          //   userid: this.$cookie.get('userid'),
          //   price: this.price,
          //   content: this.content,
          //   regdate: this.regdate,
          //   upfile: this.upfile,
          // },
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data; charset=utf-8;',
            },
          }
        )
        .then(({ data }) => {
          this.msg = '등록 처리 중 문제가 발생하였습니다.';
          if (data === 'success') {
            this.msg = '등록이 완료되었습니다.';
          }

          this.alert2 = true;
        })
        .catch(() => {
          this.moveList();
        });
    },
    updateHandler() {
      if (this.$cookie.get('userid') != this.userid) {
        this.msg = '본인만 게시글을 수정할 수 있습니다.';
        this.alert = true;
      } else {
        /*http
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
          });*/
        const formData = new FormData();
        formData.append('bnum', this.$route.query.bnum);
        formData.append('title', this.title);
        formData.append('userid', this.$cookie.get('userid'));
        formData.append('price', this.price);
        formData.append('content', this.content);
        formData.append('regdate', new Date());
        formData.append('upfile', this.upfile);
        http
          .put(
            '/board',
            // {
            //   bnum: this.bnum,
            //   title: this.title,
            //   // userid: this.userid,
            //   userid: this.$cookie.get('userid'),
            //   price: this.price,
            //   content: this.content,
            //   regdate: this.regdate,
            //   upfile: this.upfile,
            // },
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data; charset=utf-8;',
              },
            }
          )
          .then(({ data }) => {
            this.msg = '수정 처리 중 문제가 발생하였습니다.';
            if (data === 'success') {
              this.msg = '수정이 완료되었습니다.';
            }

            this.alert2 = true;
          })
          .catch(() => {
            this.moveList();
          });
      }
    },
    moveList() {
      this.$router.push('/board');
    },
    // insertImg() {
    //   const input = document.createElement('input');
    //   input.type = 'file';
    //   input.accept = '.png,.jpg';

    //   let file = (input.onchange = () => {
    //     const files = Array.from(input.files);
    //     file = files[0];

    //     const reader = new FileReader();
    //     let dataUrl = '';
    //     reader.onloadend = () => {
    //       dataUrl = reader.result;
    //       this.content += '<div><img style="max-width: 50px;" src="' + dataUrl + '" /></div>';
    //     };
    //     reader.readAsDataURL(file);
    //     console.log(this.content);
    //   });
    //   input.click();
    // },
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
