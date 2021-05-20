<template>
  <div>
    <div v-if="boards.length">
      <table>
        <colgroup>
          <col :style="{ width: '5%' }" />
          <col :style="{ width: '50%' }" />
          <col :style="{ width: '10%' }" />
          <col :style="{ width: '25%' }" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          <board-list-item
            v-for="board in boards"
            :key="`${board.bnum}_blist`"
            :bnum="board.bnum"
            :title="board.title"
            :userid="board.userid"
            :regdate="board.regdate"
          />
        </tbody>
      </table>
    </div>
    <div v-else>작성된 글이 없습니다.</div>
    <button @click="movePage">작성</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BoardListItem from './BoardListItem.vue';
export default {
  name: 'BoardList',
  components: {
    BoardListItem,
  },
  computed: {
    ...mapState(['boards']),
  },
  methods: {
    movePage() {
      this.$router.push('/board/create');
    },
  },
  created: function () {
    this.$store.dispatch('getBoardList');
  },
};
</script>

<style></style>
