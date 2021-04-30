<template>
  <div>
    <el-card>
      <div class="top">
        <el-button @click="goNewClient" type="primary">New Client</el-button>
        <el-input class="searchBox" placeholder="Search" v-model="keyword">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>

      <el-table :data="rightsList" stripe fit>
        <el-table-column label="Name" prop="clientName"></el-table-column>
        <el-table-column label="Room number" prop="industry"></el-table-column>
        <el-table-column label="industry" prop="industry"></el-table-column>
        <el-table-column label="contactNo" prop="contactNo"></el-table-column>
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
          clientName:'Tom',
          industry:'Boom FM',
          contactNo:'Draft',
        },
        {
          clientName:'Tom',
          industry:12,
          contactNo:'Boom FM',
        },
      ],
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
    let token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = "Bearer "+token
    axios.get('/api/showAllClient').then(function (response){
      console.log(response)
      _that.rightsList = response.data;
    }).catch(function (error){
      console.log(error)
    })
  },
  methods: {
    goNewClient(){
      this.$router.push({path: "/newClient"});
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
