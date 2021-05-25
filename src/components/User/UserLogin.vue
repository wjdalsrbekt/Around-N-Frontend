<template>
  <div class="q-pa-md">
    <div style="max-width: 500px; margin: 0 auto">
      <q-card>
        <br />
        <p class="text-h5" for="userid">아이디</p>
        <q-card-section>
          <q-input
            ref="userid"
            type="text"
            v-model="userid"
            name="userid"
            id="userid"
            placeholder="아이디 입력"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '필수입력 사항입니다.']"
            label="아이디를 입력해주세요."
          />
          <br />
        </q-card-section>
        <p class="text-h5" for="userpwd">비밀번호</p>
        <q-card-section>
          <q-input
            ref="userpwd"
            type="password"
            v-model="userpwd"
            name="userpwd"
            id="userpwd"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '필수입력 사항입니다.']"
            placeholder="비밀번호 입력"
            label="비밀번호를 입력해주세요."
          />
        </q-card-section>
        <br />

        <q-btn
          icon="login"
          text-color="white"
          label="로그인"
          color="blue-grey-6"
          class="text-bold"
          @click="login"
        />
        <br />
        <br />
      </q-card>
      <q-dialog v-model="alert">
        <q-card class="bg-blue-grey-9">
          <q-card-section class="text-lime-5">
            <div class="text-h6 text-bold">알림</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-subtitle2 text-white"> {{ msg }}</q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="teal-3" @click="goList" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="alert2">
        <q-card class="bg-blue-grey-9">
          <q-card-section class="text-lime-5">
            <div class="text-h6 text-bold">{{ userid }}님!</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-subtitle2 text-white"> 환영합니다!</q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="teal-3" @click="goHome" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import http from '@/util/http-common';
export default {
  data() {
    return {
      userid: '',
      userpwd: '',
      token: '',
      alert: false,
      alert2: false,
      msg: '',
    };
  },
  methods: {
    login() {
      let err = true;
      this.msg = '';
      if (!this.userid) {
        err = false;
        this.msg = '아이디를 입력해주세요.';
        this.$refs.userid.focus();
      } else if (!this.userpwd) {
        err = false;
        this.msg = '패스워드를 입력해주세요.';
        this.$refs.userpwd.focus();
      }

      if (!err) this.alert = true;
      else this.loginUser();
    },
    loginUser() {
      http
        .post('/user/login', {
          userid: this.userid,
          userpwd: this.userpwd,
        })
        .then(({ data }) => {
          console.log(data);
          if (data.userid) {
            this.$cookie.set('userid', data.userid);
            this.alert2 = true;
          } else {
            this.msg = '존재하지 않는 회원입니다.';
            this.alert = true;
          }
        });
      // this.$router.push('/');
    },
    goList() {
      this.alert = false;
      this.$router.go(this.$router.currentRoute);
    },
    goHome() {
      this.alert2 = false;
      this.$router.push('/');
      this.$router.go(this.$router.currentRoute);
    },
  },
};
</script>

<style></style>
