<template>
  <div>
    <el-card>
      <el-table :data="rightsList" stripe fit>
        <el-table-column label="payment time" prop="createdDate"></el-table-column>
        <el-table-column label="invoice id" prop="invoiceId"></el-table-column>
        <el-table-column label="client id" prop="clientId"></el-table-column>
        <el-table-column label="paid" prop="paid"></el-table-column>
        <div slot="empty" class="emptyBg">
          <p>No data</p>
        </div>
      </el-table>

    </el-card>
  </div>
</template>

<script>
import { formatDate } from "@/plugins/date.js";
import qs from "qs";
import axios from "axios";
export default {
  data() {
    return {
      rightsList: [],
      templateSelection: {},
      radio: "",
      keyword: "",
      itemwindowvisible:false,
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
    let token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios
      .get("/api/getPaymentRecord")
      .then(function (response) {
        console.log(response);
        _that.rightsList = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {

  },
};
</script>

<style lang="less" scoped>
/deep/ .el-input-group {
  width: 350px;
}
.mt30 {
  margin-top: 30px;
}
.searchBox {
  float: right;
  /deep/ .el-input__inner {
    width: 320px;
  }
  .el-button {
    background: #1890ff;
    color: #fff;
  }
}
.modifyBtn {
  color: #ff012d;
}
/deep/ .el-dialog {
  .el-select {
    width: 100%;
  }
}
.table-footer {
  text-align: center;
}
.top {
  margin-bottom: 20px;
}
</style>
