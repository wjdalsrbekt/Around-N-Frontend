<template>
  <div>
    <h1>매물정보</h1>
    <apt-search-bar />
    <apt-list />
    <apt-detail />
  </div>
</template>

<script>
import AptSearchBar from '@/components/Apt/AptSearchBar.vue';
import AptList from '@/components/Apt/AptList.vue';
import AptDetail from '@/components/Apt/AptDetail.vue';
export default {
  name: 'Apt',
  components: {
    AptSearchBar,
    AptList,
    AptDetail,
  },
};
</script>

<style></style>
