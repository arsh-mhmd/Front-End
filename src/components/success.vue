<template>
  <div class="login_container">
    <div class="login_box">
      <h1>Payment Success</h1>

    </div>
  </div>
</template>

<script>
import qs from 'qs';
import axios from "axios";
export default {
  data() {
    return {
      loginForm: {
        user: "",
        pass: "",
        role:''
      },
      role:null,
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

      const _that =this
      //this is for register
      let auth_url =  "/api/oauth/token?grant_type=password&username="+_that.loginForm.user+"&password="+_that.loginForm.pass
      axios.defaults.headers.common['Authorization'] = "Basic Zm9vQ2xpZW50SWQ6c2VjcmV0"
      axios.post(auth_url).then(function (response){
        let token = response.data['access_token']
        localStorage.setItem('token',token)
        localStorage.setItem('loginUser',_that.loginForm.user)
        localStorage.setItem('role',response.role)
        console.log("This is a "+ response.role)
        // request register interface
      }).catch(function (error){
        alert("Connect Fail");
        console.log(error)
      })
      this.$router.push({path: "/moneyList",query: {role: this.loginForm.role}});
    },
    goRegister(){
      this.$router.push({path: "/register"});
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
