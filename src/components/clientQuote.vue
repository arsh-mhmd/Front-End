<template>
  <div>
    <el-card>
      <div class="login_box">
      <h1>Quote</h1>
        <el-form
          ref="formRef"
          label-width="200"
          class="login_form"
          :model="form"
        >
          <!--client sletor-->
          <el-row>
            <el-col :span='9'>
              <el-form-item label="Customer" prop="client">
                <el-input
                :disabled="this.disabledField"
                  placeholder="client"
                  v-model="form.client"
                  style="width: 150px"
                ></el-input>
              </el-form-item> 
            </el-col>
            <el-col :span='9'>
              <el-form-item label="Shipping" prop="shippingClient">
                <el-input
                :disabled="this.disabledField"
                  placeholder="Shipping Client"
                  v-model="form.shippingClient"
                  style="width: 150px"
                ></el-input>
              </el-form-item> 
            </el-col>
          </el-row>
          <el-row>
             <el-col :span='9'>
              <el-form-item label="Date" prop="quoteDate">
                <el-date-picker
                :disabled="this.disabledField"
                  v-model="form.quoteDate"
                  type="date"
                  placeholder="Date"
                  format="dd-MM-yyyy"
                  value-format="dd-MM-yyyy">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!--selector-->
          <el-row>
            <el-col :span='9'>
              <el-form-item label="Shipping Date" prop="shippingDate">
                <el-date-picker
                :disabled="this.disabledField"
                  v-model="form.shippingDate"
                  type="date"
                  placeholder="Date"
                  format="dd-MM-yyyy"
                  value-format="dd-MM-yyyy">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span='9'>
              <el-form-item label="Expected Delivery Date" prop="expDeliveryDate">
                <el-date-picker
                :disabled="this.disabledField"
                  v-model="form.expDeliveryDate"
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
              <el-form-item label="SalesTax" prop="salesTax">
                <el-input
                :disabled="this.disabledField"
                  placeholder="SalesTax"
                  v-model="form.salesTax"
                  style="width: 150px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
<!--status-->
          <el-form-item label="Entity:">
            
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
        </el-table>
          <!-- <el-col :span='9'> -->
              <el-form-item label="">
                <el-button @click="accept()" type="primary" >Accept</el-button>
                <el-button @click="decline()" type="primary" >Decline</el-button>
              </el-form-item>  
            <!-- </el-col> -->


      <el-dialog Title="Entity" :visible.sync="itemwindowvisible"  class="success_dialog">
        
  
        <el-row>
          <el-col :span='16'>
            <el-form-item>
        <h4 align="centre">{{finishText}}</h4>
        </el-form-item>
          </el-col>
            </el-row>
        
        <el-row>
         
          <el-button @click=cancel() type="primary" plain style="align:center;">Close</el-button>
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
      finishText: "Response Recorded",
      disabledField: true,
      form: {},
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

    // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios
      .get("/api/approveQuote?quoteNo="+this.$route.query.quoteNo)
      .then(function (response) {
        console.log(response);
        // _that.companyList = response.data;
        _that.clientList = 
         _that.$set(_that.form, 'client', response.data.clientName)
         _that.$set(_that.form, 'shippingClient', response.data.shippingClientName)
         _that.$set(_that.form, 'quoteDate', response.data.quoteDate)
         _that.$set(_that.form, 'shippingDate', response.data.shippingDate)
         _that.$set(_that.form, 'expDeliveryDate', response.data.expDeliveryDate)
         _that.$set(_that.form, 'salesTax', response.data.salesTax)
         _that.$set(_that, 'entityList', response.data.quoteEntries)
      })
      .catch(function (error) {
        console.log(error);
      });


    // axios.get('/api/showAllClient').then(function (response){
    //   console.log(response)
    //   _that.clientList = response.data;
    // }).catch(function (error){
    //   alert("Connect Fail");
    //   console.log(error)
    // })

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
      let billindex = _that.form.billing
      let shipindex = _that.form.shipping
      let filter = _that.$options.filters['formatDate']
      console.log("Company")
      console.log(_that.form.companyName)
      console.log(_that.companyList)
      let newQuote = {
        "clientName": _that.clientList[_that.form.client].firstName + " " + _that.clientList[_that.form.client].lastName,
        "quoteDate": _that.form.quoteDate,
        "shippingDate": _that.form.shippingDate,
        "expDeliveryDate": _that.form.expDeliveryDate,
        "clientId": _that.clientList[_that.form.client].clientId,
        "salesTax": _that.form.salestax,
        "quoteEntries": _that.entityList
      }
      let invoiceFlag = localStorage.getItem('invoiceChangeFlag')
      let url = '/api/createQuote'
      if (invoiceFlag != '-1'){
        newInvoice.id = invoiceFlag
        newInvoice.invoiceNo = _that.form.invoiceNo
        url = '/api/updateInvoice'
      }
      console.log("Submit: ")
      console.log(newQuote)
      axios.post(url, newQuote, {
        headers:{
          'Authorization':"Bearer " + token,
          'content-type': 'application/json'
        }
      }).then(function (response) {
        console.log(response)
        if (response.status == 201) {
          alert("Create Quote Success");
          console.log(response);
          _that.$router.push({path: "/QuoteList"});
        } else {
          alert("Fail, Error: " + response.status);
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    accept() {
      let _that = this
      _that.newEntityFlag = true
    _that.itemwindowvisible = true


      axios
      .get("/api/acceptQuote?quoteNo="+this.$route.query.quoteNo)
      .then(function (response) {
        console.log(response);
        // _that.companyList = response.data;
        
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    decline() {
      let _that = this
      _that.newEntityFlag = true
    _that.itemwindowvisible = true
      axios
      .get("/api/declineQuote?quoteNo="+this.$route.query.quoteNo)
      .then(function (response) {
        console.log(response);
        // _that.companyList = response.data;
        
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    cancel(){
      let _that = this
      _that.itemwindowvisible = false
      let getWindow = window.open('', '_self');
      getWindow.close();
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

axios.get('/api/selectClient?clientId='+_that.clientList[_that.form.client].clientId).then(function(response){
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

  .success_dialog {
    background-color: #00000080;
    width : 600px ;
    height: 500px;
    align-content: center;
    position: absolute;
  top: 20%;
  left: 35%;
  }
  
</style>
