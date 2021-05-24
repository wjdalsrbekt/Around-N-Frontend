<template>
  <div>
    <q-card>
    <br/>
    <p class="text-h5" for="userid"> 아이디  </p>
    <q-card-section>
    <q-input
      ref="userid"
      type="text"
      v-model="userid"
      name="userid"
      id="userid"
      placeholder="아이디 입력"
      label="아이디 입력해주세요."
    />
    <br />
    </q-card-section>
    <p class="text-h5" for="userpwd"> 비밀번호 </p>
     <q-card-section> 
    <q-input
      ref="userpwd"
      type="password"
      v-model="userpwd"
      name="userpwd"
      id="userpwd"
      placeholder="비밀번호 입력"
      label="비밀번호 입력해주세요."
    />
     </q-card-section>
    <br />
    
    </q-card>
    <br />
    <q-btn color="lime-5" @click="login">로그인</q-btn>
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
