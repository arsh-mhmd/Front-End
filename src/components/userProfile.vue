<template>
  <div>
    <el-card>
      <div class="login_box">
        <h1>Invoice Management System</h1>
        <el-form
          ref="formRef"
          label-width="200"
          class="login_form"
          :model="form"
        >
          <el-form-item label="FirstName" prop="firstName">
            <el-input
              placeholder="FirstName"
              v-model="form.firstName"
            ></el-input>
          </el-form-item>
          <el-form-item label="LastName" prop="lastName">
            <el-input placeholder="LastName" v-model="form.lastName"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input placeholder="Email" v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="User Name" prop="userName">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
            :disabled="this.disabledPassword"
              placeholder="password"
              v-model="form.password"
            ></el-input>
          </el-form-item>
          <el-form-item id = "final" label="Enter Password to Verify" prop="repassword">
            <el-input
             :disabled="this.disabled"
              placeholder="password"
              v-model="form.repassword"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="save" type="primary" round>Save</el-button>
            <el-button @click="changePassword" type="primary" round>Change Password</el-button>
            <el-button :disabled="this.disabled" @click="verifyPassword" type="primary" round
              >Verify Password</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { formatDate } from "@/plugins/date.js";
import axios from "axios";
import swal from 'sweetalert';
export default {
  data() {
    return {
      disabled: true,
      disabledPassword:true,
      form: {},
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  created() {
    let _that = this;
    let role = localStorage.getItem("role");
    if (role != 0) {
      _that.deleteable = true;
    }
    _that.isDisabled = false;
    localStorage.setItem("voiceChangeFlag", "-1");
    console.log(_that.deleteable);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axios
      .get(
        "/api/managerSpace/getUserProfile?userName=" +
          localStorage.getItem("loginUser")
      )
      .then(function (response) {
        if (JSON.stringify(response) !== "{}") {
          console.log(response.data);
          _that.$set(_that.form, "firstName", response.data.firstName);
          _that.$set(_that.form, "lastName", response.data.lastName);
          _that.$set(_that.form, "email", response.data.email);
          _that.$set(_that.form, "userName", response.data.userName);
          _that.$set(_that.form, "password", response.data.password);
        }
      })
      .catch(function (error) {});
  },
  methods: {

    save() {
      const _that = this;
      _that.disabledPassword=false;
      let token = localStorage.getItem("token");
      let createClient = {
        firstName: _that.form.firstName,
        lastName: _that.form.lastName,
        email: _that.form.email,
        userName: _that.form.userName,
        password: _that.form.password,
        role: "Manager",
      };
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios
        .post("/api/managerSpace/updateProfile", createClient)
        .then(function (response) {
          console.log(response);
          if (response.status == 200) {
             _that.disabledPassword=true;
            // alert("Profile Update Success");
            swal("Profile Updated");
            _that.$set(_that.form, "firstName", response.data.firstName);
          _that.$set(_that.form, "lastName", response.data.lastName);
          _that.$set(_that.form, "email", response.data.email);
          _that.$set(_that.form, "userName", response.data.userName);
          _that.$set(_that.form, "password", response.data.password);
           _that.$set(_that.form, "repassword", "");
          } else {
            console.log("Fail, Error: " + response.status);
            swal("Profile Update Failed, Retry!");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    changePassword() {
      this.disabled=false;
  },

    verifyPassword() {
      const _that = this;
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios
        .get(
          "/api/managerSpace/verifyUser?userName=" +
            _that.form.userName +
            "&enpassword=" +
            _that.form.password +
            "&rawpassword=" +
            _that.form.repassword
        )
        .then(function (response) {
          console.log(response);
          if (response.data == true) {
            swal("Password Verification Success");
            // alert("Password Verification Success");
            _that.disabled=true;
            _that.disabledPassword=false;
            _that.$set(_that.form, "password", "");
            _that.$set(_that.form, "repassword", "");
          } else {
            swal("Password Not Matched");
            // alert("Fail, Error: " + response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
}
</style>
