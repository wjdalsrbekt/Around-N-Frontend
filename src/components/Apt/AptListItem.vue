<template>
  <tr
    @click="chooseApt"
    @mouseover="colorChange(true)"
    @mouseout="colorChange(false)"
    :class="{ 'mouse-over-bgcolor': isColor }"
  >
    <td>{{ this.apt.dong }}</td>
    <td>{{ this.apt.aptName }}</td>
    <td>{{ this.apt.buildYear }}</td>
    <td>
      {{ this.apt.dealYear }}년 {{ this.apt.dealMonth }}월
      {{ this.apt.dealDay }}일
    </td>
    <td>{{ this.apt.area | calc }}평</td>
    <td>{{ this.apt.floor }}층</td>
    <td v-if="apt.dealAmount != null">
      {{ (this.apt.dealAmount.replace(",", "") * 10000) | price }}원
    </td>
    <td v-else>매매 가격 정보가 없습니다.</td>
  </tr>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "AptListItem",
  data() {
    return {
      isColor: false,
    };
  },
  props: {
    apt: Object,
  },
  methods: {
    ...mapActions(["selectApt"]),
    chooseApt() {
      this.selectApt(this.apt);
    },
    colorChange(flag) {
      this.isColor = flag;
    },
  },
  filters: {
    calc(area) {
      return (area * 0.3025).toFixed(2);
    },
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style>
.mouse-over-bgcolor {
  background-color: blanchedalmond;
}
</style>
