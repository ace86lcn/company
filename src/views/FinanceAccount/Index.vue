<template>
  <div class=" financial">
    <div class="btn"><el-button type="primary" @click="$router.push('/finance-account/add-account')">新增账号</el-button></div>
    <el-table :data="tableData" border style="width: 100%;margin-top:20px;">
      <el-table-column fixed prop="name" label="姓名" width="200"></el-table-column>
      <el-table-column prop="account" label="登录账号" width="300"></el-table-column>
      <el-table-column prop="phone" label="登录手机号" width="300"></el-table-column>
      <el-table-column prop="project_text" label="管理项目" width="410"></el-table-column>
      <el-table-column fixed="right" label="操作" width="400">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row.employee_id)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDetail(scope.row.employee_id)" type="text" size="small">详情</el-button>
          <el-button type="text" size="small" @click="del(scope.row.employee_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pages :page.sync="page" :total="total">
    </pages>
    <!-- 删除弹出层 -->
    <el-dialog :visible.sync="dialogVisible" width="30%"  >
        <p class="titles">温馨提示</p>
      <div class="spans">删除后将不能恢复，确认删除？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelDetail">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetFinance, DeleteFinance} from '@/api/financeAccount'
import Pages from '../../components/Pages'
export default {
  components: {
    Pages
  },
  data() {
    return {
      title: '温馨提示',          // 弹出层提示
      show: false,               // 弹出层是否显示
      dialogVisible: false,
      tableData: [],
      page: 1,                  // 当前页数
      total: 0,                 // 数据总数
      id: '',                   // id
      detailId: '',             // 详情id
      rows: []
    }
  },
  watch: {
    'page'(val) {
      this.getList()
    }
  },
  methods: {
    handleClose() {
        this.dialogVisible = false
    },
    del(id) {
      this.dialogVisible = true;
      this.detailId = id
    },
    // 获取列表数据
    getList() {
        this.$http(GetFinance, {page: this.page})
        .then(res=> {
            if(res.data.code == 200) {
                this.tableData = res.data.data.data
                this.total = res.data.data.total
            }
        })
    },
    //编辑
    handleEdit(id) {
        this.$router.push({
					 path: '/finance-account/edit-account',
					 query: {
						 id
						 },
					 })
    },
    //详情
    handleDetail(id) {
       this.$router.push({
					 path: '/finance-account/account-detail',
					 query: {
						 id
						 },
					 })
    },
    //删除
    handelDetail(index, id) {
      this.$http(DeleteFinance, {
          employee_id: this.detailId
      })
        .then(res => {
          if(res.data.code == 200){
           this.$msg.Success('删除成功！')
            this.dialogVisible = false
            this.getList()
          }
        })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.financial {
  .btn {
    float: right;
    margin-bottom: 20px;
  }
  .titles{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 25px;
    color: #333333;
  }
  .spans{
    font-size: 18px;
    font-weight: bold;
    color: #666666;
    line-height: 26px;
    text-align: center;
    display: block;
  }
  /deep/ .el-dialog__header {
    background-color: #4066FF !important;
    color: #000;
    height:20px !important;
    .el-dialog__title {
      color: #fff !important;
    }
    .el-dialog__headerbtn {
        margin-top:5px;
    }
    .el-dialog__close el-icon el-icon-close::before,
    .el-dialog__close el-icon el-icon-close::after {
      content: "" !important;
    }
    
  }
  .el-table_label{
      font-size: 16px;
      font-weight:bold;
  }
  .el-form-item__label::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
  .p-title {
    font-size: 16px !important;
    margin-top: -25px;
    line-height: 50px;
  }
}
/deep/ .cell {
  text-align: center !important;
}
/deep/ .el-dialog__footer{
       text-align: center !important;
    }
</style>