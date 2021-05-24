<template>
  <div class="q-pa-md">
    <p class="text-h4 text-bold">매물정보</p>
    <q-layout view="lHh lpR fFf">
      <q-drawer v-model="left" show-if-above slide="left" :width="900">
        <apt-search-bar />
        <apt-list />
        <!-- <q-page-scroller position="bottom">
          <q-btn fab icon="keyboard_arrow_up" color="amber-4" />
        </q-page-scroller> -->
      </q-drawer>
      <q-page-container>
        <apt-detail />
        <q-btn flat text-color="teal-3" @click="left = !left" round dense icon="first_page" />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import AptSearchBar from '@/components/Apt/AptSearchBar.vue';
import AptList from '@/components/Apt/AptList.vue';
import AptDetail from '@/components/Apt/AptDetail.vue';
export default {
  name: 'Apt',
  data() {
    return {
      left: false,
    };
  },
  components: {
    AptSearchBar,
    AptList,
    AptDetail,
  },
};
</script>

<style></style>
