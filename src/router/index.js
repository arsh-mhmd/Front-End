import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import MoneyList from "../components/moneyList.vue";
import ClientsList from "../components/clientsList.vue";
import NewClient from "../components/newClient.vue";
import NewInvoice from "../components/newInvoice.vue";
import InvoiceList from "../components/invoiceList.vue";


import ManagerPage from "../components/ManagerPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    name:'login',
    path: "/",
    redirect: "/login"
  },

  {
    name:'login',
    path: "/login",
    component: Login
  },
  { path: "/register", component: Register },
  {
    path: "/managerpage",
    component: ManagerPage,
    redirect: "/home",
    children: [
      { path: "/moneyList", component: MoneyList },
      { path: "/clientsList", component: ClientsList },
      { path: "/newClient", component: NewClient },
      { path: "/newInvoice", component: NewInvoice },
      { path: "/invoiceList", component: InvoiceList },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
