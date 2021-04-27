<template>
  <el-container class="page_container">
    <!-- 头部 -->
    <el-header>
      <h1>Invoice Management System</h1>
      <el-button type="info" round @click="logout">Log out</el-button>
    </el-header>

    <!-- 左侧菜单栏，router=“true”开启菜单路由，按照index跳转，default-active属性用于接收高亮激活的index -->
    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#40beff"
          unique-opened
          router
          :default-active="$route.path"
        >
        <template  v-for="item in menuslist">
          <!-- 一级菜单,index必须是字符串，所以用一个加号转换成字符串，作为唯一标识 -->
          <el-submenu :index="item.id+''" :key="item.id">
            <template slot="title">
              <i :class="iconobj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单,index使跳转路由 -->
            <el-menu-item
              :index="'/'+subitem.path"
              v-for="subitem in item.children"
              :key="subitem.id"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </template>
        </el-menu>
      </el-aside>
      <!-- 内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      type:null,
      //左侧菜单数据
      menuslist: [
        {
          id: "101",
          authName: "Track your money",
          children: [
          { id: "01", authName: "Track your money", path: "moneyList" },
          ]
        },
        {
          id: "102",
          authName: "Manage clients",
          children: [
          { id: "01", authName: "Manage clients", path: "clientsList" },
          ]
        },
        {
          id: "103",
          authName: "Manage invoice",
          type:2,
          children: [
          { id: "01", authName: "Manage invoice", path: "invoiceList" },
          ]
        },
      ],
      iconobj: {
        "101": "iconfont icon-shangpin",
        "102": "iconfont icon-danju",
        "103": "iconfont icon-tijikongjian",
        "104": "iconfont icon-users",
        "105": "iconfont icon-baobiao",
        "106": "iconfont icon-danju",
      }
    };
  },
  created() {

  },
  methods: {
    logout() {
      this.$router.push("/login");
    },

  }
};
</script>

<style lang="less" scoped>
.page_container {
  height: 100%;
}
.el-header {
  background: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.el-aside {
  background: #545c64;

  .el-menu {
    border-right: none;
  }
}
.el-main {
  background: #eaedf1;
}
.iconfont {
  margin-right: 5px;
}
</style>