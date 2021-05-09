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
                <el-select v-model="form.companyName" placeholder="Company Name" @click="handleChange()">
                  <el-option
                    v-for="(item, index) in companyList"
                    :key="index"
                    :label="item.companyName"
                    :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
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
      companyList:[],
        // {
        //   compName: "John",
        //   compId: "Smith"
        // },
        // {
        //   compName: "222",
        //   compId: "333"
        // }
      // ],
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

      const initRequest = axios.get(url);
      const companyListRequest = axios.get("/api/getAllCompanies");

      axios
        .all([initRequest, companyListRequest])
        .then(
          axios.spread((...responses) => {
            const clientResponse = responses[0];
            const companyListResponse = responses[1];
            _that.rightsList = [];
            _that.companyList = companyListResponse.data;

            if (JSON.stringify(clientResponse) !== "{}") {
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
      _that.$set(_that.form,'id',clientResponse.data.id)
      _that.$set(_that.form,'firstName',clientResponse.data.firstName)
      _that.$set(_that.form,'lastName',clientResponse.data.lastName)
      _that.$set(_that.form,'email',clientResponse.data.email)
      _that.$set(_that.form,'streetName',clientResponse.data.streetName)
      _that.$set(_that.form,'postalCode',clientResponse.data.postalCode)
      _that.$set(_that.form,'town',clientResponse.data.town)
      _that.$set(_that.form,'country',clientResponse.data.country)
      _that.$set(_that.form,'companyName',clientResponse.data.companyName)
      }

            // use/access the results
            console.log(clientResponse, companyListResponse);
          })
        )
        .catch((errors) => {
          // react on errors.
          console.error(errors);
        });
    } else {
      let _that = this
      let token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios
      .get("/api/showAllCompanies")
      .then(function (response) {
        console.log(response);
        _that.companyList = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  methods: {
    submit(){
      const _that =this
      let token = localStorage.getItem('token')
      // let createClient = {'clientName':_that.form.firstname,'industry':_that.form.lastname,'contactNo':_that.form.postcode}
      let createClient = {'firstName':_that.form.firstName,'lastName':_that.form.lastName,'email':_that.form.email,
        'streetName':_that.form.streetName,'postalCode':_that.form.postalCode,'town':_that.form.town,'country':_that.form.country,
        'companyName':_that.companyList[_that.form.companyName].companyName, 'companyId':_that.companyList[_that.form.companyName].companyId}
      axios.defaults.headers.common['Authorization'] = "Bearer "+token
      let url = '/api/registerClient'
      let clientFlag = localStorage.getItem('clientChangeFlag')
      if (clientFlag != '-1'){
        url = '/api/updateClient'
        createClient.clientId = clientFlag
        createClient.id = _that.form.id
      }
      console.log(createClient)
      axios.post(url,createClient).then(function (response){
        console.log(response)
        if (response.status == 201 || response.status == 200){
          alert("Client Register Success");
          _that.$router.push({path: "/clientsList"});
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
