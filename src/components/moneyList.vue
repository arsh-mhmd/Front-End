<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="12">
           <div ref="myChart" style="height:300px;width:100%"></div>
        </el-col>
        <el-col :span="12">
           <div ref="myChart1" style="height:300px;width:100%"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
           <div ref="myChart2" style="height:300px;width:100%"></div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import { formatDate } from "@/plugins/date.js";
import qs from 'qs';
export default {
  data() {
    return {

    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  created() {
    let tokenitem = localStorage.getItem('token')
    console.log(tokenitem)
    let useritem = localStorage.getItem('loginUser')
    console.log(useritem)
    if(tokenitem == null){
      this.$router.push({path: "/login"});
    } else {
      this.$nextTick(() => {
        this.drawLine1();
        this.drawLine2();
        this.drawLine3();
      });
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
      let myChart = this.$echarts.init(this.$refs.myChart);
      myChart.setOption({
        title: { text: "Total sum of money in and out" },
        tooltip: {},
        xAxis: {
          data: ["Mar", "Apr", "May", "Total"]
        },
        yAxis: {},
        series: [
          {
            name: "",
            type: "bar",
            data: [5, 20, 36, 51]
          }
        ]
      });
    },
    drawLine2() {
      let myChart = this.$echarts.init(this.$refs.myChart1);
      myChart.setOption({
        title: { text: "Bills you need to pay" },
        tooltip: {},
        xAxis: {
          data: ["Older", "Fed", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Future"]
        },
        yAxis: {},
        series: [
          {
            name: "",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20,5, 20, 36, 10, 10, 20]
          }
        ]
      });
    },
    drawLine3() {
      let myChart = this.$echarts.init(this.$refs.myChart2);
      myChart.setOption({
        title: { text: "Invoices owed to you" },
        tooltip: {},
        xAxis: {
           data: ["Older", "Fed", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Future"]
        },
        yAxis: {},
        series: [
          {
            name: "",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20,5, 20, 36, 10, 10, 20]
          }
        ]
      });
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
</style>
