<template>
  <div>
    <el-card>
      <div class="login_box">
      <h1>Create Invoice</h1>
        <el-form
          ref="formRef"
          label-width="200"
          class="login_form"
          :model="form"
        >
          <!--client sletor-->
          <el-row>
            <el-col :span='6'>
          <el-form-item label="Company Name">
                <el-select v-model="form.companyName" placeholder="Company Name" @change="handleCompanyChange()">
                  <el-option
                    v-for="(item, index) in companyList"
                    :key="index"
                    :label="item.companyName"
                    :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='6'>
              <el-form-item label="CompanyStreetName" prop="companystreetname">
            <el-input
              placeholder="CompanyStreetName"
              v-model="form.companystreetname"
            ></el-input>
          </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='8'>
              <el-form-item label="CompanyPostalCode" prop="companypostalcode">
                <el-input
                  placeholder="CompanyPostalCode"
                  v-model="form.companypostalcode"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="CompanyTown" prop="companytown">
                <el-input
                  placeholder="CompanyTown"
                  v-model="form.companytown"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="CompanyCountry" prop="companycountry">
                <el-input
                  placeholder="CompanyCountry"
                  v-model="form.companycountry"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='9'>
              <el-form-item label="Billing">
                <el-select v-model="form.billing" placeholder="billing to" @change="handleBillingChange()">
                  <el-option
                    v-for="(item, index) in clientList"
                    :key="index"
                    :label="item.firstName + ' ' + item.lastName"
                    :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='9'>
              <el-form-item label="Shipping">
                <el-select v-model="form.shipping" placeholder="shipping to" @change="handleShippingChange()">
                  <el-option
                    v-for="(item, index) in clientList"
                    :key="index"
                    :label="item.firstName + ' ' + item.lastName"
                    :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='6'>
              <el-button @click="manageClient()">Manage Client</el-button>
            </el-col>
          </el-row>

         <el-row>
            <el-col :span='4'>
              <el-form-item label="Billing Street Name" prop="billingStreetName">
                <el-input
                  placeholder="Billing Street Name"
                  v-model="form.billingStreetName"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='4'>
              <el-form-item label="Billing Town" prop="billingTown">
                <el-input
                  placeholder="Billing Town"
                  v-model="form.billingTown"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='4'>
              <el-form-item label="Shipping Street Name" prop="shippingStreetName">
                <el-input
                  placeholder="Shipping Street Name"
                  v-model="form.shippingStreetName"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='4'>
              <el-form-item label="Shipping Town" prop="shippingTown">
                <el-input
                  placeholder="Shipping Town"
                  v-model="form.shippingTown"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span='4'>
              <el-form-item label="Billing Country" prop="billingCountry">
                <el-input
                  placeholder="Billing Country"
                  v-model="form.billingCountry"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='4'>
              <el-form-item label="Billing Postal Code" prop="billingPostalCode">
                <el-input
                  placeholder="Billing Postal Code"
                  v-model="form.billingPostalCode"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='4'>
              <el-form-item label="Shipping Country" prop="shippingCountry">
                <el-input
                  placeholder="Shipping Country"
                  v-model="form.shippingCountry"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='4'>
              <el-form-item label="Shipping Postal Code" prop="shippingPostalCode">
                <el-input
                  placeholder="Shipping Postal Code"
                  v-model="form.shippingPostalCode"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--selector-->
          <el-row>
            <el-col :span='9'>
              <el-form-item label="Date" prop="date">
                <el-date-picker
                  v-model="form.date"
                  type="date"
                  placeholder="Date"
                  format="dd-MM-yyyy"
                  value-format="dd-MM-yyyy">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span='9'>
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
          </el-row>

<!--          status-->
          <el-row>
              <el-col :span='6'>
                <el-form-item label="Status" prop="status">
                  <el-select v-model="form.status" disabled placeholder="Status" style="width: 200px" @change="handleselectchange()">
                    <el-option
                    v-for="item in paymentStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            <el-col :span='6'>
              <el-form-item label="How Much Paid" prop="paidmount">
                <el-input
                  disabled
                  placeholder="How Much Paid"
                  v-model="form.paid"
                  style="width: 150px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='6'>
              <el-form-item label="SalesTax" prop="salestax">
                <el-input
                  placeholder="SalesTax"
                  v-model="form.salestax"
                  style="width: 150px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='6'>
              <el-form-item label="Total Need to Pay">
                <span style="width: 150px">
                  {{totalMount}}
                </span>
              </el-form-item>
            </el-col>
          </el-row>
<!--status-->
          <el-form-item label="Entity:">
            <el-button @click="newEntity()" type="primary" >New Entity</el-button>
          </el-form-item>

        <el-table
          :data="entityList"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="productName"
            label="ProductName"
            width="150">
          </el-table-column>
          <el-table-column
            fixed
            prop="quantity"
            label="Quantity"
            width="150">
          </el-table-column>
          <el-table-column
            fixed
            prop="price"
            label="Price"
            width="150">
          </el-table-column>
          <el-table-column
            fixed
            label="Total"
            width="150">
            <template slot-scope="scope">
              {{scope.row.price*scope.row.quantity}}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="Operation"
            width="300">
            <template slot-scope="scope">
              <el-button @click="modifyEntity(scope.row, scope.$index)" type="primary" >Modify</el-button>
              <el-button @click="deleteEntity(scope.$index)" type="primary" >Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
          <el-form-item label="">
            <el-button @click="submit()" type="primary" >Submit</el-button>
            <el-button @click="cancel()" type="primary" >Cancel</el-button>
          </el-form-item>


      <el-dialog Title="Entity" :visible.sync="itemwindowvisible" width="1000px">
        <el-row>
          <el-col :span='8'>
        <el-form-item label="ProductName">
          <el-input
            placeholder="ProductName"
            v-model="tempEntity.productName"
            style="width: 200px"
          ></el-input>
        </el-form-item>
          </el-col>
          <el-col :span='8'>
        <el-form-item label="Quantity">
          <el-input
            placeholder="Quantity"
            v-model="tempEntity.quantity"
            style="width: 200px"
          ></el-input>
        </el-form-item>
          </el-col>
            <el-col :span='8'>
        <el-form-item label="Price">
          <el-input
            placeholder="Price"
            v-model="tempEntity.price"
            style="width: 200px"
          ></el-input>
        </el-form-item>
            </el-col>
        <el-button @click="confirmEntity()" type="primary" plain>Confirm</el-button>
          <el-button @click="itemwindowvisible = false" type="primary" plain>Cancel</el-button>
        </el-row>
      </el-dialog>
      </el-form>
      </div>
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
      form: {
        status: 'Awaiting payment',
        paid: 0
      },
      companyList:[],
      paymentStatus:[
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
      clientList:[
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
          id:2
        }
      ],
      entityList: [],
      itemwindowvisible:false,
      newEntityFlag:false,
      tempEntity:{
        productName:"",
        quantity:"",
        price:"",
        index:""
      },
      totalMount:"",
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "dd-MM-yyyy");
    }
  },
  created() {
    let _that = this
    let token = localStorage.getItem('token')

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


    axios.get('/api/showAllClient').then(function (response){
      console.log(response)
      _that.clientList = response.data;
    }).catch(function (error){
      alert("Connect Fail");
      console.log(error)
    })

    let invoiceFlag = localStorage.getItem('invoiceChangeFlag')
    if (invoiceFlag != '-1'){
      //get the client by key id
      let invoiceid = invoiceFlag;
      let url = "/api/getInvoice?id="+invoiceid
      let refilter = _that.$options.filters['reFormatDate']
      axios
        .get(url)
        .then(function (response) {
          console.log("Get Inovice");
          console.log(response);
          if (JSON.stringify(response) !== "{}") {
            console.log(response)
            _that.$set(_that.form, 'invoiceNo', response.data.invoiceNo)
            _that.$set(_that.form, 'date', response.data.invoiceDate)
            _that.$set(_that.form, 'dueDate', response.data.dueDate)
            _that.$set(_that.form,'clientId',response.data.clientId)
            _that.$set(_that.form, 'companyid', response.data.companyId)
            _that.$set(_that.form, 'companystreetname', response.data.companyStreetName)
            _that.$set(_that.form, 'companypostalcode', response.data.companyPostalCode)
            _that.$set(_that.form, 'companytown', response.data.companyTown)
            _that.$set(_that.form, 'companycountry', response.data.companyCountry)
            _that.$set(_that.form, 'companyName', response.data.companyName)
            _that.$set(_that.form, 'status', response.data.status)
            _that.$set(_that.form, 'createdBy', response.data.createdBy)
            _that.$set(_that.form, 'salestax', response.data.address.salesTax)
            _that.$set(_that.form, 'paid', response.data.paidAmount)
            _that.$set(_that, 'entityList', response.data.address.entries)

            _that.totalMount = 0
            _that.entityList.forEach((item)=>{
              _that.totalMount += item.price * item.quantity
            })


              _that.$set(_that.form,'billingFirstName',response.data.address.billingFirstName)
            _that.$set(_that.form,'billingLastName',response.data.address.billingLastName)
            _that.$set(_that.form,'billingStreetName',response.data.address.billingStreetName)
            _that.$set(_that.form,'billingTown',response.data.address.billingTown)
            _that.$set(_that.form,'billingCountry',response.data.address.billingCountry)
            _that.$set(_that.form,'billingPostalCode',response.data.address.billingPostalCode)

            _that.$set(_that.form,'shippingFirstName',response.data.address.shippingFirstName)
            _that.$set(_that.form,'shippingLastName',response.data.address.shippingLastName)
            _that.$set(_that.form,'shippingStreetName',response.data.address.shippingStreetName)
            _that.$set(_that.form,'shippingTown',response.data.address.shippingTown)
            _that.$set(_that.form,'shippingCountry',response.data.address.shippingCountry)
            _that.$set(_that.form,'shippingPostalCode',response.data.address.shippingPostalCode)

            _that.form.billing = response.data.address.billingFirstName + response.data.address.billingLastName
              _that.form.shipping = response.data.address.shippingFirstName + response.data.address.shippingLastName

            //_that.form.companyName = response.data.companyName

            console.log("Edit Inovice")
            console.log(_that.form)

            // axios
            //   .get('/api/findCompanyByCompanyId?companyId='+response.data.companyId)
            //   .then(
            //     (responses) => {
            //       const companyResponse = responses;
            //       console.log("Company Get");
            //       console.log(companyResponse);
            //       _that.$set(_that.form,'companystreetname',companyResponse.data.companyStreetName)
            //       _that.$set(_that.form,'companytown',companyResponse.data.companyTown)
            //       _that.$set(_that.form,'companycountry',companyResponse.data.companyCountry)
            //       _that.$set(_that.form,'companypostalcode',companyResponse.data.companyPostalCode)
            //       // use/access the results
            //     }
            //   )
            //   .catch((errors) => {
            //     // react on errors.
            //     console.error(errors);
            //   });
          }}).catch(function (error){
        alert("Connect Fail");
        console.log(error)
      })
    }
  },
  methods: {
    submit() {
      const _that = this
      let token = localStorage.getItem('token')
      let userid =  localStorage.getItem('loginUser')
      let billindex = _that.form.billing
      let shipindex = _that.form.shipping
      let filter = _that.$options.filters['formatDate']
      console.log("Company")
      console.log(_that.form.companyName)
      console.log(_that.companyList)
      let newInvoice = {
        "invoiceDate": _that.form.date,
        "dueDate": _that.form.dueDate,
        "clientId": _that.form.clientId,
        "companyId": _that.form.companyid,
        "companyName": _that.form.companyName,
        "companyStreetName": _that.form.companystreetname,
        "companyPostalCode": _that.form.companypostalcode,
        "companyTown": _that.form.companytown,
        "companyCountry": _that.form.companycountry,
        "dueAmount": _that.totalMount - _that.form.paid,
        "paidAmount": _that.form.paid,
        "status": _that.form.status,
        "createdBy": userid,
        "address": {
          "billingFirstName": _that.form.billingFirstName,
          "billingLastName": _that.form.billingLastName,
          "billingStreetName": _that.form.billingStreetName,
          "billingPostalCode": _that.form.billingPostalCode,
          "billingTown": _that.form.billingTown,
          "billingCountry": _that.form.billingCountry,
          // "billingid": _that.clientList[billindex].id,
          "shippingFirstName": _that.form.shippingFirstName,
          "shippingLastName": _that.form.shippingLastName,
          "shippingStreetName": _that.form.shippingStreetName,
          "shippingPostalCode": _that.form.shippingPostalCode,
          "shippingTown": _that.form.shippingTown,
          "shippingCountry": _that.form.shippingCountry,

          // "shippingid": _that.clientList[shipindex].id,
          "salesTax": _that.form.salestax,
          "entries": _that.entityList
        }
      }
      let invoiceFlag = localStorage.getItem('invoiceChangeFlag')
      let url = '/api/createInvoice'
      if (invoiceFlag != '-1'){
        newInvoice.id = invoiceFlag
        newInvoice.createdBy = _that.form.createdBy,
        newInvoice.invoiceNo = _that.form.invoiceNo
        url = '/api/updateInvoice'
      }
      console.log("Submit: ")
      console.log(newInvoice)
      axios.post(url, newInvoice, {
        headers:{
          'Authorization':"Bearer " + token,
          'content-type': 'application/json'
        }
      }).then(function (response) {
        console.log(response)
        if (response.status == 201) {
          alert("Create Invoice Success");
          console.log(response);
          _that.$router.push({path: "/InvoiceList"});
        } else {
          alert("Fail, Error: " + response.status);
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    cancel(){
      let _that = this
      console.log(_that.form.billing)
      console.log(_that.form.shipping)
      this.$router.push({path: "/invoiceList"});
    },
    handleCompanyChange(){
      let _that = this
      this.$forceUpdate()

      let token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = "Bearer "+token

    const clientRequest = axios.get(
        '/api/findClientByCompanyId?companyId='+_that.companyList[_that.form.companyName].companyId);
      const companyRequest = axios.get('/api/findCompanyByCompanyId?companyId='+_that.companyList[_that.form.companyName].companyId);

      axios
        .all([clientRequest, companyRequest])
        .then(
          axios.spread((...responses) => {
            const clientResponse = responses[0];
            const companyResponse = responses[1];
           //_that.clientList = []
            //_that.clientList = clientResponse.data;

            _that.$set(_that.form,'companyid',companyResponse.data.companyId)
            _that.$set(_that.form,'companyName',companyResponse.data.companyName)
            _that.$set(_that.form,'companystreetname',companyResponse.data.companyStreetName)
      _that.$set(_that.form,'companytown',companyResponse.data.companyTown)
      _that.$set(_that.form,'companycountry',companyResponse.data.companyCountry)
      _that.$set(_that.form,'companypostalcode',companyResponse.data.companyPostalCode)
            // use/access the results
            console.log(clientResponse, companyResponse);
          })
        )
        .catch((errors) => {
          // react on errors.
          console.error(errors);
        });
    },
    handleselectchange(){
      let _that = this
      this.$forceUpdate()
      console.log(_that.form.billing)
      console.log(_that.form.shipping)
    },
    handleBillingChange(){
      let _that = this
      this.$forceUpdate()
    let token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = "Bearer "+token

axios.get('/api/selectClient?clientId='+_that.clientList[_that.form.billing].clientId).then(function(response){
        console.log(response)
  _that.$set(_that.form,'clientId',response.data.clientId)
  _that.$set(_that.form,'billingFirstName',response.data.firstName)
  _that.$set(_that.form,'billingLastName',response.data.lastName)
        _that.$set(_that.form,'billingStreetName',response.data.streetName)
      _that.$set(_that.form,'billingTown',response.data.town)
      _that.$set(_that.form,'billingCountry',response.data.country)
      _that.$set(_that.form,'billingPostalCode',response.data.postalCode)
      }).catch(function (error){
        console.log(error)
      })

    },
    handleShippingChange(){
      let _that = this
      this.$forceUpdate()
    let token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = "Bearer "+token

axios.get('/api/selectClient?clientId='+_that.clientList[_that.form.shipping].clientId).then(function(response){
        console.log(response)
  _that.$set(_that.form,'shippingFirstName',response.data.firstName)
  _that.$set(_that.form,'shippingLastName',response.data.lastName)
        _that.$set(_that.form,'shippingStreetName',response.data.streetName)
      _that.$set(_that.form,'shippingTown',response.data.town)
      _that.$set(_that.form,'shippingCountry',response.data.country)
      _that.$set(_that.form,'shippingPostalCode',response.data.postalCode)
      }).catch(function (error){
        console.log(error)
      })

    },
    newEntity(){
      let _that = this
      _that.tempEntity.productName = ""
      _that.tempEntity.quantity = ""
      _that.tempEntity.price = ""
      _that.tempEntity.index = ""
      _that.itemwindowvisible = true
      _that.newEntityFlag = true
    },
    modifyEntity(row, index){
      let _that = this
      _that.tempEntity.productName = row.productName
      _that.tempEntity.quantity = row.quantity
      _that.tempEntity.price = row.price
      _that.tempEntity.index = index
      _that.itemwindowvisible = true
      _that.newEntityFlag = false
    },
    confirmEntity(){
      let _that = this
      const newEneityItem = new Object()
      newEneityItem.productName = _that.tempEntity.productName
      newEneityItem.quantity = _that.tempEntity.quantity
      newEneityItem.price = _that.tempEntity.price
      if(_that.newEntityFlag == true){
        _that.entityList.push(newEneityItem)
      } else {
        _that.entityList.splice(_that.tempEntity.index, 1, newEneityItem)
      }
      _that.totalMount = 0
      _that.entityList.forEach((item)=>{
        _that.totalMount += item.price * item.quantity
      })
      _that.itemwindowvisible = false
    },
    deleteEntity(index){
      let _that = this;
      _that.entityList.splice(index, 1)
      _that.totalMount = 0
      _that.entityList.forEach((item)=>{
        _that.totalMount += item.price * item.quantity
      })
    },
    manageClient(){
      this.$router.push({path: "/ClientsList"});
    }
  },
};
</script>

<style lang="less" scoped>
  .box{

  }
</style>
