<template>
  <header>
    <nav>
      <router-link to="/">홈</router-link>| <router-link to="/board">게시판</router-link> &nbsp;
      <a v-if="loginCookie" v-on:click.prevent="deleteCookie">로그아웃</a>
      <a v-else> <router-link to="/user/login">로그인</router-link>| </a>
      <router-link to="/regist">회원가입</router-link>|
      <router-link to="/weather">날씨</router-link>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      loginCookie: null,
    };
  },
  created() {
    this.loginCookie = document.cookie;
    console.log(document.cookie);
  },
  methods: {
    deleteCookie() {
      this.$cookie.delete('userid');
      this.loginCookie = document.cookie;
      alert('로그아웃 되었습니다.');
      this.$router.push('/');
    },
  },
};
</script>

<style></style>
