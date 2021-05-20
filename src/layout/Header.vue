<template>
  <header>
    <nav>
      <router-link to="/">홈</router-link>| <router-link to="/board">게시판</router-link> &nbsp;
      <router-link to="/login">로그인</router-link>|
      <router-link to="/regist">회원가입</router-link>|
      <router-link to="/weather">날씨</router-link>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'AppHeader',
};
</script>

<style></style>
