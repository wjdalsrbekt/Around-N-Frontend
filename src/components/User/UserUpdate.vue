<template>
  <div class="q-pa-md">
     <div style="max-width: 1000px;margin:0 auto">
       <q-card>
         <br>
    <h1 class="text-h1 text-bold">회원정보수정</h1>
    
    <q-card-section>
    <label flat class="text-h5" for="userid">아이디</label>
    <q-input ype="text" id="userid" v-model="userid" ref="userid" lazy-rules
          :rules="[(val) => (val && val.length > 0) || '아이디는 필수입력 사항입니다.']"
          label="아이디를 입력해주세요." hint="아이디입력하시고 검사하세요." readonly /><br />
    <label  class="text-h5" for="username">이름</label>
    <q-input lazy-rules
          :rules="[(val) => (val && val.length > 0) || '이름은 필수입력 사항입니다.']"
          label="이름을 입력해주세요." hint="사용자 본인이름을 입력해주세요." type="text" v-model="username" id="username" ref="username" /><br />
    <label  class="text-h5" for="userpwd">비밀번호</label>
    <q-input lazy-rules
          :rules="[(val) => (val && val.length > 0) || '비밀번호는  필수입력 사항입니다.']"
          label="비밀번호를 입력해주세요." hint="운영자는 사용자에게 비밀번호를 묻지 않습니다." type="password" v-model="userpwd" id="userpwd" ref="userpwd" /><br />
    <label  class="text-h5" for="address">주소</label>
    <q-input lazy-rules
          :rules="[(val) => (val && val.length > 0) || '주소는 필수입력 사항입니다.']"
          label="주소를 입력해주세요." hint="사용자 본인 주소를 입력해주세요." type="text" v-model="address" id="address" ref="address" /><br />
    <label  class="text-h5" for="emailid">이메일</label>
    </q-card-section>
    <div class="row">
      <div class="col-6">
    <q-input lazy-rules
          :rules="[(val) => (val && val.length > 0) || '이메일도 필수입력 사항입니다.']"
          label="이메일을 입력해주세요." hint="사용자 본인 이메일을 입력해주세요." type="text" id="emailid" v-model="emailid" ref="emailid" />
      </div>
       <div class="col-6" style="height: 150px">
    <q-select outlined id="emaildomain" v-model="emaildomain" :options="options"
        option-value="id"
        option-label="desc" emit-value
        map-options>
      <option value="naver.com">네이버</option>
      <option value="google.com">구글</option>
      <option value="daum.net">다음</option>
      <option value="nate.com">네이트</option>
      <option value="kakao.com">카카오</option>
    </q-select>
    </div>
    </div>
    <br />
    <label for="joindate">가입일</label>
    <span>{{ joindate | date }}</span>
       <br/>
       </q-card>
    <br />
    <div class="q-mt-md q-gutter-md">

    <q-btn icon="system_update_alt"
      label="수정"
      text-color="white"
      color="lime-5"
      class="text-bold"
      style="height: 55px"  @click="checkValue"/>
    <q-btn icon="logout"
      label="탈퇴"
      text-color="white"
      color="orange-5"
      class="text-bold"
      style="height: 55px" @click="byeUser"/>
    </div>
     </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
import moment from "moment";
export default {
  name: "UserUpdate",
  filters: {
    date(time) {
      return moment(new Date(time)).format("l");
    },
  },
  data() {
    return {
      userid: this.$cookie.get("userid"),
      username: "",
      userpwd: "",
      email: "",
      address: "",
      joindate: "",
      emailid: "",
      emaildomain: "",
      options:[
      
        {
          id:'@kakao.com',
          desc: '@kakao.com'
        },
        {
          id:'@naver.com',
          desc: '@naver.com'
        },
        {
          id:'@google.com',
          desc: '@google.com'
        },
        {
          id:'@daum.net',
          desc: '@daum.net'
        },
      ]
    };
  },
  created() {
    http.get("/user/" + this.userid).then(({ data }) => {
      console.log(data);
      this.username = data.username;
      this.userpwd = data.userpwd;
      this.address = data.address;
      this.email = data.email;
      this.joindate = data.joindate;
      let array = data.email.split("@");
      this.emailid = array[0];
      this.emaildomain = array[1];
    });
  },
  methods: {
    checkValue() {
      let err = true;
      let msg = "";

      if (!this.username) {
        err = false;
        msg = "이름은 비울 수 없습니다.";
        this.$refs.username.focus();
      } else if (!this.userpwd) {
        err = false;
        msg = "비밀번호를 입력해주세요.";
        this.$refs.userpwd.focus();
      } else if (!this.address) {
        err = false;
        msg = "주소를 입력해주세요.";
        this.$refs.address.focus();
      } else if (!this.emailid) {
        err = false;
        msg = "이메일은 비울 수 없습니다.";
        this.$refs.emailid.focus();
      }

      if (!err) alert(msg);
      else this.modifyUser();
    },
    modifyUser() {
      http
        .put("/user", {
          userid: this.userid,
          username: this.username,
          userpwd: this.userpwd,
          email: this.emailid + "@" + this.emaildomain,
          address: this.address,
          joindate: this.joindate,
        })
        .then(({ data }) => {
          let msg = "수정 처리 중 문제가 발생하였습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }

          alert(msg);
          this.moveList();
        });
    },
    moveList() {
      this.$router.push("/");
    },
    byeUser() {
      let result = confirm("정말로 탈퇴하시겠습니까?");
      if (result) {
        http.delete("/user/" + this.userid).then(({ data }) => {
          let msg = "탈퇴 처리 중 문제가 발생했습니다.";
          if (data === "success") {
            this.$cookie.delete("userid");
            this.loginCookie = document.cookie;
            msg = "탈퇴 되었습니다.";
          }
          alert(msg);
          this.$router.go(this.$router.currentRoute);
          this.$router.push("/");
        });
      } else {
        alert("취소되었습니다.");
      }
    },
  },
};
</script>

<style></style>
