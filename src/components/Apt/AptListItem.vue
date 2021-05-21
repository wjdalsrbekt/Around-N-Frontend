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
    <td>{{ this.apt.dealYear }}-{{ this.apt.dealMonth }}={{ this.apt.dealDay }}</td>
    <td>{{ this.apt.area | calc }}</td>
    <td>{{ this.apt.floor }}층</td>
    <td>{{ (this.apt.dealAmount.replace(',', '') * 10000) | price }}원</td>
  </tr>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'AptListItem',
  data() {
    return {
      isColor: false,
    };
  },
  props: {
    apt: Object,
  },
  methods: {
    ...mapActions(['selectApt']),
    chooseApt() {
      this.selectApt(this.apt);
    },
    colorChange(flag) {
      this.isColor = flag;
    },
  },
  filters: {
    calc(area) {
      return area * 0.3025;
    },
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
</script>

<style>
.mouse-over-bgcolor {
  background-color: blanchedalmond;
}
</style>
