<template>
  <div class="q-pa-md">
    <q-dialog v-model="alert">
      <q-card class="bg-blue-grey-9">
        <q-card-section class="text-lime-5">
          <div class="text-h6 text-bold">경고</div>
        </q-card-section>
        <q-card-section class="q-pt-none text-subtitle2 text-white"> {{ message }}</q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="teal-3" @click="goList" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import http from '@/util/http-common';
export default {
  name: 'Boarddelete',
  data() {
    return {
      alert: false,
      message: '',
    };
  },
  created() {
    http
      .delete(`/board/${this.$route.query.bnum}`)
      .then(({ data }) => {
        // let msg = '삭제 처리시 문제가 발생했습니다.';
        this.message = '삭제 처리 중 문제가 발생하였습니다.';
        if (data === 'success') {
          this.message = '삭제가 완료되었습니다.';
        }
        this.alert = true;
        // alert(msg);
        // this.$router.push('/board');
      })
      .catch(() => {
        this.message = '에러가 발생했습니다.';
        // alert('삭제 처리시 에러가 발생했습니다.');
      });
  },
  methods: {
    goList() {
      this.alert = false;
      this.$router.push('/board');
    },
  },
};
</script>

<style></style>
