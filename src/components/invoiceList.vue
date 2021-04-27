<template>
  <div>
    <el-card>
      <div class="top">
        <el-button type="primary">New Invoice</el-button>
        <el-button type="primary">New Credit Note</el-button>
        <el-button type="primary">Send Statements</el-button>
        <el-button type="primary">Import</el-button>
        <el-button type="primary">Export</el-button>
        <el-button type="primary" plain>Invoice reminders off</el-button>
        <el-input class="searchBox" placeholder="Search" v-model="keyword">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
     
      <el-tabs v-model="activeName">
        <el-tab-pane label="All" name="first">
          <el-table :data="rightsList1" stripe fit>
            <el-table-column label="Number" prop="number"></el-table-column>
            <el-table-column label="Ref" prop="ref"></el-table-column>
            <el-table-column label="To" prop="to"></el-table-column>
            <el-table-column label="Date" prop="date"></el-table-column>
            <el-table-column label="Due Date" prop="dueDate"></el-table-column>
            <el-table-column label="Paid" prop="paid"></el-table-column>
            <el-table-column label="Due" prop="due"></el-table-column>
            <el-table-column label="Status" prop="status"></el-table-column>
            <el-table-column label="Sent" prop="sent"></el-table-column>
            <div slot="empty" class="emptyBg">
              <p>No data</p>
            </div>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Draft" name="second">
          <el-table :data="rightsList2" stripe fit>
            <el-table-column label="Number" prop="number"></el-table-column>
            <el-table-column label="Ref" prop="ref"></el-table-column>
            <el-table-column label="To" prop="to"></el-table-column>
            <el-table-column label="Date" prop="date"></el-table-column>
            <el-table-column label="Due Date" prop="dueDate"></el-table-column>
            <el-table-column label="Paid" prop="paid"></el-table-column>
            <el-table-column label="Due" prop="due"></el-table-column>
            <el-table-column label="Status" prop="status"></el-table-column>
            <el-table-column label="Sent" prop="sent"></el-table-column>
            <div slot="empty" class="emptyBg">
              <p>No data</p>
            </div>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Awaiting Approval" name="third">
          <el-table :data="rightsList3" stripe fit>
            <el-table-column label="Number" prop="number"></el-table-column>
            <el-table-column label="Ref" prop="ref"></el-table-column>
            <el-table-column label="To" prop="to"></el-table-column>
            <el-table-column label="Date" prop="date"></el-table-column>
            <el-table-column label="Due Date" prop="dueDate"></el-table-column>
            <el-table-column label="Paid" prop="paid"></el-table-column>
            <el-table-column label="Due" prop="due"></el-table-column>
            <el-table-column label="Status" prop="status"></el-table-column>
            <el-table-column label="Sent" prop="sent"></el-table-column>
            <div slot="empty" class="emptyBg">
              <p>No data</p>
            </div>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Awaiting Payment" name="fourth">
          <el-table :data="rightsList4" stripe fit>
            <el-table-column label="Number" prop="number"></el-table-column>
            <el-table-column label="Ref" prop="ref"></el-table-column>
            <el-table-column label="To" prop="to"></el-table-column>
            <el-table-column label="Date" prop="date"></el-table-column>
            <el-table-column label="Due Date" prop="dueDate"></el-table-column>
            <el-table-column label="Paid" prop="paid"></el-table-column>
            <el-table-column label="Due" prop="due"></el-table-column>
            <el-table-column label="Status" prop="status"></el-table-column>
            <el-table-column label="Sent" prop="sent"></el-table-column>
            <div slot="empty" class="emptyBg">
              <p>No data</p>
            </div>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Paid" name="fived">
          <el-table :data="rightsList5" stripe fit>
            <el-table-column label="Number" prop="number"></el-table-column>
            <el-table-column label="Ref" prop="ref"></el-table-column>
            <el-table-column label="To" prop="to"></el-table-column>
            <el-table-column label="Date" prop="date"></el-table-column>
            <el-table-column label="Due Date" prop="dueDate"></el-table-column>
            <el-table-column label="Paid" prop="paid"></el-table-column>
            <el-table-column label="Due" prop="due"></el-table-column>
            <el-table-column label="Status" prop="status"></el-table-column>
            <el-table-column label="Sent" prop="sent"></el-table-column>
            <div slot="empty" class="emptyBg">
              <p>No data</p>
            </div>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Repeating" name="sixed">
          <el-table :data="rightsList6" stripe fit>
            <el-table-column label="Number" prop="number"></el-table-column>
            <el-table-column label="Ref" prop="ref"></el-table-column>
            <el-table-column label="To" prop="to"></el-table-column>
            <el-table-column label="Date" prop="date"></el-table-column>
            <el-table-column label="Due Date" prop="dueDate"></el-table-column>
            <el-table-column label="Paid" prop="paid"></el-table-column>
            <el-table-column label="Due" prop="due"></el-table-column>
            <el-table-column label="Status" prop="status"></el-table-column>
            <el-table-column label="Sent" prop="sent"></el-table-column>
            <div slot="empty" class="emptyBg">
              <p>No data</p>
            </div>
          </el-table>
        </el-tab-pane>
      </el-tabs>

    </el-card>
  </div>
</template>

<script>
import { formatDate } from "@/plugins/date.js";
import qs from 'qs';
export default {
  data() {
    return {
      activeName:'first',
      rightsList1:[
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        }
      ],
      rightsList2:[
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        }
      ],
      rightsList3:[
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        }
      ],
      rightsList4:[
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        }
      ],
      rightsList5:[
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        }
      ],
      rightsList6:[
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        },
        {
          number:111,
          ref:'RGB-White',
          to:'Boom FM',
          date:'2021-04-26',
          dueDate:'2021-04-26',
          paid:'0.00',
          due:'550.00',
          status:'Draft',
          sent:''
        }
      ],
      keyword:''
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
  },
};
</script>

<style lang="less" scoped>
  /deep/ .el-input-group{
      width: 350px;
    }
    .mt30{
      margin-top: 30px;
    }
  .searchBox{
    float: right;
    /deep/ .el-input__inner{
      width: 320px;
    }
    .el-button{
      background: #1890FF;
      color:#fff;
    }
  }
    .modifyBtn{
      color:#FF012D;
    }
  /deep/ .el-dialog{
    .el-select{
      width: 100%;
    }
  }
  .table-footer{
    text-align: center;
  }
  .top{
    margin-bottom: 20px;
  }
</style>
