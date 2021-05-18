<template>
  <div>
    <el-card>
      <div class="top">
        <el-button @click="handleNewInvoice()" type="primary"
          >New Invoice</el-button
        >
        <el-button @click="getPDF()" type="primary">Get PDF</el-button>
        <el-button @click="sendEmail()" type="primary">Send E-mail</el-button>
        <el-button
          @click="deleteInvoice()"
          type="primary"
          v-bind:disabled="deleteable"
          >Delete</el-button
        >
        <el-button @click="payInvoice()" type="primary">Pay</el-button>
        <el-button @click="editInvoice()" type="primary">Edit</el-button>
      </div>

      <el-tabs v-model="activeName">
        <el-tab-pane label="All" name="first">
          <el-button @click="showAllInovice()" type="primary">Show</el-button>
          <el-table :data="invoiceList" stripe fit>
            <el-table-column label="Selection" align="center" width="100">
              <template scope="scope">
                <el-radio
                  :label="scope.$index + 1"
                  v-model="radio"
                  @change.native="getCurrentRow(scope.row)"
                ></el-radio>
              </template>
            </el-table-column>
            <el-table-column label="Number" prop="invoiceNo"></el-table-column>
            <el-table-column
              label="Ref"
              prop="address.shippingFirstName"
            ></el-table-column>
            <el-table-column
              label=""
              prop="address.shippingLastName"
            ></el-table-column>
            <el-table-column
              label="To"
              prop="address.billingFirstName"
            ></el-table-column>
            <el-table-column
              label=""
              prop="address.billingLastName"
            ></el-table-column>
            <el-table-column label="Date" prop="invoiceDate"></el-table-column>
            <el-table-column label="Due Date" prop="dueDate"></el-table-column>
            <el-table-column label="Paid" prop="paidAmount"></el-table-column>
            <el-table-column label="Due" prop="dueAmount"></el-table-column>
            <el-table-column label="Status" prop="status"></el-table-column>
            <div slot="empty" class="emptyBg">
              <p>No data</p>
            </div>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Show by Status" name="second">
          <el-select
            v-model="searchStatus"
            placeholder="Status"
            style="width: 200px"
          >
            <el-option
              v-for="item in paymentStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button @click="searchBystatus()" type="primary">Search</el-button>
          <el-table :data="invoiceList" stripe fit>
            <el-table-column label="Selection" align="center" width="100">
              <template scope="scope">
                <el-radio
                  :label="scope.$index + 1"
                  v-model="radio"
                  @change.native="getCurrentRow(scope.row)"
                ></el-radio>
              </template>
            </el-table-column>
            <el-table-column label="Number" prop="invoiceNo"></el-table-column>
            <el-table-column
              label="Ref"
              prop="address.shippingFirstName"
            ></el-table-column>
            <el-table-column
              label=""
              prop="address.shippingLastName"
            ></el-table-column>
            <el-table-column
              label="To"
              prop="address.billingFirstName"
            ></el-table-column>
            <el-table-column
              label=""
              prop="address.billingLastName"
            ></el-table-column>
            <el-table-column label="Date" prop="invoiceDate"></el-table-column>
            <el-table-column label="Due Date" prop="dueDate"></el-table-column>
            <el-table-column label="Paid" prop="paidAmount"></el-table-column>
            <el-table-column label="Due" prop="dueAmount"></el-table-column>
            <el-table-column label="Status" prop="status"></el-table-column>
            <div slot="empty" class="emptyBg">
              <p>No data</p>
            </div>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Show by Client ID" name="third">
          <el-input
            class="searchBox"
            placeholder="Search"
            v-model="searchname"
            style="width: 200px"
          >
          </el-input>
          <el-button @click="searchByname()" type="primary">Search</el-button>
          <el-table :data="invoiceList" stripe fit>
            <el-table-column label="Selection" align="center" width="100">
              <template scope="scope">
                <el-radio
                  :label="scope.$index + 1"
                  v-model="radio"
                  @change.native="getCurrentRow(scope.row)"
                ></el-radio>
              </template>
            </el-table-column>
            <el-table-column label="Number" prop="invoiceNo"></el-table-column>
            <el-table-column
              label="Ref"
              prop="address.shippingFirstName"
            ></el-table-column>
            <el-table-column
              label=""
              prop="address.shippingLastName"
            ></el-table-column>
            <el-table-column
              label="To"
              prop="address.billingFirstName"
            ></el-table-column>
            <el-table-column
              label=""
              prop="address.billingLastName"
            ></el-table-column>
            <el-table-column label="Date" prop="invoiceDate"></el-table-column>
            <el-table-column label="Due Date" prop="dueDate"></el-table-column>
            <el-table-column label="Paid" prop="paidAmount"></el-table-column>
            <el-table-column label="Due" prop="dueAmount"></el-table-column>
            <el-table-column label="Status" prop="status"></el-table-column>
            <div slot="empty" class="emptyBg">
              <p>No data</p>
            </div>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Show by Time" name="fourth">
          <el-date-picker v-model="searchdateS" type="date" placeholder="From">
          </el-date-picker>
          <el-date-picker v-model="searchdateE" type="date" placeholder="To">
          </el-date-picker>
          <el-button @click="searchBydata()" type="primary">Search</el-button>
          <!--            <el-button slot="append" icon="el-icon-search"></el-button>-->
          <el-table :data="invoiceList" stripe fit>
            <el-table-column label="Selection" align="center" width="100">
              <template scope="scope">
                <el-radio
                  :label="scope.$index + 1"
                  v-model="radio"
                  @change.native="getCurrentRow(scope.row)"
                ></el-radio>
              </template>
            </el-table-column>
            <el-table-column label="Number" prop="invoiceNo"></el-table-column>
            <el-table-column
              label="Ref"
              prop="address.shippingFirstName"
            ></el-table-column>
            <el-table-column
              label=""
              prop="address.shippingLastName"
            ></el-table-column>
            <el-table-column
              label="To"
              prop="address.billingFirstName"
            ></el-table-column>
            <el-table-column
              label=""
              prop="address.billingLastName"
            ></el-table-column>
            <el-table-column label="Date" prop="invoiceDate"></el-table-column>
            <el-table-column label="Due Date" prop="dueDate"></el-table-column>
            <el-table-column label="Paid" prop="paidAmount"></el-table-column>
            <el-table-column label="Due" prop="dueAmount"></el-table-column>
            <el-table-column label="Status" prop="status"></el-table-column>
            <div slot="empty" class="emptyBg">
              <p>No data</p>
            </div>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!--    dialog-->
    <el-dialog
      title="Send E-mail"
      :visible.sync="emailwindowvisible"
      width="800px"
    >
      <title>Send E-mail</title>
      <el-row>
        <template>
          <el-radio-group v-model="mailmode">
            <el-radio :label="1">Send Now</el-radio>
            <el-radio :label="2">Send Every Month</el-radio>
            <el-radio :label="3">Send Days BY Due</el-radio>
          </el-radio-group>
        </template>
        <el-input
          placeholder="How Manys days by Due"
          v-model="mailsenddate"
          style="width: 150px; margin: 50px"
        ></el-input>
      </el-row>
      <el-button @click="confirmemail()" type="primary" plain
        >Confirm</el-button
      >
      <el-button @click="emailwindowvisible = false" type="primary" plain
        >Cancel</el-button
      >
    </el-dialog>

    <el-dialog
      title="Pay by cash"
      :visible.sync="paywindowvisible"
      width="800px"
    >
      <title>Pay by cash</title>
      <el-row>
        <label>payment:</label>
        <el-input
          placeholder="how many pounds"
          v-model="payAmount"
          style="width: 160px; margin: 50px"
        ></el-input>
      </el-row>

      <el-button @click="confirmPay()" type="primary" plain
      >Confirm</el-button
      >
      <el-button @click="paywindowvisible = false" type="primary" plain
      >Cancel</el-button
      >
    </el-dialog>
    <!--    dialog-->
  </div>
</template>

<script>
import { formatDate } from "@/plugins/date.js";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      activeName: "first",
      invoiceList: [
        {
          number: 111,
          ref: "RGB-White",
          to: "Boom FM",
          date: "2021-04-26",
          dueDate: "2021-04-26",
          paid: "0.00",
          due: "550.00",
          status: "Draft",
          sent: "",
        },
        {
          number: 111,
          ref: "RGB-White",
          to: "Boom FM",
          date: "2021-04-26",
          dueDate: "2021-04-26",
          paid: "0.00",
          due: "550.00",
          status: "Draft",
          sent: "",
        },
      ],
      keyword: "",
      templateSelection: {
        id: -1,
      },
      radio: "",
      tableData: [],
      paymentStatus: [
        {
          value:'Awaiting payment',
          label:'Awaiting payment'
        },
        {
          value:'Partly Paid',
          label:'Partly Paid'
        },
        {
          value:'Paid',
          label:'Paid'
        },
        {
          value:'Draft',
          label:'Draft'
        }
      ],
      searchStatus: "",
      searchname: "",
      searchdateS: "",
      searchdateE: "",
      emailwindowvisible: false,
      paywindowvisible: false,
      mailmode: "",
      mailsenddate: "",
      payAmount: "",
      deleteable: false,
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy/MM/dd");
    },
  },
  created() {
    let _that = this;
    let role = localStorage.getItem("role");
    if (role != 0) {
      _that.deleteable = true;
    }
    localStorage.setItem("invoiceChangeFlag", "-1");
    console.log(_that.deleteable);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axios
      .get("/api/getAllInvoices")
      .then(function (response) {
        if (JSON.stringify(response) !== "{}") {
          //localStorage.setItem("allInvoiceList",JSON.stringify(response.data))
          //console.log(response.data)
          _that.invoiceList = response.data;
        }
      })
      .catch(function (error) {
        alert("Connect Fail");
      });
  },
  methods: {
    showAllInovice(){
      let _that = this;
      let role = localStorage.getItem("role");
      if (role != 0) {
        _that.deleteable = true;
      }
      localStorage.setItem("invoiceChangeFlag", "-1");
      console.log(_that.deleteable);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .get("/api/getAllInvoices")
        .then(function (response) {
          if (JSON.stringify(response) !== "{}") {
            //localStorage.setItem("allInvoiceList",JSON.stringify(response.data))
            //console.log(response.data)
            _that.invoiceList = response.data;
          }
        })
        .catch(function (error) {
          alert("Connect Fail");
        });
    },
    searchBystatus() {
      let _that = this
      let url = "/api/ownerMod/createReportByStatus?status="+_that.searchStatus
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .get(url)
        .then(function (response) {
          if (JSON.stringify(response) !== "{}") {
            //localStorage.setItem("allInvoiceList",JSON.stringify(response.data))
            //console.log(response.data)
            _that.invoiceList = response.data;
            console.log("Get Invoive by Status");
          }
        })
        .catch(function (error) {
          alert("Connect Fail");
        });
    },
    searchByname() {
      let _that = this
      let url = "/api/ownerMod/createReportByClientId?id="+_that.searchname
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .get(url)
        .then(function (response) {
          if (JSON.stringify(response) !== "{}") {
            //localStorage.setItem("allInvoiceList",JSON.stringify(response.data))
            //console.log(response.data)
            _that.invoiceList = response.data;
            console.log("Get Invoive by Name");
          }
        })
        .catch(function (error) {
          alert("Connect Fail");
        });
    },
    searchBydata() {
      let _that = this
      let filter = _that.$options.filters['formatDate']
      let url = "/api/ownerMod/createReportByDate?date="+filter(_that.searchdateS)
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .get(url)
        .then(function (response) {
          if (JSON.stringify(response) !== "{}") {
            //localStorage.setItem("allInvoiceList",JSON.stringify(response.data))
            //console.log(response.data)
            _that.invoiceList = response.data;
            console.log("Get Invoive by Name");
          }
        })
        .catch(function (error) {
          alert("Connect Fail");
        });
    },
    deleteInvoice() {
      let _that = this;
      if (_that.templateSelection.id == -1) {
        alert("Please select an invoice");
        return;
      }
      let url = "/api/ownerMod/removeInvoice?id="+_that.templateSelection.id
      console.log(url)
      let token = localStorage.getItem('token')
      axios.defaults.headers.common['Authorization'] = "Bearer "+token
      axios.delete(url).then(function (response){
        console.log(response)
        alert("Delete Success");
        axios.get('/api/getAllInvoices').then(function (response){
          console.log(response)
          _that.invoiceList = response.data;
        }).catch(function (error){
          alert("Connect Fail");
          console.log(error)
        })
      }).catch(function (error){
        alert("Connect Fail");
        console.log(error)
      })
    },
    editInvoice() {
      let _that = this;
      if (_that.templateSelection.id == -1) {
        alert("Please select an invoice");
        return;
      }
      localStorage.setItem(
        "invoiceChangeFlag",
        _that.templateSelection.id
      );
      // localStorage.setItem('invoiceChangeFlag','2')
      _that.$router.push({ path: "/newInvoice" });
    },


    confirmPay(){
      let _that = this;
      _that.paywindowvisible = false;
      console.log(this.templateSelection.invoiceNo);
      if (this.payAmount ==""){
        alert("please input the money client paid")
        return
      }
      axios.defaults.headers.common["Authorization"] =
        "Bearer "+localStorage.getItem('token');
      axios
        .get("/api/payDirectly?invoiceId="+this.templateSelection.invoiceNo+"&paid="+this.payAmount)

        .then((response) => {
          alert("paid successfully!");
        });
    },

    //This is the sending email button, selected invoice information can be found in this.templateSelection
    confirmemail() {
      let _that = this;
      _that.emailwindowvisible = false;
      if (this.mailmode ==1){
        axios.defaults.headers.common["Authorization"] =
          "Bearer "+localStorage.getItem('token');
        axios
          .get("/api/sendInvoiceNow?invoiceId="+this.templateSelection.invoiceNo)

          .then((response) => {
            alert("Send Email Success!");
          });
      }else if(this.mailmode==2){
        let ob = {}
        ob.invoiceId = this.templateSelection.invoiceNo
        ob.type = 0
        axios.defaults.headers.common["Authorization"] =
          "Bearer "+localStorage.getItem('token');
        axios
          .post("/api/addNewTimer",ob)

          .then((response) => {
            alert("Set monthly email success!");
          });

      }else if(this.mailmode ==3){
        if (this.mailsenddate =="" ){
          alert("please input due day!")
          return
        }

        let ob = {}
        ob.invoiceId = this.templateSelection.invoiceNo
        ob.type = 1
        ob.dueDay = this.mailsenddate
        axios.defaults.headers.common["Authorization"] =
          "Bearer "+localStorage.getItem('token');
        axios
          .post("/api/addNewTimer",ob)

          .then((response) => {
            alert("Set due email task success!");
          });
      }
    },
    handleNewInvoice() {
      this.$router.push({ path: "/newInvoice" });
    },
    getCurrentRow(row) {
      this.templateSelection = row;
    },
    handleSend() {
      console.log(this.templateSelection);
      this.$message({
        message: "Sent successfully",
        type: "success",
      });
    },
    getPDF() {

      let _that = this;
      if (_that.templateSelection.id == -1) {
        alert("Please select an invoice");
        return;
      }
      else {
        axios.defaults.headers.common["Authorization"] =
        "Bearer "+localStorage.getItem('token');
      console.log(this.templateSelection.invoiceNo);
      axios
        .get("/api/report/generate?invoiceNo="+this.templateSelection.invoiceNo, { responseType: "blob" })

        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", this.templateSelection.invoiceNo+".pdf");
          document.body.appendChild(link);
          link.click();
        });
      }


    },

    sendEmail() {
      let _that = this;
      if (_that.templateSelection.id == -1) {
        alert("Please select an invoice");
        return;
      }
      _that.emailwindowvisible = true;
    },

    payInvoice() {
      let _that = this;
      if (_that.templateSelection.id == -1) {
        alert("Please select an invoice");
        return;
      }
      _that.paywindowvisible = true;
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
.el-button {
  background: #1890ff;
  color: #fff;
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
