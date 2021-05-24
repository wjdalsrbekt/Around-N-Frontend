<template>
  <q-header class="bg-blue-grey-10 text-white shadow-2">
    <q-toolbar>
      <q-btn flat round dense icon="house" @click="goHome" />
      &nbsp; HappyHouse
      <q-space />
      <q-tabs active-color="lime-5">
        <q-route-tab label="게시판" to="/board" />
        <q-tab v-if="loginCookie" label="로그아웃" @click="deleteCookie" />
        <q-route-tab v-if="loginCookie" label="회원정보" to="/user/update" />
        <q-route-tab v-if="!loginCookie" label="로그인" to="/user/login" />
        <q-route-tab v-if="!loginCookie" label="회원가입" to="/regist" />
        <q-route-tab label="매물" to="/apt" />
      </q-tabs>
    </q-toolbar>
  </q-header>
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
    goHome() {
      if (this.$route.path !== '/') this.$router.push('/');
    },
    hum() {
      console.log(this.tab);
    },
  },
};
</script>

<style></style>
