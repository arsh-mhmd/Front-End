<template>
  <div>
    <el-card>
      <div class="login_box">
        <el-button @click="goBack" type="primary">Go Back</el-button>
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
            <el-input placeholder="userName" v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="Create Password" prop="password">
            <el-input placeholder="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="Re-Create Password" prop="repassword">
            <el-input
              placeholder="password"
              v-model="form.repassword"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="create" type="primary" round
              >Create Manager</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- <el-row>
        <el-col :span="12">
           <div class="box">
             <h1>Register a new client:</h1>
             <el-button>Name</el-button>
             <el-button>Industry</el-button>
           </div>
        </el-col>
        <el-col :span="12">
           <div class="box">
             <h1>Select existing client:</h1>
             <el-button>Client's Name</el-button>
           </div>
        </el-col>
      </el-row> -->
    </el-card>
  </div>
</template>

<script>
import { formatDate } from "@/plugins/date.js";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      form: {},
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  created() {},
  methods: {
    create() {
      const _that = this;
      let token = localStorage.getItem("token");
      if (_that.form.password == _that.form.repassword) {
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
          .post("/api/ownerMod/createUser", createClient)
          .then(function (response) {
            console.log(response);
            if (response.status == 200) {
              alert("New Manager Creation Success");
            } else {
              alert("Fail, Error: " + response.status);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        alert("Password Mismatch");
      }
    },
    goBack() {
        this.$router.push({path: "/managerList"});
    },
  },
};
</script>

<style lang="less" scoped>
.box {
}
</style>
