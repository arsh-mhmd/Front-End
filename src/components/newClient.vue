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
          <el-form-item label="FirstName">
            <el-input
              placeholder="FirstName"
              v-model="form.firstName"
            ></el-input>
          </el-form-item>
          <el-form-item label="LastName">
            <el-input
              placeholder="LastName"
              v-model="form.lastName"
            ></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input
              placeholder="Email"
              v-model="form.email"
            ></el-input>
          </el-form-item>
          <h5>Address information</h5>
          <el-form-item label="StreetName">
            <el-input
              placeholder="StreetName"
              v-model="form.streetName"
            ></el-input>
          </el-form-item>
           <el-form-item label="PostalCode">
            <el-input
              placeholder="PostalCode"
              v-model="form.postalCode"
            ></el-input>
          </el-form-item>
          <el-form-item label="Town">
            <el-input
              placeholder="Town"
              v-model="form.town"
            ></el-input>
          </el-form-item>
          <el-form-item label="Country">
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
    let _that = this
    let clientFlag = localStorage.getItem('clientChangeFlag')
    if (clientFlag != '-1'){
      //get the client by key id
      let clientid = clientFlag;
      axios.defaults.headers.common['Authorization'] = "Bearer "+token
      axios.post('/api/createInvoice', clientid, {
        headers:{
          'Authorization':"Bearer " + token,
          'content-type': 'application/json'
        }
      }).then(function (response){
        console.log(response)
      // Mock client
      // let response = {
      //   firstName: "John",
      //     lastName: "Smith",
      //   email:'sdfsd@435.com',
      //   streetName: "2 Court Square",
      //   postalCode: "NY 12210",
      //   town: "New York",
      //   country: "USA",
      // }
      _that.$set(_that.form,'firstName',response.firstName)
      _that.$set(_that.form,'lastName',response.lastName)
      _that.$set(_that.form,'email',response.email)
      _that.$set(_that.form,'streetName',response.streetName)
      _that.$set(_that.form,'postalCode',response.postalCode)
      _that.$set(_that.form,'town',response.town)
      _that.$set(_that.form,'country',response.country)
      }).catch(function (error){
        console.log(error)
      })
    }
  },
  methods: {
    submit(){
      const _that =this
      let token = localStorage.getItem('token')
      // let createClient = {'clientName':_that.form.firstname,'industry':_that.form.lastname,'contactNo':_that.form.postcode}
      let createClient = {'firstName':_that.form.firstName,'lastName':_that.form.lastName,'email':_that.form.email,
        'streetName':_that.form.streetName,'postalCode':_that.form.postalCode,'town':_that.form.town,'country':_that.form.country}
      axios.defaults.headers.common['Authorization'] = "Bearer "+token
      let url = '/api/registerClient'
      let clientFlag = localStorage.getItem('clientChangeFlag')
      if (clientFlag != '-1'){
        url = '/api/registerClient'
        createClient.clientid = clientFlag
      }
      console.log(createClient)
      axios.post(url,createClient).then(function (response){
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
    handleChange(){
      let _that = this
      this.$forceUpdate()
    }
  },
};
</script>

<style lang="less" scoped>
  .box{

  }
</style>
