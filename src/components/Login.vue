<template>
  <div class="login_container">
    <div class="login_box">
      <h1>Invoice Management System</h1>
      <el-form
        ref="loginFormRef"
        label-width="0"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <el-form-item prop="user">
          <el-input
            placeholder="username"
            prefix-icon="iconfont icon-user"
            v-model="loginForm.user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            placeholder="password"
            prefix-icon="iconfont icon-3702mima"
            show-password
            v-model="loginForm.pass"
          ></el-input>
        </el-form-item>
        <el-form-item prop="role">
          <el-select v-model="loginForm.role" placeholder="Role Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <i class="el-icon-warning mr10"></i>
          <span>Alrealy a member? Log in</span>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" round>GO</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
export default {
  data() {
    return {
      loginForm: {
        user: "",
        pass: "",
        role:''
      },
      role:null,
      options:[
        {
          value:'0',
          label:'Owner'
        },
        {
          value:'1',
          label:'Manager'
        },
        {
          value:'2',
          label:'Activate'
        }
      ],
      //login check rules
      loginFormRules: {      
        user : [
          { required: true, message: "Please input the username", trigger: "blur" },
        ],
        pass: [
          { required: true, message: "Please input the password", trigger: "blur" },
        ]
      },
    };
  },
  created(){
    
  },
  methods: {
    login(){
      this.$router.push({path: "/moneyList",query: {role: this.loginForm.role}});
    },
  }
};
</script>

<style lang="less" scoped>
h1{
  margin-top:60px;color:#fff;margin-bottom: 20px;
}
.login_container {
  height: 100%;
  width: 100%;
  position: fixed;
  background-image: url("../assets/picture/homePic/loginback.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.login_box {
  width: 550px;
  height: 555px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #00000080;
  color: #fff;
  text-align: center;
}
.mr10{
  margin-right: 10px;
}
.w400{
  width: 400px;
}
.login_form {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%);
  width: 80%;
  padding: 0 20px;
  box-sizing: border-box; 
}
/deep/ .el-select{
  width: 100%;
}
</style>
