<template>
  <div>
    <label for="userid">아이디 : </label>
    <input
      ref="userid"
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
        msg = '패스워드를 입력해주세요.';
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
        .then(({ data }) => {
          console.log(data);
          if (data.userid) {
            alert('환영합니다!');
            this.$cookie.set('userid', data.userid);
            this.$router.go(this.$router.currentRoute);
          } else {
            alert('존재하지 않는 회원입니다.');
          }
        });
      this.$router.push('/');
    },
  },
};
</script>

<style></style>
