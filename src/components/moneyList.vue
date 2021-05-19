<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="12">
           <div ref="myChart" style="height:600px;width:100%"></div>
        </el-col>
        <el-col :span="12">
           <div ref="myChart1" style="height:600px;width:100%"></div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import { formatDate } from "@/plugins/date.js";
import qs from 'qs';
import axios from "axios";
import swal from "sweetalert";
export default {
  data() {
    return {
      amountMoney:'',
      paidMoney:'',
      unpaidMoney:'',
      amountInvoices:'',
      unpaidInvoices:'',
      halfPaidInvoices:'',
      paidInvoices:''
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
    let tokenitem = localStorage.getItem('token')
    console.log(tokenitem)
    let useritem = localStorage.getItem('loginUser')
    console.log(useritem)
    if(tokenitem == null){
      this.$router.push({path: "/login"});
    } else {
      axios.defaults.headers.common['Authorization'] = "Bearer "+tokenitem
      axios.get('/api/dashBoard').then(function (response){
        console.log("Get Dashbaord")
        console.log(response)
        let dashparas = response.data.split(',')
        _that.amountMoney = dashparas[0]
        _that.paidMoney = dashparas[1]
        _that.unpaidMoney = dashparas[2]
        _that.amountInvoices = dashparas[3]
        _that.unpaidInvoices = dashparas[4]
        _that.halfPaidInvoices = dashparas[5]
        _that.paidInvoices = dashparas[6]
        _that.drawLine1();
        _that.drawLine2();
      }).catch(function (error){
        // alert("Connect Fail");
        swal("Connection Failure")
        console.log(error)
      })
    }
  },
  mounted(){
    // this.$nextTick(() => {
    //   this.drawLine1();
    //   this.drawLine2();
    //   this.drawLine3();
    // });
  },
   methods: {
    drawLine1() {
      let _that = this;
      let myChart = this.$echarts.init(this.$refs.myChart);
      myChart.setOption({
        title: { text: "Inovice Amount Summary" },
        tooltip: {},
        xAxis: {
          data: ["Totol", "unPaid", "Partly Paid", "Paid"]
        },
        yAxis: {},
        series: [
          {
            name: "",
            type: "bar",
            data: [_that.amountInvoices, _that.unpaidInvoices, _that.halfPaidInvoices, _that.paidInvoices]
          }
        ]
      });
    },
    drawLine2() {
      let _that = this;
      let myChart = this.$echarts.init(this.$refs.myChart1);
      myChart.setOption({
        title: { text: "Money Amount Summary" },
        tooltip: {},
        xAxis: {
          data: ["Total", "unPaid", "Paid"]
        },
        yAxis: {},
        series: [
          {
            name: "",
            type: "bar",
            data: [_that.amountMoney, _that.unpaidMoney,  _that.paidMoney]
          }
        ]
      });
    }
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
</style>
