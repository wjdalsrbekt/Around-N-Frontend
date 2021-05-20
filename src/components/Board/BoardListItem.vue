<template>
  <tr>
    <td>{{ this.board.bnum }}</td>
    <td>
      <router-link :to="`/board/read?bnum=${this.board.bnum}`">{{ this.board.title }}</router-link>
    </td>
    <td>{{ this.board.userid }}</td>
    <td>{{ getFormatDate(this.board.regdate) }}</td>
  </tr>
</template>
<script>
import moment from 'moment';
export default {
  name: 'BoardListItem',
  props: {
    // bnum: { type: Number },
    // title: { type: String },
    // userid: { type: String },
    // // price: { type: Number },
    // regdate: { type: String },
    board: Object,
  },
  methods: {
    getFormatDate(regdate) {
      return moment(new Date(regdate)).format('YYYY-MM-DD');
    },
  },
};
</script>

<style></style>
