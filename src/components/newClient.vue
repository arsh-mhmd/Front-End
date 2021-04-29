<template>
  <div>
    <el-card>
      <div class="login_box">
      <h1>Invoice Management System</h1>
        <el-form
          ref="formRef"
          label-width="200"
          class="login_form"
          :model="form"
        >
          <el-form-item label="Name" prop="name">
            <el-input
              placeholder="name"
              v-model="form.name"
            ></el-input>
          </el-form-item>
          <h5>Address information</h5>
          <el-form-item label="Room number" prop="num">
            <el-input
              placeholder="room number"
              v-model="form.num"
            ></el-input>
          </el-form-item>
           <el-form-item label="Street" prop="street">
            <el-input
              placeholder="street"
              v-model="form.street"
            ></el-input>
          </el-form-item>
          <el-form-item label="Postcode" prop="postcode">
            <el-input
              placeholder="postcode"
              v-model="form.postcode"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit" type="primary" round>Submit</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <el-row>
        <el-col :span="12">
           <div class="box">
             <h1>Register a new client:</h1>
             <el-button>Name</el-button>
             <el-button>Industry</el-button>
           </div>
        </el-col>
        <el-col :span="12">
           <div class="box">
             <h1>Select existing client:</h1>
             <el-button>Client's Name</el-button>
           </div>
        </el-col>
      </el-row> -->
    </el-card>
  </div>
</template>

<script>
import { formatDate } from "@/plugins/date.js";
import qs from 'qs';
export default {
  data() {
    return {
      form: {},
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  created() {

  },
  methods: {
    submit(){
      
    },
  },
};
</script>

<style lang="less" scoped>
  .box{

  }
</style>
