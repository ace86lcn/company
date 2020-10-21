<template>
    <div class="add-account">
    <h4 v-if="!id">新增财务账户</h4>
    <h4 v-if="id">编辑财务账户</h4>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
     
      <div class="content_box">
        <div class="left">
          <el-form-item label="操作人员姓名：" prop="name" style="width:456px;" label-width='121px'>
            <el-input  v-model="ruleForm.name" placeholder="请输入操作人员姓名"></el-input>
          </el-form-item>
          <div class="box">
            <el-form-item label="操作人员手机号：" prop="phone" style="width:470px;" label-width='135px' class="phone">
                <el-input  v-model="ruleForm.phone" placeholder="请输入操作人员手机号" class="ident" style="margin-left:15px;" @blur="phoneHandel()"></el-input>
            </el-form-item>
            <div class="codeBtn" v-if="!id">
                <el-button type="primary" @click="code()" v-if="!count" style="background:#4066FF; color:#fff; margin-left:80px;margin-top:5px;">获取验证码</el-button>
                <el-button type="primary" @click="code()" v-if="count" style="background:#C0CBF9; color:#fff; margin-left:80px;margin-top:5px;">{{timer}}</el-button>
            </div>
           
          </div>
          <el-form-item label="验证码：" prop="code" v-if="!id" style="width:456px;" label-width='121px'>
            <el-input v-model="ruleForm.code" placeholder="请输入验证码" ></el-input>
          </el-form-item>
          <div class="box">
            <el-form-item label="登录账户：" prop="account" style="width:456px;" label-width='121px'>
                <el-input v-model="ruleForm.account" placeholder="请输入登录账户" maxlength="10" @blur="accountHandel()"></el-input>
            </el-form-item>
            <span style="margin-left:80px;margin-top:15px; color:#999999;font-size:14px;" v-if="!id">支持数字、英文，5-10以内</span>
          </div>
          <div class="box">
            <el-form-item label="登录密码：" prop="password" style="width:456px;" label-width='121px' v-if="!id">
                <el-input v-model="ruleForm.password" placeholder="请输入登录密码" maxlength="15"  @blur="passwordHandel()"></el-input>
            </el-form-item>
            <el-form-item label="登录密码："  style="width:456px;" label-width='121px' v-if="id">
                <el-input v-model="ruleForm.password" placeholder="请输入登录密码" maxlength="15"  @blur="passwordHandel()"></el-input>
            </el-form-item>
            <span style="margin-left:80px;margin-top:15px; color:#999999;font-size:14px;">支持数字、英文区分大小写，6-15以内</span>
          </div>
          <el-form-item label="管理项目：" prop="projects" style="width:456px;" label-width='121px'>
            <el-checkbox-group v-model="ruleForm.projects" style="margin-left:27px;">
                  <el-checkbox :label="item.id" v-for="item in projects" :key="item.id" :disabled="item.is_use === 1 ? true : false" >{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item class="btn" style="margin-left:-100px;">
            <el-button type="primary" @click="save('ruleForm')" class="save"  style="margin-right:50px;">保存</el-button>
            <el-button  @click="dialogVisible1 = true">返回上一页</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <!-- 保存弹窗 -->
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <p class="titles">温馨提示</p>
      <div class="spans" v-if="!id">确认新增财务账号？</div>
      <div class="spans" v-if="id">确认保存更改内容？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelDetail">确 认</el-button>
      </div>
    </el-dialog>
    <!-- 返回弹窗 -->
    <el-dialog  :visible.sync="dialogVisible1" width="30%">
      <p class="titles">温馨提示</p>
      <div class="spans">返回上一页将不保存本页数据，确认返回？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="handelBack">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import {GetCode, AddSave, GetProjects, DetailFinance, UpdateSave, CodeUserInfo} from '@/api/financeAccount'
    export default {
        data () {
            let checkPhone = (rule, value, callback) => {
                    if(!value) {
                        return callback(new Error('请输入操作人员手机号'))
                    } else {
                         const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                         if(reg.test(value)) {
                             callback()
                         } else {
                             return callback(new Error('手机号格式不正确'));
                         }
                    }
                };
            return {
                ruleForm: {
                    projects: []
                },
                projects: [],                 // 项目
                tableData: {},
                dialogVisible: false,
                dialogVisible1: false,
                timer: 60,                   // 定时器
                timer_out: '',
                count: false,                // 是否开启定时器
                model: {},
                id: this.$route.query.id,
                is_use: '',                 // 当前项目是否被使用
                rules: {
                    name: [
                    { required: true, message: "请输入操作人员姓名", trigger: "blur" },
                    ],
                    phone: [ {required: true, validator: checkPhone, trigger: 'blur'}],
                    code: [
                    { required: true, message: "请输入验证码", trigger: "blur" },
                    ],
                    account: [
                    { required: true, message: "请输入登录账户", trigger: "blur"},
                    { min: 5, max: 10, message: "请输入长度在5-10以内", trigger: "blur"}
                    ],
                    password: [
                    { required: true, message: "请输入登录密码", trigger: "blur"},
                    { min: 6, max: 15, message: "请输入长度在6-15以内", trigger: "blur"}
                    ],
                     projects: [
                    {  required: true, message: '请至少选择一个管理项目', trigger: 'change' }
                  ],
                },
            }
        },
        methods: {
          // 发送验证码
            code() {
                if(!this.ruleForm.phone) {
                    this.$msg.Warning('请输入手机号')
                    return false
                }
                this.$http(GetCode, {
                  mobile: this.ruleForm.phone
                })
                .then(res => {
                        if(res.data.code === 200) {
                            this.$msg.Success('发送成功')
                        }
                    })
                clearInterval(this.timer_out)
                this.count = true
                this.timer_out = setInterval(()=>{  //定时器
                    this.timer--;        
                    if(this.timer<=0){  
                        this.count = false;    
                        clearInterval(this.timer_out)
                    }
                },1000)
            },
            // 保存弹窗
            save (formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        this.dialogVisible = true
                        
                    }
                })
            },
            // 保存
            handelDetail() {
                if(!this.id) {
                    let model = {
                        name: this.ruleForm.name,
                        phone: this.ruleForm.phone,
                        code: this.ruleForm.code,
                        account: this.ruleForm.account,
                        password: this.ruleForm.password,
                        projects: this.ruleForm.projects
                    }
                    this.$http(AddSave, model)
                    .then(res=> {
                        if(res.data.code ==200) {
                        this.$msg.Success('保存成功！')
                        this.dialogVisible = false
                        this.$router.push('/finance-account/index')
                        }
                    })
                }
                if(this.id) {
                    this.$http(UpdateSave, {
                        employee_id: this.id,
                        password: this.ruleForm.password,
                        name: this.ruleForm.name,
                        phone: this.ruleForm.phone,
                        account: this.ruleForm.account,
                        projects:this.ruleForm.projects
                    }).then(res=> {
                        if(res.data.code == 200){
                        this.$msg.Success('编辑成功！')
                        this.dialogVisible = false
                        this.$router.push('/finance-account/index')
                        }
                    })
                }
            },
              // 列表详情
            getData() {
                if(this.id) {
                    this.$http(DetailFinance, {
                        employee_id: this.id
                    }).then(res => {
                        if(res.data.code == 200){
                            this.tableData = res.data.data
                            this.$set(this.ruleForm, 'name', res.data.data.name)
                            this.$set(this.ruleForm, 'phone', res.data.data.phone)
                            this.$set(this.ruleForm, 'account', res.data.data.account)
                            this.$set(this.ruleForm, 'password', '')
                            let checkProject = this.tableData.projects
                            checkProject.forEach(element => {
                            this.ruleForm.projects.push(Number(element))
                            });
                        }
                    })
                }
          },
          //获取管理项目
          getProjects() {
              if(!this.id) {
                   this.$http(GetProjects).then(res=>{
                    if(res.data.code == 200) {
                        let projects = res.data.data
                        this.projects = []
                        if (projects && projects.length > 0) {
                            projects.map((item) => {
                                this.projects.push({
                                label: item.name,
                                id: item.id,
                                is_use: item.is_use
                                });
                            });
                        }
                    }
                })
              }
              if(this.id) {
                  this.$http(GetProjects, {employee_id: this.id}).then(res=>{
                    if(res.data.code == 200) {
                        let projects = res.data.data
                        this.projects = []
                        if (projects && projects.length > 0) {
                            projects.map((item) => {
                                this.projects.push({
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
          //验证账户信息
          accountHandel() {
            if(this.ruleForm.account) {
              this.$http(CodeUserInfo, {
                  data: this.ruleForm.account,
                  type: 2
              })
              .then(res => {
                if(res.data.code ==200) {
                  this.$msg.Success('验证通过！')
                }
              })
            } 
          },
           //验证手机信息
          phoneHandel() {
            if(this.ruleForm.phone) {
              this.$http(CodeUserInfo, {
                  data: this.ruleForm.phone,
                  type: 1
              })
              .then(res => {
                if(res.data.code ==200) {
                  this.$msg.Success('验证通过！')
                }
              })
            }
              
          },
            //验证密码信息
          passwordHandel() {
            if(this.ruleForm.password) {
              this.$http(CodeUserInfo, {
                  data: this.ruleForm.password,
                  type: 3
              })
              .then(res => {
                if(res.data.code ==200) {
                  this.$msg.Success('验证通过！')
                }
              })
            }
              
          },
            //返回
            handelBack () {
                window.history.go(-1)
                this.dialogVisible1 = false
            }
        },
        created() {
            this.getProjects()
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
    color:#111111;
    line-height: 50px;
}
/deep/ .el-dialog__header {
  color: #000;
  height:10px !important;
  background: #3A62D7;

}
/deep/ .el-dialog__footer{
    text-align: center;
}
/deep/ .el-dialog__title {

  color: #fff;

}
/deep/ .el-form-item__error{
  margin-left: 28px;
  padding-top: 2px;
}
.content_box {
  margin-top: 43px;
  margin-left: 20px;
  .left {
    width: 100%;
  }
  .mains {
    flex: 1;
    width: 20%;
  }
  .box{
      display: flex;
      .phone{
        /deep/ .el-form-item__error{
          margin-left: 18px;
        }
      }
  }
}
.add-account {
  .el-form-item__label {
    text-align: left;
    text-indent: 7px;
  }
  span {
      margin-left: 50px;
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
  h4{
    font-size:20px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(51,51,51,1); 
    margin-top: 20px;
    margin-left: 20px;
  }
  .el-switch {
    margin-left: 30px;
  }
  .el-input {
    margin-left: 30px;
  }
  .chec {
    width: 120px !important;
    .el-form-item__label {
      width: 128px !important;
    }
    .el-switch {
      margin-top: -81px;
    }
  }
  .ident{
      content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
  .el-form-item__label::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
  .right {
    .el-form-item__label {
      text-indent: 0;
    }
    .idcard {
      .el-form-item__label {
        width: 200px !important;
        margin-top: 20px;
        margin-bottom: -25px !important;
      }
    }
    .upload-wrap p {
      margin-top: 138px !important;
      margin-left: -101px !important;
    }
    .upload-wrap {
      margin-top: -22px !important;
    }
    .el-dialog__headerbtn {
        margin-top:2px;
    }
    /deep/ .el-form-item .btn {
            margin-top: 148px !important;
            display: flex;
            justify-content: flex-start ;
            .save{
                margin-right: 50px !important;
            }
        }
  }
}
</style>