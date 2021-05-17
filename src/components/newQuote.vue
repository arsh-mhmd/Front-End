<template>
  <div>
    <el-card>
      <div class="login_box">
      <h1>Create Quote</h1>
        <el-form
          ref="formRef"
          label-width="200"
          class="login_form"
          :model="form"
        >
          <!--client sletor-->
          <el-row>
            <el-col :span='6'>
              <el-form-item label="Select Client">
                <el-select v-model="form.client" placeholder="billing to" @change="handleBillingChange()">
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
              <el-form-item label="Shipping Client">
                <el-select v-model="form.shippingClient" placeholder="shipping to" @change="handleShippingChange()">
                  <el-option
                    v-for="(item, index) in clientList"
                    :key="index"
                    :label="item.firstName + ' ' + item.lastName"
                    :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='3'>
              <el-button @click="manageClient()">Manage Client</el-button>
            </el-col>
            <el-col :span='3'>
              <el-form-item>
                <el-input
                type="hidden"
                  v-model="form.clientId"
                  style="width: 150px"
                ></el-input>
              </el-form-item>
            </el-col>
            
            
            
            <el-col :span='3'>
              <el-form-item>
                <el-input
                type="hidden"
                  v-model="form.id"
                  style="width: 150px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
             <el-col :span='9'>
              <el-form-item label="Date" prop="quoteDate">
                <el-date-picker
                  v-model="form.quoteDate"
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
            <el-col :span='3'>
              <el-form-item>
                <el-input
                type="hidden"
                  v-model="form.quoteNo"
                  style="width: 150px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='3'>
              <el-form-item>
                <el-input
                type="hidden"
                  v-model="form.shippingClientId"
                  style="width: 150px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--selector-->
          <el-row>
            <el-col :span='9'>
              <el-form-item label="Shipping Date" prop="shippingDate">
                <el-date-picker
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
                  v-model="form.expDeliveryDate"
                  type="date"
                  placeholder="Due Date"
                  format="dd-MM-yyyy"
                  value-format="dd-MM-yyyy">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span='3'>
              <el-form-item>
                <el-input
                type="hidden"
                  v-model="form.status"
                  style="width: 150px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

<!--          status-->
          <el-row>
            <el-col :span='6'>
              <el-form-item label="SalesTax" prop="salesTax">
                <el-input
                  placeholder="SalesTax"
                  v-model="form.salesTax"
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
            <el-button @click="submit()" type="primary" >Create</el-button>
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
    let quoteFlag = localStorage.getItem('quoteChangeFlag')
    if (quoteFlag != '-1'){
      //get the client by key id
      let quoteNo = quoteFlag;
      let url = "/api/getQuote?quoteNo="+quoteNo
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");

      //const initRequest = axios.get(url);
      //const companyListRequest = axios.get("/api/getAllCompanies");

      axios
        .get(url)
        .then(function (response) {
          console.log("Get Quote");
          console.log(response);
          if (JSON.stringify(response) !== "{}") {
            _that.$set(_that.form, 'client', response.data.clientName)
            _that.$set(_that.form, 'shippingClient', response.data.shippingClientName)
            _that.$set(_that.form, 'quoteDate', response.data.quoteDate)
            _that.$set(_that.form, 'dueDate', response.data.dueDate)
            _that.$set(_that.form, 'shippingDate', response.data.shippingDate)
            _that.$set(_that.form, 'expDeliveryDate', response.data.expDeliveryDate)
            _that.$set(_that.form, 'salesTax', response.data.salesTax)
            _that.$set(_that, 'entityList', response.data.quoteEntries)
            _that.$set(_that.form, 'id', response.data.id)
            _that.$set(_that.form, 'clientId', response.data.clientId)
            _that.$set(_that.form, 'shippingClientId', response.data.shippingClientId)
             _that.$set(_that.form, 'quoteNo', response.data.quoteNo)
              _that.$set(_that.form, 'status', response.data.status)
             _that.totalMount = 0
            _that.entityList.forEach((item)=>{
              _that.totalMount += item.price * item.quantity
            })
          }

          // use/access the results
          console.log(clientResponse, companyListResponse);
             })

        .catch((errors) => {
          // react on errors.
          console.error(errors);
        });
    }
    else {

    

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
        "clientName": "",
        "shippingClientName": "",
        "quoteDate": "",
        "dueDate": "",
        "shippingDate": "",
        "expDeliveryDate": "",
        "clientId": "",
        "shippingClientId": "",
        "salesTax": "",
        "quoteEntries": "",
        "quoteNo":"",
        "id": "",
        "status": ""
      }

let url = '/api/createQuote'
if (quoteFlag != '-1'){
      url = '/api/updateQuote'
      newQuote = {
        "id": _that.form.id,
        "clientName": _that.form.client,
        "shippingClientName": _that.form.shippingClient,
        "quoteDate": _that.form.quoteDate,
        "dueDate": _that.form.dueDate,
        "shippingDate": _that.form.shippingDate,
        "expDeliveryDate": _that.form.expDeliveryDate,
        "clientId": _that.form.clientId,
        "shippingClientId": _that.form.shippingClientId,
        "salesTax": _that.form.salesTax,
        "quoteEntries": _that.entityList,
        "status": _that.form.status,
        "quoteNo": _that.form.quoteNo,
      }

} 
else {
newQuote = {
        "clientName": _that.clientList[_that.form.client].firstName + " " + _that.clientList[_that.form.client].lastName,
        "shippingClientName": _that.clientList[_that.form.shippingClient].firstName + " " + _that.clientList[_that.form.shippingClient].lastName,
        "quoteDate": _that.form.quoteDate,
        "dueDate": _that.form.dueDate,
        "shippingDate": _that.form.shippingDate,
        "expDeliveryDate": _that.form.expDeliveryDate,
        "clientId": _that.clientList[_that.form.client].clientId,
        "shippingClientId": _that.clientList[_that.form.shippingClient].clientId,
        "salesTax": _that.form.salesTax,
        "quoteEntries": _that.entityList
      }
}



      let quoteFlag = localStorage.getItem('quoteChangeFlag')
    
  
      // let quoteFlag = localStorage.getItem('quoteChangeFlag')
      
      // if (quoteFlag != '-1'){
      //   newQuote.id = quoteFlag
      //   newQuote.quoteNo = _that.form.quoteNo
      //   
      // }
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
          // alert("Create Quote Success");
          if (quoteFlag != '-1'){ 
            swal("Quote Updated");
          } else {
            swal("Quote Created");
          }
          
          
          console.log(response);
          _that.$router.push({path: "/QuoteList"});
        } else {
          swal("Create Quote Failed");
          console.log("Fail, Error: " + response.status);
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    cancel(){
      let _that = this
      console.log(_that.form.billing)
      console.log(_that.form.shipping)
      this.$router.push({path: "/quoteList"});
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

axios.get('/api/selectClient?clientId='+_that.clientList[_that.form.shippingClient].clientId).then(function(response){
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
