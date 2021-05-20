<template>
  <div>
    <board-list />
    <board-search-bar />
  </div>
</template>
<script>
import BoardSearchBar from '@/components/Board/BoardSearchBar.vue';
import BoardList from '@/components/Board/BoardList.vue';

export default {
  name: 'Board',
  components: {
    BoardList,
    BoardSearchBar,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
