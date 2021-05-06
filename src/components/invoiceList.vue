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
        <el-button @click="editInvoice()" type="primary">Edit</el-button>
      </div>

      <el-tabs v-model="activeName">
        <el-tab-pane label="All" name="first">
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
              prop="address.shippingLastName"
            ></el-table-column>
            <el-table-column label="Date" prop="invoiceDate"></el-table-column>
            <el-table-column label="Due Date" prop="dueDate"></el-table-column>
            <el-table-column label="Paid" prop="paid"></el-table-column>
            <el-table-column label="Due" prop="due"></el-table-column>
            <el-table-column label="Status" prop="status"></el-table-column>
            <el-table-column label="Sent" prop="sent"></el-table-column>
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
              prop="address.shippingLastName"
            ></el-table-column>
            <el-table-column label="Date" prop="invoiceDate"></el-table-column>
            <el-table-column label="Due Date" prop="dueDate"></el-table-column>
            <el-table-column label="Paid" prop="paid"></el-table-column>
            <el-table-column label="Due" prop="due"></el-table-column>
            <el-table-column label="Status" prop="status"></el-table-column>
            <el-table-column label="Sent" prop="sent"></el-table-column>
            <div slot="empty" class="emptyBg">
              <p>No data</p>
            </div>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Show by Name" name="third">
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
              prop="address.shippingLastName"
            ></el-table-column>
            <el-table-column label="Date" prop="invoiceDate"></el-table-column>
            <el-table-column label="Due Date" prop="dueDate"></el-table-column>
            <el-table-column label="Paid" prop="paid"></el-table-column>
            <el-table-column label="Due" prop="due"></el-table-column>
            <el-table-column label="Status" prop="status"></el-table-column>
            <el-table-column label="Sent" prop="sent"></el-table-column>
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
              prop="address.shippingLastName"
            ></el-table-column>
            <el-table-column label="Date" prop="invoiceDate"></el-table-column>
            <el-table-column label="Due Date" prop="dueDate"></el-table-column>
            <el-table-column label="Paid" prop="paid"></el-table-column>
            <el-table-column label="Due" prop="due"></el-table-column>
            <el-table-column label="Status" prop="status"></el-table-column>
            <el-table-column label="Sent" prop="sent"></el-table-column>
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
        invoiceid: -1,
      },
      radio: "",
      tableData: [],
      paymentStatus: [
        {
          value: "0",
          label: "Paid",
        },
        {
          value: "1",
          label: "PartlyPaid",
        },
        {
          value: "2",
          label: "Unpaid",
        },
        {
          value: "3",
          label: "Draft",
        },
        {
          value: "4",
          label: "All",
        },
      ],
      searchStatus: "4",
      searchname: "",
      searchdateS: "",
      searchdateE: "",
      emailwindowvisible: false,
      mailmode: "",
      mailsenddate: "",
      deleteable: false,
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
    if (role != 0) {
      _that.deleteable = true;
    }
    localStorage.setItem("voiceChangeFlag", "-1");
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
      .catch(function (error) {});
  },
  methods: {
    search() {},
    searchBystatus() {},
    searchByname() {},
    searchBydata() {},
    deleteInvoice() {
      let role = localStorage.getItem("role");
      console.log(role);
    },
    editInvoice() {
      let _that = this;
      if (_that.templateSelection.invoiceid == -1) {
        alert("Please select an invoice");
        return;
      }
      localStorage.setItem(
        "voiceChangeFlag",
        _that.templateSelection.invoiceId
      );
      // localStorage.setItem('invoiceChangeFlag','2')
      _that.$router.push({ path: "/newInvoice" });
    },
    confirmemail() {
      let _that = this;
      console.log(_that.mailmode);
      console.log(_that.mailsenddate);
      _that.emailwindowvisible = false;
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
    },

    sendEmail() {
      let _that = this;
      _that.emailwindowvisible = true;
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
