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
            <el-input
              placeholder="LastName"
              v-model="form.lastName"
            ></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input
              placeholder="Email"
              v-model="form.email"
            ></el-input>
          </el-form-item>
          <h5>Address information</h5>
          <el-form-item label="StreetName" prop="streetName">
            <el-input
              placeholder="StreetName"
              v-model="form.streetName"
            ></el-input>
          </el-form-item>
           <el-form-item label="PostalCode" prop="postalCode">
            <el-input
              placeholder="PostalCode"
              v-model="form.postalCode"
            ></el-input>
          </el-form-item>
          <el-form-item label="Town" prop="town">
            <el-input
              placeholder="Town"
              v-model="form.town"
            ></el-input>
          </el-form-item>
          <el-form-item label="Country" prop="country">
            <el-input
              placeholder="Country"
              v-model="form.country"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit" type="primary" round>Submit</el-button>
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
import qs from 'qs';
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
  created() {

  },
  methods: {
    submit(){
      const _that =this
      let token = localStorage.getItem('token')
      // let createClient = {'clientName':_that.form.firstname,'industry':_that.form.lastname,'contactNo':_that.form.postcode}
      let createClient = {'firstName':_that.form.firstName,'lastName':_that.form.lastName,'email':_that.form.email,
        'streetName':_that.form.streetName,'postalCode':_that.form.postalCode,'town':_that.form.town,'country':_that.form.country}
      axios.defaults.headers.common['Authorization'] = "Bearer "+token
      axios.post('/api/registerClient',createClient).then(function (response){
        console.log(response)
        if (response.status == 201){
          alert("Client Register Success");
        } else {
          alert("Fail, Error: "+ response.status);
        }
      }).catch(function (error){
        console.log(error)
      })
    },
  },
};
</script>

<style lang="less" scoped>
  .box{

  }
</style>
