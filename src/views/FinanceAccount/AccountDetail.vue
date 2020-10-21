<template>
    <div class="detail-account">
        <h4>财务账户详情</h4>
        <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
        <div class="content_box">
            <div class="content-item">
                    <span class="content-title">操作人员姓名：</span>
                    <p>{{tableData.name}}</p>
            </div>
            <div class="content-item">
                    <span class="content-title">操作人员手机号：</span>
                    <p>{{tableData.phone}}</p>
            </div>
            <div class="content-item">
                    <span class="content-title">登录账户：</span>
                    <p>{{tableData.account}}</p>
            </div>
            <div class="content-item">
                    <span class="content-title">登录密码：</span>
                    <p>******</p>
            </div>
            <div class="content-item">
                <el-form-item label="管理项目：" prop="projects_details" style="width:456px;" label-width='121px' >
                    <el-checkbox-group v-model="ruleForm.projects_details">
                        <el-checkbox :label="item.label" v-for="item in projects_details" :key="item.id" checked disabled="true">{{item.label}}</el-checkbox>
                    </el-checkbox-group>
          </el-form-item>
            </div>
            <div class="btn">
                <el-button type="primary" class="btnEdit" @click="edit(tableData.employee_id)">编辑</el-button>
                <el-button  @click="goBack()">返回上一页</el-button>
            </div>
        </div>
      </el-form>
  </div>
</template>

<script>
    import {DetailFinance} from '@/api/financeAccount'
    export default {
        data () {
            return {
                ruleForm: {
                    projects_details: []
                },
                id: this.$route.query.id,        // 账户id
                tableData: {},
                projects_details: []            // 管理项目
            }
        },
        methods: {
            //编辑
            edit(id) {
                this.$router.push({
                    path: '/finance-account/edit-account/',
                    query: {
                        id
                    }
                })
            },
            //返回
            goBack () {
                this.$router.push('/finance-account/index')
            },
            // 项目详情
            getData() {
                this.$http(DetailFinance, {
                        employee_id: this.id
                }).then(res => {
                    if(res.data.code == 200){
                        this.tableData = res.data.data
                        let projects_details = this.tableData.projects_details
                        this.projects_details = []
                        if(projects_details && projects_details.length > 0){
                          projects_details.map((item) => {
                            this.projects_details.push({
                              label: item.name,
                              id: item.id,
                              is_use: item.is_use
                            });
                          });
                        }
                    }
                })
            }
        },
        created() {
            this.getData() 
        }
    }
</script>

<style lang="scss" scoped>
/deep/ .el-menu.el-menu--horizontal{
    border-bottom: 0;
  }
/deep/ .el-menu-item{
  font-size: 20px;
}
/deep/ .el-form-item__label{
    text-align: left;
    color: #666666;
    font-weight: normal;
}
.detail-account{
     h4{
        font-size:20px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(51,51,51,1); 
        margin-left: 20px;
        margin-top:20px;
  }
    .content_box {
        width: 600px;
        padding-left:20px;
        .content-item {
            margin-top: 43px;
            display: flex;
            .content-title {
                width: 188px;
                text-align: left;
                color: #666666;
                font-size: 14px;
            }
            p {
                padding-left: 30px;
                width: 470px;
                color: #111111;
                font-size: 14px;
                span {
                    color: #3A62D7;
                    cursor: pointer;
                    text-decoration: underline;
                    margin-left: 50px;
                }
            }
        }
        .btn {
            margin-top: 148px;
            display: flex;
            justify-content: flex-start ;
            .btnEdit{
                margin-right: 50px;
            }
        }
    }
}

</style>