<template>
  <div>
    <el-card>
      <div class="top">
        <el-button @click="goNewClient" type="primary">New Client</el-button>
        <el-button @click="editClient" type="primary">Edit Client</el-button>
        <el-button @click="deleteClient" type="primary">Delete Client</el-button>
        <el-input class="searchBox" placeholder="Search" v-model="keyword">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>

      <el-table :data="rightsList" stripe fit>
        <el-table-column label="Selection" align="center" width="100">
          <template scope="scope">
            <el-radio :label="scope.$index+1" v-model="radio"
                      @change.native="getCurrentRow(scope.row)"></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="ClientId" prop="id"></el-table-column>
        <el-table-column label="FirstName" prop="firstName"></el-table-column>
        <el-table-column label="LastName" prop="lastName"></el-table-column>
<!--        <el-table-column label="Company Name" prop="companyName"></el-table-column>-->
        <el-table-column label="Email" prop="email"></el-table-column>
        <el-table-column label="StreetName" prop="streetName"></el-table-column>
        <el-table-column label="PostalCode" prop="postalCode"></el-table-column>
        <el-table-column label="Town" prop="town"></el-table-column>
        <el-table-column label="Country" prop="country"></el-table-column>
        <div slot="empty" class="emptyBg">
          <p>No data</p>
        </div>
      </el-table>

    </el-card>
  </div>
</template>

<script>
import { formatDate } from "@/plugins/date.js";
import qs from 'qs';
import axios from "axios";
export default {
  data() {
    return {
      rightsList:[
        {
          firstName: "John",
          lastName: "Smith",
          email:'sdfsd@435.com',
          streetName: "2 Court Square",
          postalCode: "NY 12210",
          town: "New York",
          country: "USA",
          id:1
        },
        {
          firstName: "222",
          lastName: "333",
          email:'sdfsd@435.com',
          streetName: "456 Square",
          postalCode: "NK 34534",
          town: "England",
          country: "OK",
          id: 2
        },
      ],
      templateSelection:{
        clientid:-1
      },
      radio:'',
      keyword:''
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
    localStorage.setItem('clientChangeFlag','-1')
    let token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = "Bearer "+token
    axios.get('/api/showAllClient').then(function (response){
      console.log(response)
      _that.rightsList = response.data;
    }).catch(function (error){
      alert("Connect Fail");
      console.log(error)
    })
  },
  methods: {
    getCurrentRow(row){
      this.templateSelection = row
      console.log(row)
      console.log(this.radio)
    },
    goNewClient(){
      this.$router.push({path: "/newClient"});
    },
    editClient(){
      let _that = this
      console.log(_that.templateSelection.clientid)
      if(_that.templateSelection.clientid == -1){
        alert("Please select a client");
        return
      }
      localStorage.setItem('clientChangeFlag',_that.templateSelection.clientId)
      // localStorage.setItem('clientChangeFlag','10')
      _that.$router.push({path: "/newClient"});
    },
    deleteClient(){
      let _that = this;
      if(_that.templateSelection.clientid == -1){
        alert("Please select a client");
        return
      }
      let url = "/api/removeClient?clientId="+_that.templateSelection.clientId
      console.log(url)
      let token = localStorage.getItem('token')
      axios.defaults.headers.common['Authorization'] = "Bearer "+token
      axios.delete(url).then(function (response){
        console.log(response)
        alert("Delete Success");
        axios.get('/api/showAllClient').then(function (response){
          console.log(response)
          _that.rightsList = response.data;
        }).catch(function (error){
          alert("Connect Fail");
          console.log(error)
        })
      }).catch(function (error){
        alert("Connect Fail");
        console.log(error)
      })
    },
  },
};
</script>

<style lang="less" scoped>
  /deep/ .el-input-group{
      width: 350px;
    }
    .mt30{
      margin-top: 30px;
    }
  .searchBox{
    float: right;
    /deep/ .el-input__inner{
      width: 320px;
    }
    .el-button{
      background: #1890FF;
      color:#fff;
    }
  }
    .modifyBtn{
      color:#FF012D;
    }
  /deep/ .el-dialog{
    .el-select{
      width: 100%;
    }
  }
  .table-footer{
    text-align: center;
  }
  .top{
    margin-bottom: 20px;
  }
</style>
