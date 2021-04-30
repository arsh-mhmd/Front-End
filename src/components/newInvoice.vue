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
          <el-row>
            <el-col :span='12'>
              <el-form-item label="Date" prop="date">
                <el-date-picker
                  v-model="form.date"
                  type="date"
                  placeholder="Date">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="Due Date" prop="dueDate">
                <el-date-picker
                  v-model="form.dueDate"
                  type="date"
                  placeholder="Due Date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="Number" prop="num">
            <el-input
              placeholder="Number"
              v-model="form.num"
            ></el-input>
          </el-form-item>
          <el-form-item label="Ref" prop="ref">
            <el-input
              placeholder="Ref"
              v-model="form.ref"
            ></el-input>
          </el-form-item>
          <el-form-item label="To" prop="to">
            <el-input
              placeholder="To"
              v-model="form.to"
            ></el-input>
          </el-form-item>
          <el-form-item label="Paid" prop="paid">
            <el-input
              placeholder="Paid"
              v-model="form.paid"
            ></el-input>
          </el-form-item>
          <el-form-item label="Due" prop="due">
            <el-input
              placeholder="Due"
              v-model="form.due"
            ></el-input>
          </el-form-item>
          <el-form-item label="Status" prop="status">
            <el-input
              placeholder="Status"
              v-model="form.status"
            ></el-input>
          </el-form-item>
          <el-form-item label="Sent" prop="sent">
            <el-input
              placeholder="Sent"
              v-model="form.sent"
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
