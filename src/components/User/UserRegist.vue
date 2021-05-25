<template>
  <div class="q-pa-md">
    <div style="max-width: 1000px; margin: 0 auto">
      <q-card>
        <br />
        <p class="text-h4 text-bold">회원가입</p>

        <q-card-section>
          <label flat class="text-h5" for="userid">아이디</label>
          <div class="row justify-end">
            <q-btn
              icon="search"
              outline
              color="blue-grey-6"
              text-color="blue-grey-6"
              size="lg"
              class="q-mt-md"
              @click="checkId"
              >검사
            </q-btn>
          </div>

          <q-input
            type="text"
            id="userid"
            v-model="userid"
            ref="userid"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '아이디는 필수입력 사항입니다.']"
            label="아이디를 입력해주세요."
            hint="아이디입력하시고 검사하세요."
          ></q-input>
          <br />
          <label class="text-h5" for="username">이름</label>
          <q-input
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '이름은 필수입력 사항입니다.']"
            label="이름을 입력해주세요."
            hint="사용자 본인이름을 입력해주세요."
            type="text"
            v-model="username"
            id="username"
            ref="username"
          /><br />
          <label class="text-h5" for="userpwd">비밀번호</label>
          <q-input
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '비밀번호는  필수입력 사항입니다.']"
            label="비밀번호를 입력해주세요."
            hint="운영자는 사용자에게 비밀번호를 묻지 않습니다."
            type="password"
            v-model="userpwd"
            id="userpwd"
            ref="userpwd"
          /><br />
          <label class="text-h5" for="address">주소</label>
          <q-input
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '주소는 필수입력 사항입니다.']"
            label="주소를 입력해주세요."
            hint="사용자 본인 주소를 입력해주세요."
            type="text"
            v-model="address"
            id="address"
            ref="address"
          /><br />
          <q-card-section>
            <label class="text-h5" for="emailid">이메일</label>
          </q-card-section>

          <div class="row">
            <div class="col-6">
              <q-input
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || '이메일도 필수입력 사항입니다.']"
                label="이메일을 입력해주세요."
                hint="사용자 본인 이메일을 입력해주세요."
                type="text"
                id="emailid"
                v-model="emailid"
                ref="emailid"
              />

              <!--<a class="text-h5">@</a>-->
            </div>

            <div class="col-6" style="height: 150px">
              <q-select
                outlined
                id="emaildomain"
                v-model="emaildomain"
                :options="options"
                option-value="id"
                option-label="desc"
                emit-value
                map-options
              >
              </q-select>
            </div>
          </div>

          <br />
          <q-btn text-color="white" color="blue-grey-6" class="text-bold" @click="checkValue"
            >회원가입</q-btn
          >
          <br />
        </q-card-section>
      </q-card>
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
      <q-dialog v-model="alert2">
        <q-card class="bg-blue-grey-9">
          <q-card-section class="text-lime-5">
            <div class="text-h6 text-bold">알림</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-subtitle2 text-white">
            {{ msg }}
          </q-card-section>
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
export default {
  name: 'UserRegist',
  data() {
    return {
      userid: '',
      userpwd: '',
      emailid: '',
      emaildomain: '',
      address: '',
      joindate: '',
      username: '',
      ok: 'no',
      alert: false,
      alert2: false,
      msg: '',
      options: [
        {
          id: 'kakao.com',
          desc: '@kakao.com',
        },
        {
          id: 'naver.com',
          desc: '@naver.com',
        },
        {
          id: 'google.com',
          desc: '@google.com',
        },
        {
          id: 'daum.net',
          desc: '@daum.net',
        },
      ],
    };
  },
  watch: {
    userid: function () {
      this.ok = 'no';
    },
  },
  methods: {
    checkValue() {
      let err = true;
      this.msg = '';
      if (!this.userid) {
        err = false;
        this.msg = '아이디는 필수입력사항입니다.';
        this.$refs.userid.focus();
      } else if (!this.username) {
        err = false;
        this.msg = '이름은 비울 수 없습니다.';
        this.$refs.username.focus();
      } else if (!this.userpwd) {
        err = false;
        this.msg = '비밀번호를 입력해주세요.';
        this.$refs.userpwd.focus();
      } else if (!this.address) {
        err = false;
        this.msg = '주소를 입력해주세요.';
        this.$refs.address.focus();
      } else if (!this.emailid) {
        err = false;
        this.msg = '이메일은 비울 수 없습니다.';
        this.$refs.emailid.focus();
      } else if (this.ok === 'no') {
        err = false;
        this.msg = '아이디 검사를 먼저 해주세요.';
      }

      if (!err) this.alert = true;
      else this.joinUser();
    },
    joinUser() {
      http
        .post('/user/join', {
          userid: this.userid,
          username: this.username,
          userpwd: this.userpwd,
          email: this.emailid + '@' + this.emaildomain,
          address: this.address,
          joindate: this.joindate,
        })
        .then(({ data }) => {
          this.msg = '가입 과정 중 문제가 발생하였습니다.';
          if (data === 'success') {
            this.msg = '가입이 완료되었습니다!';
          }
        });
      this.alert2 = true;
    },
    checkId() {
      http.get('/user/find/' + this.userid).then(({ data }) => {
        this.msg = '이미 사용중인 아이디입니다.';
        if (data === 'success') {
          this.msg = '해당 아이디는 사용가능합니다.';
          this.ok = 'ok';
        }

        this.alert = true;
      });
    },
    moveList() {
      this.alert2 = false;
      this.$router.push('/user/login');
    },
  },
};
</script>

<style></style>
