<template>
  <div>
    <h1>매물리스트</h1>
    <table>
      <thead>
        <tr>
          <!-- dong AptName code buildYear lat lng dealYear dealMonth dealDay area floor dealAmount -->
          <th>동</th>
          <th>아파트이름</th>
          <th>건축연도</th>
          <th>거래일자</th>
          <th>평수</th>
          <th>층</th>
          <th>거래가격(월세)</th>
        </tr>
      </thead>
      <tbody>
        <div v-if="apts && apts.length != 0" class="block">
          <apt-list-item v-for="(apt, index) in apts" :key="index" :apt="apt" />
        </div>
        <div v-else class="block">
          <tr>
            아파트 목록이 없습니다.
          </tr>
        </div>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AptListItem from '@/components/apt/AptListItem.vue';
export default {
  name: 'AptList',
  components: {
    AptListItem,
  },
  computed: {
    ...mapState(['apt']),
  },
};
</script>

<style scoped>
.block {
  display: inline-block;
}
</style>
