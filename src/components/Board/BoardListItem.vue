<template>
  <tr>
    <td>{{ bnum }}</td>
    <td>
      <router-link :to="`/board/read?bnum=${this.bnum}`">{{ title }}</router-link>
    </td>
    <td>{{ userid }}</td>
    <td>{{ getFormatDate(regdate) }}</td>
  </tr>
</template>
<script>
import moment from 'moment';
export default {
  name: 'row',
  props: {
    bnum: { type: Number },
    title: { type: String },
    userid: { type: String },
    // price: { type: Number },
    regdate: { type: String },
  },
  methods: {
    getFormatDate(regdate) {
      return moment(new Date(regdate)).format('YYYY-MM-DD');
    },
  },
};
</script>

<style></style>
