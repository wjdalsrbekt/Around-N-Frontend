<template>
  <div>
    <h1>회원가입</h1>
    <label for="userid">아이디</label>
    <input type="text" id="userid" v-model="userid" ref="userid" />
    <button @click="checkId">검사</button>
    <br />
    <label for="username">이름</label>
    <input type="text" v-model="username" id="username" ref="username" /><br />
    <label for="userpwd">비밀번호</label>
    <input type="password" v-model="userpwd" id="userpwd" ref="userpwd" /><br />
    <label for="address">주소</label>
    <input type="text" v-model="address" id="address" ref="address" /><br />
    <label for="emailid">이메일</label>
    <input type="text" id="emailid" v-model="emailid" ref="emailid" /> @
    <select id="emaildomain" v-model="emaildomain">
      <option value="naver.com">naver.com</option>
      <option value="google.com">google.com</option>
      <option value="daum.net">daum.net</option>
      <option value="nate.com">nate.com</option>
      <option value="kakao.com">kakao.com</option>
    </select>
    <br />
    <button @click="checkValue">회원가입</button>
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
      let msg = '';
      if (!this.userid) {
        err = false;
        msg = '아이디는 필수입력사항입니다.';
        this.$refs.userid.focus();
      } else if (!this.username) {
        err = false;
        msg = '이름은 비울 수 없습니다.';
        this.$refs.username.focus();
      } else if (!this.userpwd) {
        err = false;
        msg = '비밀번호를 입력해주세요.';
        this.$refs.userpwd.focus();
      } else if (!this.address) {
        err = false;
        msg = '주소를 입력해주세요.';
        this.$refs.address.focus();
      } else if (!this.emailid) {
        err = false;
        msg = '이메일은 비울 수 없습니다.';
        this.$refs.emailid.focus();
      } else if (this.ok === 'no') {
        err = false;
        msg = '아이디 검사를 먼저 해주세요.';
      }

      if (!err) alert(msg);
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
          let msg = '가입 과정 중 문제가 발생하였습니다.';
          if (data === 'success') {
            msg = '가입이 완료되었습니다!';
          }
          alert(msg);
          this.moveList();
        });
    },
    checkId() {
      http.get('/user/find/' + this.userid).then(({ data }) => {
        let msg = '이미 사용중인 아이디입니다.';
        if (data === 'success') {
          msg = '해당 아이디는 사용가능합니다.';
          this.ok = 'ok';
        }

        alert(msg);
      });
    },
    moveList() {
      this.$router.push('/user/login');
    },
  },
};
</script>

<style></style>
