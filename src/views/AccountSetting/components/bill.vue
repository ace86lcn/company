<template>
    <el-dialog
        :visible.sync="show"
        :width="width"
        :before-close="handleClose"
        :center="true">
        <div class="content">
			<h4 class="title">新增发票抬头</h4>
            <el-form :model="ruleForm" 
					 :rules="rules" 
					 ref="ruleForm" 
					 label-width="100px"
					 label-position="left">
				<el-form-item label="公司名称" prop="name">
					<el-input v-model="ruleForm.name"
							  placeholder="请输入公司名称"/>
				</el-form-item>
				<el-form-item label="税号" prop="code">
					<el-input v-model="ruleForm.code"
							  placeholder="请输入税号/统一社会信用代码"/>
				</el-form-item>
				<el-form-item label="单位地址" prop="address">
					<el-input v-model="ruleForm.address"
							  placeholder="请输入营业执照上的注册地址"/>
				</el-form-item>
				<el-form-item label="联系电话" prop="mobile">
					<el-input v-model="ruleForm.mobile"
							  placeholder="请输入联系电话"/>
				</el-form-item>
				<el-form-item label="对公账户" prop="zh">
					<el-input v-model="ruleForm.zh"
							  placeholder="请输入对公账户"/>
				</el-form-item>
				<el-form-item label="开户行" prop="khh">
					<el-input v-model="ruleForm.khh"
							  placeholder="请输入对公账户开户行"/>
				</el-form-item>
				<el-form-item style="text-align: right">
					<el-button type="primary" @click="submitForm('ruleForm')">确认新增</el-button>
				</el-form-item>
			</el-form>
		</div>
    </el-dialog>
</template>

<script>
    import { AddInvoiceItem } from '@/api/account'
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            width: {
                type: String,
                default: '600px'
            }
        },
        watch: {
            show(bol) {
                this.ruleForm = {
                    name: '',
                    code: '',
                    address: '',
                    mobile: '',
                    zh: '',
                    khh: ''
                }
            }
        },
        data() {
            return {
                ruleForm: {
					name: '',
					code: '',
					address: '',
					mobile: '',
					zh: '',
					khh: ''
				},
                rules: {
					name: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					],
					code: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					],
					address: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					],
					mobile: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					],
					zh: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					],
					khh: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					]
				}
            }
        },
        methods: {
            handleClose() {
                this.$emit('close')
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http(AddInvoiceItem, {
                            company_name: this.ruleForm.name,
                            ein: this.ruleForm.code,
                            company_address: this.ruleForm.address,
                            company_mobile: this.ruleForm.mobile,
                            company_account: this.ruleForm.zh,
                            company_bank: this.ruleForm.khh
                        })
                        .then(res => {
                            if(res.data.code === 200) {
                                this.$msg.Success('添加成功')
                                this.$emit('confirm')
                            }
                        })
					} else {
						console.log('error submit!!');
						return false;
					}
				});
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog__title {
        font-size: 18px;
        font-weight: 600;
    }
    .content {
        .title {
			font-size: 20px;
			color: #333333;
			padding: 25px 0 29px;
			text-align: center;
		}
		.content-text {
			font-size: 18px;
			color: #666;
			text-align: center;
			font-weight: 600;
		}
    }
	/deep/ .el-dialog__body {
		padding: 0 50px 42px;
	}
    /deep/ .el-button {
        width: 125px;
        height: 40px;
        padding: 0;
    }
    /deep/ .el-button+.el-button {
        margin-left: 60px;
    }
	/deep/ .el-dialog__header {
		height: 40px;
		background-color: #3A62D7;
		padding: 0;
	}
	/deep/ .el-dialog__footer {
		padding: 0 72px 37px;
	}
</style>