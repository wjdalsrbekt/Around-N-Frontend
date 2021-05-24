<template>
  <div class="q-pa-md" style="margin-top: 150px">
    <!-- <p class="text-h4 text-bold">매물리스트</p> -->
    <q-markup-table flat bordered>
      <thead class="bg-blue-grey-6">
        <tr>
          <th colspan="7">
            <div class="row no-wrap items-center">
              <q-img :src="image" style="width: 70px" :ratio="1" class="rounded-borders" />
              <div class="text-h6 q-ml-md text-white">매물리스트</div>
            </div>
          </th>
        </tr>
        <!--Head start-->
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
      <tbody v-if="apts && apts.length != 0">
        <apt-list-item v-for="(apt, index) in apts" :key="index" :apt="apt" />
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="7">매물 정보가 없습니다.</td>
        </tr>
      </tbody>
    </q-markup-table>
    <!-- <q-page-scroller position="bottom-right">
      <q-btn fab icon="keyboard_arrow_up" color="amber-4" />
    </q-page-scroller> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AptListItem from '@/components/Apt/AptListItem.vue';
export default {
  name: 'AptList',
  data() {
    return {
      image: require('../../assets/apart.png'),
    };
  },
  components: {
    AptListItem,
  },
  computed: {
    ...mapState(['apts']),
  },
};
</script>

<style scoped></style>
