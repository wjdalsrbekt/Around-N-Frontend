<template>
  <header>
    <nav>
      <router-link to="/">홈</router-link>| <router-link to="/board">게시판</router-link> &nbsp;
      <span v-if="loginCookie">
        <a v-on:click.prevent="deleteCookie">로그아웃</a>|
        <router-link to="/user/update">정보수정</router-link>|
      </span>
      <span v-else><router-link to="/user/login">로그인</router-link>|</span>
      <router-link to="/regist">회원가입</router-link>|
      <router-link to="/weather">날씨</router-link>|
      <router-link to="/maplist">지도</router-link>
      <!-- <router-link to="/maplistY">영주지도</router-link> -->
      | &nbsp;
      <router-link to="/apt">매물보러가기</router-link>
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
    this.loginCookie = this.$cookie.get('userid');
    console.log(document.cookie);
  },
  methods: {
    deleteCookie() {
      this.$cookie.delete('userid');
      this.loginCookie = document.cookie;
      alert('로그아웃 되었습니다.');
      if (this.$route.path !== '/') this.$router.push('/');
    },
  },
};
</script>

<style></style>
