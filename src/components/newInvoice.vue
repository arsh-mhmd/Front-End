<template>
  <div>
    <el-card>
      <div class="login_box">
      <h1>Creat Invoice</h1>
        <el-form
          ref="formRef"
          label-width="200"
          class="login_form"
          :model="form"
        >
          <!--client sletor-->
          <el-row>
            <el-col :span='9'>
              <el-form-item label="Billing">
                <el-select v-model="form.billing" placeholder="billing to">
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
                <el-select v-model="form.shipping" placeholder="shipping to">
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
              <el-button @click="newClient()">New Client</el-button>
            </el-col>
          </el-row>
          <!--selector-->
          <el-row>
            <el-col :span='9'>
              <el-form-item label="Date" prop="date">
                <el-date-picker
                  v-model="form.date"
                  type="date"
                  placeholder="Date">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span='9'>
              <el-form-item label="Due Date" prop="dueDate">
                <el-date-picker
                  v-model="form.dueDate"
                  type="date"
                  placeholder="Due Date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="CompanyName" prop="companyname">
            <el-input
              placeholder="CompanyName"
              v-model="form.companyname"
            ></el-input>
          </el-form-item>
          <el-form-item label="CompanyStreetName" prop="companystreetname">
            <el-input
              placeholder="CompanyStreetName"
              v-model="form.companystreetname"
            ></el-input>
          </el-form-item>
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
<!--          status-->
          <el-row>
              <el-col :span='6'>
                <el-form-item label="Status" prop="status">
                  <el-select v-model="form.status" prop="status" placeholder="Status" style="width: 200px">
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
            prop="productname"
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
            v-model="tempEntity.productname"
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
      paymentStatus:[
        {
          value:'0',
          label:'Paid'
        },
        {
          value:'1',
          label:'PartlyPaid'
        },
        {
          value:'2',
          label:'Unpaid'
        },
        {
          value:'3',
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
      entityList:[
        {
          productname:"apple",
          quantity:"2",
          price:"3"
        },
        {
          productname:"pen",
          quantity:"5",
          price:"1"
        }
      ],
      itemwindowvisible:false,
      newEntityFlag:false,
      tempEntity:{
        productname:"",
        quantity:"",
        price:"",
        index:""
      },
      totalMount:""
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  created() {
    let _that = this
    _that.totalMount = 0
    _that.entityList.forEach((item)=>{
      _that.totalMount += item.price * item.quantity
    })
    let token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = "Bearer "+token
    axios.get('/api/showAllClient').then(function (response){
      console.log(response)
      _that.clientList = response.data;
    }).catch(function (error){
      console.log(error)
    })
  },
  methods: {
    submit() {
      const _that = this
      let token = localStorage.getItem('token')
      let billindex = _that.form.billing
      let shipindex = _that.form.shipping
      let newInvoice = {
        "invoiceDate": _that.form.date,
        "dueDate": _that.form.dueDate,
        "userId": "qwerty",
        "companyName": _that.form.companyname,
        "companyStreetName": _that.form.companystreetname,
        "companyPostalCode": _that.form.companypostalcode,
        "companyTown": _that.form.companytown,
        "companyCountry": _that.form.companycountry,
        "status": _that.form.status,
        "address": {
          "billingFirstName": _that.clientList[billindex].firstName,
          "billingLastName": _that.clientList[billindex].lastName,
          "billingStreetName": _that.clientList[billindex].streetName,
          "billingPostalCode": _that.clientList[billindex].postalCode,
          "billingTown": _that.clientList[billindex].town,
          "billingCountry": _that.clientList[billindex].country,
          "shippingFirstName": _that.clientList[shipindex].firstName,
          "shippingLastName": _that.clientList[shipindex].lastName,
          "shippingStreetName": _that.clientList[shipindex].streetName,
          "shippingPostalCode": _that.clientList[shipindex].postalCode,
          "shippingTown": _that.clientList[shipindex].town,
          "shippingCountry": _that.clientList[shipindex].country,
          "salesTax": _that.form.salestax,
          "entries": _that.entityList
        }
      }
      console.log(newInvoice)
      axios.post('/api/createInvoice', newInvoice, {
        headers:{
          'Authorization':"Bearer " + token,
          'content-type': 'application/json'
        }
      }).then(function (response) {
        console.log(response)
        if (response.status == 201) {
          alert("Client Register Success");
          console.log(response);
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
    },
    newEntity(){
      let _that = this
      _that.tempEntity.productname = ""
      _that.tempEntity.quantity = ""
      _that.tempEntity.price = ""
      _that.tempEntity.index = ""
      _that.itemwindowvisible = true
      _that.newEntityFlag = true
    },
    modifyEntity(row, index){
      let _that = this
      _that.tempEntity.productname = row.productname
      _that.tempEntity.quantity = row.quantity
      _that.tempEntity.price = row.price
      _that.tempEntity.index = index
      _that.itemwindowvisible = true
      _that.newEntityFlag = false
    },
    confirmEntity(){
      let _that = this
      const newEneityItem = new Object()
      newEneityItem.productname = _that.tempEntity.productname
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
    newClient(){
      this.$router.push({path: "/ClientsList"});
    }
  },
};
</script>

<style lang="less" scoped>
  .box{

  }
</style>
