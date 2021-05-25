<template>
  <div class="q-pa-md">
    <div style="max-width: 1000px; margin: 0 auto">
      <q-card>
        <br />
        <p class="text-h4 text-bold">회원가입</p>

        <q-card-section>
          <label flat class="text-h5" for="userid">아이디</label>
          <q-input
            ype="text"
            id="userid"
            v-model="userid"
            ref="userid"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '아이디는 필수입력 사항입니다.']"
            label="아이디를 입력해주세요."
            hint="아이디입력하시고 검사하세요."
            readonly
          /><br />
          <label class="text-h5" for="username">이름</label>
          <q-input
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '이름은 필수입력 사항입니다.']"
            label="이름을 입력해주세요."
            hint="사용자 본인이름을 입력해주세요."
            type="text"
            v-model="username"
            id="username"
            ref="username"
          /><br />
          <label class="text-h5" for="userpwd">비밀번호</label>
          <q-input
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '비밀번호는  필수입력 사항입니다.']"
            label="비밀번호를 입력해주세요."
            hint="운영자는 사용자에게 비밀번호를 묻지 않습니다."
            type="password"
            v-model="userpwd"
            id="userpwd"
            ref="userpwd"
          /><br />
          <label class="text-h5" for="address">주소</label>
          <q-input
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '주소는 필수입력 사항입니다.']"
            label="주소를 입력해주세요."
            hint="사용자 본인 주소를 입력해주세요."
            type="text"
            v-model="address"
            id="address"
            ref="address"
          /><br />
          <label class="text-h5" for="emailid">이메일</label>
        </q-card-section>
        <div class="row">
          <div class="col-6">
            <q-input
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '이메일도 필수입력 사항입니다.']"
              label="이메일을 입력해주세요."
              hint="사용자 본인 이메일을 입력해주세요."
              type="text"
              id="emailid"
              v-model="emailid"
              ref="emailid"
            />
          </div>
          <div class="col-6" style="height: 150px">
            <q-select
              outlined
              id="emaildomain"
              v-model="emaildomain"
              :options="options"
              option-value="id"
              option-label="desc"
              emit-value
              map-options
            >
            </q-select>
          </div>
        </div>
        <label for="joindate" class="text-overline">가입일</label> &nbsp;
        <span class="text-overline">{{ joindate | date }}</span>
        <br />
        <br />
      </q-card>
      <br />
      <div class="q-mt-md q-gutter-md">
        <q-btn
          icon="system_update_alt"
          label="수정"
          text-color="deep green-5"
          color="lime-5"
          class="text-bold"
          style="height: 55px"
          @click="checkValue"
        />
        <q-btn
          icon="logout"
          label="탈퇴"
          text-color="red-9"
          text-bold
          color="orange-5"
          class="text-bold"
          style="height: 55px"
          @click="confirm = true"
        />
      </div>
      <q-dialog v-model="alert">
        <q-card class="bg-blue-grey-9">
          <q-card-section class="text-lime-5">
            <div class="text-h6 text-bold">알림</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-subtitle2 text-white"> {{ msg }}</q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="teal-3" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="alert2">
        <q-card class="bg-blue-grey-9">
          <q-card-section class="text-lime-5">
            <div class="text-h6 text-bold">알림</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-subtitle2 text-white">
            {{ msg }}
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="teal-3" @click="moveList" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="confirm" persistent>
        <q-card class="bg-blue-grey-9">
          <q-card-section class="text-lime-5">
            <div class="text-h6 text-bold">탈퇴</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-subtitle2 text-white">
            정말로 탈퇴하시겠습니까?
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="취소" color="teal-3" v-close-popup />
            <q-btn flat label="네" color="lime-5" class="text-bold" @click="trigger" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-ajax-bar ref="bar" position="bottom" color="lime-5" size="12px" skip-hijack />
    </div>
  </div>
</template>

<script>
import { QSpinnerGears, QSpinnerHourglass } from 'quasar';
import http from '@/util/http-common';
import moment from 'moment';
export default {
  name: 'UserUpdate',
  filters: {
    date(time) {
      return moment(new Date(time)).format('l');
    },
  },
  data() {
    return {
      userid: this.$cookie.get('userid'),
      username: '',
      userpwd: '',
      email: '',
      address: '',
      msg: '',
      joindate: '',
      emailid: '',
      alert: false,
      alert2: false,
      confirm: false,
      emaildomain: '',
      options: [
        {
          id: 'kakao.com',
          desc: '@kakao.com',
        },
        {
          id: 'naver.com',
          desc: '@naver.com',
        },
        {
          id: 'google.com',
          desc: '@google.com',
        },
        {
          id: 'daum.net',
          desc: '@daum.net',
        },
      ],
    };
  },
  created() {
    http.get('/user/' + this.userid).then(({ data }) => {
      console.log(data);
      this.username = data.username;
      this.userpwd = data.userpwd;
      this.address = data.address;
      this.email = data.email;
      this.joindate = data.joindate;
      let array = data.email.split('@');
      this.emailid = array[0];
      this.emaildomain = array[1];
    });
  },
  methods: {
    checkValue() {
      let err = true;
      this.msg = '';

      if (!this.username) {
        err = false;
        this.msg = '이름은 비울 수 없습니다.';
        this.$refs.username.focus();
      } else if (!this.userpwd) {
        err = false;
        this.msg = '비밀번호를 입력해주세요.';
        this.$refs.userpwd.focus();
      } else if (!this.address) {
        err = false;
        this.msg = '주소를 입력해주세요.';
        this.$refs.address.focus();
      } else if (!this.emailid) {
        err = false;
        this.msg = '이메일은 비울 수 없습니다.';
        this.$refs.emailid.focus();
      }

      if (!err) this.alert = true;
      else this.modifyUser();
    },
    modifyUser() {
      http
        .put('/user', {
          userid: this.userid,
          username: this.username,
          userpwd: this.userpwd,
          email: this.emailid + '@' + this.emaildomain,
          address: this.address,
          joindate: this.joindate,
        })
        .then(({ data }) => {
          this.msg = '수정 처리 중 문제가 발생하였습니다.';
          if (data === 'success') {
            this.msg = '수정이 완료되었습니다.';
          }

          this.alert2 = true;
        });
    },
    moveList() {
      this.alert2 = false;
      this.$router.push('/');
    },
    trigger() {
      const bar = this.$refs.bar;

      this.$q.loading.show({
        spinner: QSpinnerHourglass,
        spinnerColor: 'lime-5',
        messageColor: 'white',
        message: '<p class="text-overline">정보를 삭제하는 중입니다...</p>',
        delay: 200,
        spinnerSize: '5em',
      });

      bar.start();

      this.timer = setTimeout(() => {
        if (this.$refs.bar) {
          this.$refs.bar.stop();
          this.$q.loading.show({
            spinner: QSpinnerGears,
            spinnerColor: 'deep-orange',
            message: '이용해주셔서 감사합니다.',
          });

          http.delete('/user/' + this.userid).then(({ data }) => {
            if (data === 'success') {
              this.$cookie.delete('userid');
              this.loginCookie = document.cookie;
            }
          });
          this.timer = setTimeout(() => {
            this.$q.loading.hide();
            this.timer = void 0;
            this.$router.go(this.$router.currentRoute);
            this.$router.push('/');
          }, 1500);
        }
      }, 3000);
    },
  },
};
</script>

<style></style>
