<template>
  <div>
    <h1>회원정보수정</h1>
    <label for="userid">아이디</label>
    <input v-model="userid" readonly /><br />
    <label for="username">이름</label>
    <input type="text" v-model="username" id="username" ref="username" /><br />
    <label for="userpwd">비밀번호</label>
    <input type="password" v-model="userpwd" id="userpwd" ref="userpwd" /><br />
    <label for="address">주소</label>
    <input type="text" v-model="address" id="address" ref="address" /><br />
    <label for="emailid">이메일</label>
    <input type="text" id="emailid" v-model="emailid" ref="emailid" /> @
    <select id="emaildomain" v-model="emaildomain">
      <option value="naver.com">naver.com</option>
      <option value="google.com">google.com</option>
      <option value="daum.net">daum.net</option>
      <option value="nate.com">nate.com</option>
      <option value="kakao.com">kakao.com</option>
    </select>
    <br />
    <label for="joindate">가입일</label>
    <span>{{ joindate | date }}</span>
    <br />
    <button @click="checkValue">수정</button>
    <button @click="byeUser">탈퇴</button>
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
