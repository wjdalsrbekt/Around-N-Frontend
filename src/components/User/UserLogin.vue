<template>
  <form action="" id="loginform" method="post">
    <label for="userid">아이디 : </label>
    <input
      ref="userid"
      key=""
      type="text"
      v-model="userid"
      name="userid"
      id="userid"
      placeholder="아이디 입력"
    />
    <br />
    <label for="userpwd">비밀번호 : </label>
    <input
      ref="userpwd"
      type="text"
      v-model="userpwd"
      name="userpwd"
      id="userpwd"
      placeholder="비밀번호 입력"
    />
    <br />
    <button @click="login">로그인</button>
  </form>
</template>

<script>
import http from '@/util/http-common';
export default {
  data() {
    return {
      userid: '',
      userpwd: '',
      token: '',
    };
  },
  methods: {
    login() {
      let err = true;
      let msg = '';
      if (!this.userid) {
        err = false;
        msg = '아이디를 입력해주세요.';
        this.$refs.userid.focus();
      } else if (!this.userpwd) {
        err = false;
        this.$refs.userpwd.focus();
      }

      if (!err) alert(msg);
      else this.loginUser();
    },
    loginUser() {
      http
        .post('/user/login', {
          userid: this.userid,
          userpwd: this.userpwd,
        })
        .then((resp) => {
          this.token = resp.data;
          console.log(this.token);
        });
    },
  },
};
</script>

<style></style>
