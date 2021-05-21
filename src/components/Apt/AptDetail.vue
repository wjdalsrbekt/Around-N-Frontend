<template>
  <div>디테일</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'AptDetail',
  data() {
    return {
      lat: '',
      lon: '',
    };
  },
  computed: {
    ...mapState(['apt']),
  },
};
</script>

<style></style>
