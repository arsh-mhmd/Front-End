import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import MoneyList from "../components/moneyList.vue";
import ClientsList from "../components/clientsList.vue";
import NewClient from "../components/newClient.vue";
import NewInvoice from "../components/newInvoice.vue";
import InvoiceList from "../components/invoiceList.vue";
import ManagerList from "../components/managerList.vue";
import NewManager from "../components/newManager.vue";
import UserProfile from "../components/userProfile.vue";
import CompanyList from "../components/companyList.vue";
import NewCompany from "../components/newCompany.vue";
import QuoteList from "../components/quoteList.vue";
import NewQuote from "../components/newQuote.vue";
import Success from "../components/success.vue";
import Cancel from "../components/cancel.vue";
import ClientQuote from "../components/clientQuote.vue"

import ManagerPage from "../components/ManagerPage.vue";
import PaymentRecord from "@/components/PaymentRecord";

Vue.use(VueRouter);

const routes = [
  {
    name:'login',
    path: "/",
    redirect: "/login"
  },
  {
    name:'success',
    path: "/",
    redirect: "/success"
  },
  {
    name:'success',
    path: "/success",
    component: Success
  },
  {
    name:'cancel',
    path: "/cancel",
    component: Cancel
  },
  {
    name:'clientQuote',
    path: "/clientQuote",
    component: ClientQuote
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
      { path: "/managerList", component: ManagerList },
      { path: "/newManager", component: NewManager },
      { path: "/userProfile", component: UserProfile },
      { path: "/companyList", component: CompanyList },
      { path: "/newCompany", component: NewCompany },
      { path: "/quoteList", component: QuoteList },
      { path: "/newQuote", component: NewQuote },
      { path: "/paymentRecord", component: PaymentRecord },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
