<template>
  <div>
    <table>
      <tr>
        <th>게시글번호</th>
        <td>{{ board.bnum }}</td>
      </tr>
      <tr>
        <th>제목</th>
        <td>{{ board.title }}</td>
      </tr>
      <tr>
        <th>내용</th>
        <td>{{ board.content }}</td>
      </tr>
      <tr>
        <th>작성자</th>
        <td>{{ board.userid }}</td>
      </tr>
      <tr>
        <th>문의가격</th>
        <td>{{ board.price | price }}</td>
      </tr>
      <tr>
        <th>작성일</th>
        <td>{{ board.regdate }}</td>
      </tr>
    </table>
    <div>
      <router-link :to="'/board/update?bnum=' + board.bnum">수정</router-link>
      <!-- <button @click="deleteItem">삭제</button> -->
      <router-link :to="'/board/delete?bnum=' + board.bnum">삭제</router-link>
    </div>
    <!-- <h3>댓글[{{ comments.length }}]</h3>
    <table>
      <comment-list-item
        v-for="comment in comments"
        :key="`${comment.comment_no}`"
        :user_name="comment.user_name"
        :comment="comment.comment"
        :comment_time="comment.comment_time"
        :comment_no="comment.comment_no"
        :bnum="comment.bnum"
      />
    </table> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import { mapActions } from 'vuex';
// import CommentListItem from './CommentListItem.vue';
export default {
  name: 'BoardDetail',
  data() {
    return {
      code: '',
    };
  },
  components: {
    // CommentListItem,
  },
  computed: {
    ...mapState(['board']),
    // ...mapState(['board'], ['commments']),
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  created() {
    // console.log('들어옴');
    // console.log(this.$route.query.bnum);
    this.$store.dispatch('getBoard', this.$route.query.bnum);
  },
  methods: {
    // ...mapActions(['deleteBoard']),
    // deleteItem() {
    //   //아이디 검사
    //   this.deleteBoard(this.$route.query.bnum);
    //   this.moveList();
    // },
    // moveList() {
    //   this.$router.push('/board');
    // },
  },
};
</script>

<style></style>
