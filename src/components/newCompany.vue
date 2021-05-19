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
        
          <el-form-item label="Company Name">
            <el-input
              placeholder="Company Name"
              v-model="form.companyName"
            ></el-input>
          </el-form-item>
          <el-form-item label="Company Street Name">
            <el-input
              placeholder="Street Name"
              v-model="form.companyStreetName"
            ></el-input>
          </el-form-item>
          <el-form-item label="Company Town">
            <el-input
              placeholder="Town"
              v-model="form.companyTown"
            ></el-input>
          </el-form-item>
          <el-form-item label="Company Country">
            <el-input
              placeholder="Country"
              v-model="form.companyCountry"
            ></el-input>
          </el-form-item>
           <el-form-item label="Postal Code">
            <el-input
              placeholder="Postal Code"
              v-model="form.companyPostalCode"
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
      companyList:[
        {
          compName: "John",
          compId: "Smith"
        },
        {
          compName: "222",
          compId: "333"
        }
      ],
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
      let url = "/api/selectClient?clientId="+clientid
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .get(url)
        .then(function (response) {
          console.log("Get Client");
          console.log(response);
          if (JSON.stringify(response) !== "{}") {
            //localStorage.setItem("allInvoiceList",JSON.stringify(response.data))
            //console.log(response.data)
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
      _that.$set(_that.form,'id',response.data.id)
      _that.$set(_that.form,'firstName',response.data.firstName)
      _that.$set(_that.form,'lastName',response.data.lastName)
      _that.$set(_that.form,'email',response.data.email)
      _that.$set(_that.form,'streetName',response.data.streetName)
      _that.$set(_that.form,'postalCode',response.data.postalCode)
      _that.$set(_that.form,'town',response.data.town)
      _that.$set(_that.form,'country',response.data.country)
      }}).catch(function (error){
        alert("Connect Fail");
        console.log(error)
      })
    }
  },
  methods: {
    submit(){
      const _that =this
      let token = localStorage.getItem('token')
      // let createClient = {'clientName':_that.form.firstname,'industry':_that.form.lastname,'contactNo':_that.form.postcode}
      let createClient = {'companyName':_that.form.companyName,'companyStreetName':_that.form.companyStreetName,'companyTown':_that.form.companyTown,
        'companyCountry':_that.form.companyCountry,'companyPostalCode':_that.form.companyPostalCode}
      axios.defaults.headers.common['Authorization'] = "Bearer "+token
      let url = '/api/registerCompany'
      // let clientFlag = localStorage.getItem('clientChangeFlag')
      // if (clientFlag != '-1'){
      //   url = '/api/updateClient'
      //   createClient.clientId = clientFlag
      //   createClient.id = _that.form.id
      // }
      console.log(createClient)
      axios.post(url,createClient).then(function (response){
        console.log(response)
        if (response.status == 201 || response.status == 200){
          alert("Client Register Success");
          _that.$router.push({path: "/companyList"});
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
