<template>
  <div>
    <el-card>
      <div class="top">
        <el-button @click="goNewQuote" type="primary">Create Quote</el-button>
        <el-button @click="editQuote" type="primary">Edit Quote</el-button>
        <el-button @click="deleteQuote" type="primary"
          >Delete Quote</el-button
        >
        <!-- <el-input class="searchBox" placeholder="Search" v-model="keyword">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input> -->
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
        <el-table-column label="Client Name" prop="clientName"></el-table-column>
        <el-table-column label="Quote No" prop="quoteNo"></el-table-column>
        <el-table-column label="Quote Date" prop="quoteDate"></el-table-column>
        <el-table-column label="Status" prop="status"></el-table-column>
        <el-table-column
            fixed="right"
            label="Operation"
            width="300">
            <template slot-scope="scope">
              <el-button @click="createInvoice(scope.row, scope.$index)" type="primary" >Create Invoice</el-button>
              <el-button @click="sendMail(scope.row, scope.$index)" type="primary" >Send Quote</el-button>
            </template>
          </el-table-column>
        <div slot="empty" class="emptyBg">
          <p>No data</p>
        </div>
      </el-table>

      <!-- <el-dialog Title="Entity" :visible.sync="itemwindowvisible" width="1000px">
        <el-row>
          <el-col :span='8'>
            <el-form-item label="Due Date" prop="dueDate">
                <el-date-picker
                  v-model="form.dueDate"
                  type="date"
                  placeholder="Due Date"
                  format="dd-MM-yyyy"
                  value-format="dd-MM-yyyy">
                </el-date-picker>
              </el-form-item>
            </el-col>
        <el-button @click="updateDueDate()" type="primary" plain>Create</el-button>
          <el-button @click="itemwindowvisible = false" type="primary" plain>Cancel</el-button>
            
        
        </el-row>
      </el-dialog> -->

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
      radio: "",
      keyword: "",
      itemwindowvisible:false,
      templateSelection:{
        quoteNo:-1
      },
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
    localStorage.setItem('quoteChangeFlag','-1')
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios
      .get("/api/getAllQuotes")
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
    goNewQuote() {
      this.$router.push({ path: "/newQuote" });
    },
    editQuote(){
      let _that = this
      console.log(_that.templateSelection.quoteNo)
      if(_that.templateSelection.quoteNo == -1){
        // alert("Please select a client");
        swal("Please select a Quote");
        return
      }
      if(_that.templateSelection.status == "DRAFT" || _that.templateSelection.status == "DECLINED") {
      localStorage.setItem('quoteChangeFlag',_that.templateSelection.quoteNo)
      // localStorage.setItem('clientChangeFlag','10')
      _that.$router.push({path: "/newQuote"});
      } 
      if(_that.templateSelection.status == "ACCEPTED") {
        swal("Quote already Accepted by "+_that.templateSelection.clientName);
      }
    },
    deleteQuote() {
      console.log(this.templateSelection.id);
      swal("Do you really want to delete the quote?");
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

            // use/access the results
            console.log(deleteResponse, fetchResponse);
          })
        )
        .catch((errors) => {
          // react on errors.
          console.error(errors);
        });
    },
    createInvoice(row, index){
      // _that.itemwindowvisible = true
      if(row.status == "ACCEPTED") {
        row.status = "CREATED";
let _that = this
      let token = localStorage.getItem("token");
      let url = '/api/convertQuote'
      axios.post(url, row, {
        headers:{
          'Authorization':"Bearer " + token,
          'content-type': 'application/json'
        }
      }).then(function (response) {
        console.log(response)
        if (response.status == 201) {
          // alert("Create Invoice Success");
          swal("Invoice Created");
          console.log(response);
        } else {
          swal("Invoice Creation Failed, Retry!");
          console.log("Fail, Error: " + response.status);
        }
      })
      }
      if(row.status == "DRAFT") {
        swal("Send Quote to "+row.clientName+" for Verification");
      }
      if(row.status == "DECLINED") {
        swal("Quote declined by "+row.clientName);
      }
      if(row.status == "CREATED") {
        swal("Invoice already created to "+row.clientName);
      }
    },
    sendMail(row, index){
      // _that.itemwindowvisible = true
      if(row.status == "DRAFT") {
        let _that = this
      let token = localStorage.getItem("token");
      let url = '/api/sendQuoteNow?quoteNo='+row.quoteNo
      axios.get(url, {
        headers:{
          'Authorization':"Bearer " + token,
          'content-type': 'application/json'
        }
      }).then(function (response) {
        console.log(response)
        if (response.status == 201) {
          // alert("Create Invoice Success");
          swal("Quote Sent to "+response.data.clientName);
          console.log(response);
        } else {
          swal("Quote Sending Failed, Retry!");
          // alert("Fail, Error: " + response.status);
        }
      })
      }

      if(row.status == "ACCEPTED") {
        swal("Quote accepted by "+row.clientName);
      }

      if(row.status == "CREATED") {
        swal("Invoice already Created to this Quote");
      }

      if(row.status == "DECLINED") {
        swal("Quote declined by "+row.clientName);
      }
      
    },
    updateDueDate() {
      // let _that = this
      // let token = localStorage.getItem("token");
      // let url = '/api/convertQuote'
      // axios.post(url, row, {
      //   headers:{
      //     'Authorization':"Bearer " + token,
      //     'content-type': 'application/json'
      //   }
      // }).then(function (response) {
      //   console.log(response)
      //   if (response.status == 201) {
      //     alert("Create Invoice Success");
      //     console.log(response);
      //   } else {
      //     alert("Fail, Error: " + response.status);
      //   }
      // })
    },
    deleteEntity(index){
      let _that = this;
      // _that.entityList.splice(index, 1)
      // _that.totalMount = 0
      // _that.entityList.forEach((item)=>{
      //   _that.totalMount += item.price * item.quantity
      // })
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
