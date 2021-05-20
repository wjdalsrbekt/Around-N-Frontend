<template>
  <div>
    <tr>
      <td>{{ comment }}</td>
      <td>{{ user_name }}</td>
      <td>{{ getFormatDate(comment_time) }}</td>
    </tr>
    <div>
      <!--router-link 후에 추가-->
      <button>수정</button>
      <button>삭제</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'row',
  props: {
    user_name: { type: String },
    comment: { type: String },
    comment_time: { type: String },
    comment_no: { type: Number },
    bnum: { type: Number },
  },
  methods: {
    getFormatDate(comment_time) {
      return moment(new Date(comment_time)).format('YYYY-MM-DD');
    },
  },
};
</script>

<style></style>
