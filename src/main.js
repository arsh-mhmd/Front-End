import Vue from "vue";
import App from "./App.vue"; 
import router from "./router";
import "./plugins/element.js";
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
// import VueResource from 'vue-resource'
// Vue.use(VueResource)
// Import global styles
import "./assets/css/global.css";
import "./assets/css/common.css";
import "./assets/css/style.min.css";
import "./assets/css/hd.css";
//Import font and icons
import "./assets/fonts/iconfont.css";
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
import axios from "axios";
//Configure request root path
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : '';
//Set up a request interceptor before mounting to the prototype object, and use use to mount a callback function
//config is the request object
//Call this callback function before the request reaches the server to preprocess the headers
axios.interceptors.request.use(config => {
  config.headers['content-type'] = 'application/json';
  // config.headers.Authorization = window.sessionStorage.getItem("token");
  config.headers['system-token'] = window.sessionStorage.getItem("token");
  return config;
});
axios.interceptors.response.use(result => {
  console.log(result)
  if(result.data && result.data.code == 501) {
    return router.replace('/login')
  }
  return result;
});

//Mount the introduced axios to the prototype object of vue and configure axios globally
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
