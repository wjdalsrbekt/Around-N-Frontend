<template>
  <q-header class="bg-blue-grey-10 text-white shadow-2">
    <q-toolbar>
      <q-btn flat round dense icon="house" @click="goHome" />
      &nbsp; Around:N
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
    <q-dialog v-model="alert">
      <q-card class="bg-blue-grey-9">
        <q-card-section class="text-lime-5">
          <div class="text-h6 text-bold">로그아웃</div>
        </q-card-section>
        <q-card-section class="q-pt-none text-subtitle2 text-white">
          로그아웃 되었습니다.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="teal-3" @click="goList" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-header>
</template>
<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      loginCookie: null,
      alert: false,
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
      this.alert = true;
      // if (this.$route.path !== '/') this.$router.push('/');
    },
    goList() {
      this.alert = false;
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
