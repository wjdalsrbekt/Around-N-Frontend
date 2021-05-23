<template>
  <div id="app">
    <div class="q-pa-md">
      <q-layout view="hHh LpR fff">
        <!--Header -->
        <Header />
        <!--Contents-->
        <q-page-container>
          <q-page style="padding-top: 60px">
            <router-view />
          </q-page>
          <!--Footer -->
          <hr />
          <p class="text-overline">Copyright @ 2021 뭐시기</p>
          <q-page-scroller position="bottom-right">
            <q-btn fab icon="keyboard_arrow_up" color="amber-4" />
          </q-page-scroller>
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>

<script>
import Header from '@/layout/Header.vue';
export default {
  name: 'App',
  components: {
    Header,
  },
  data() {
    return {
      loginCookie: document.cookie,
    };
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
