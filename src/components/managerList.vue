<template>
  <div>
    <el-card>
      <div class="top">
        <el-button @click="goNewManager" type="primary" v-bind:disabled="deleteable">New Manager</el-button>
        <el-button @click="deleteManager" type="primary" v-bind:disabled="deleteable"
          >Delete Manager</el-button
        >
      
      </div>

      <el-table :data="rightsList" stripe fit>
        <el-table-column label="Selection" align="center" width="100">
          <template scope="scope">
            <el-radio
              :label="scope.$index + 1"
              v-model="radio"
              @change.native="getCurrentRow(scope.row)"
            ></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="FirstName" prop="firstName"></el-table-column>
        <el-table-column label="LastName" prop="lastName"></el-table-column>
        <el-table-column label="Email" prop="email"></el-table-column>
        <el-table-column label="UserName" prop="userName"></el-table-column>
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
import swal from 'sweetalert';
export default {
  data() {
    return {
      rightsList: [],
      templateSelection: {},
      radio: "",
      keyword: "",
      deleteable: true,
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
    let role = localStorage.getItem("role");
    
    let token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    axios
      .get("/api/managerSpace/getUserProfile?userName=" +
          localStorage.getItem("loginUser")
      )
      .then(function (response) {
        console.log(response);
        role = response.data.role;
        if (role == 0) {
      _that.deleteable = false;
    }
      })
      
    
    // _that.deleteable = false;

    axios
      .get("/api/ownerMod/getManagers")
      .then(function (response) {
        console.log(response);
        _that.rightsList = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    getCurrentRow(row) {
      this.templateSelection = row;
      console.log(row);
      console.log(this.radio);
    },
    goNewManager() {
      this.$router.push({ path: "/newManager" });
    },
    deleteManager() {
      console.log(this.templateSelection.id);
      let _that = this;
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const deleteRequest = axios.delete(
        "/api/ownerMod/removeInvoiceUserById?id=" + this.templateSelection.id
      );
      const fetchRequest = axios.get("/api/ownerMod/getManagers");

      axios
        .all([deleteRequest, fetchRequest])
        .then(
          axios.spread((...responses) => {
            const deleteResponse = responses[0];
            const fetchResponse = responses[1];
            _that.rightsList = [];
            _that.rightsList = fetchResponse.data;
            swal("Manager Account Removed");
            // use/access the results
            console.log(deleteResponse, fetchResponse);
          })
        )
        .catch((errors) => {
          // react on errors.
          swal("Manager Account Removal Failed, Retry!");
          console.error(errors);
        });
    },
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
