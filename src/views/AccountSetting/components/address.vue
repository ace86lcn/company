<template>
    <el-dialog
        :visible.sync="show"
        :width="width"
        :before-close="handleClose"
        :center="true">
        <div class="content">
			<h4 class="title">新增收货地址</h4>
            <el-form :model="ruleForm" 
					 :rules="rules" 
					 ref="ruleForm" 
					 label-width="100px"
					 label-position="left">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="ruleForm.name"
							  placeholder="请输入收件人姓名"/>
				</el-form-item>
				<el-form-item label="手机号" prop="mobile">
					<el-input v-model="ruleForm.mobile"
							  placeholder="请输入手机号"/>
				</el-form-item>
				<el-form-item label="单位地址" prop="address">
					<el-input v-model="ruleForm.address"
							  placeholder="请输入收件人地址"/>
				</el-form-item>
				<el-form-item style="text-align: right">
					<el-button type="primary" @click="submitForm('ruleForm')">确认新增</el-button>
				</el-form-item>
			</el-form>
		</div>
    </el-dialog>
</template>

<script>
    import { AddAddressItem } from '@/api/account'
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
					mobile: '',
					address: ''
                }
            }
        },
        data() {
            return {
                ruleForm: {
					name: '',
					mobile: '',
					address: ''
				},
                rules: {
					name: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					],
					mobile: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					],
					address: [
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
						this.$http(AddAddressItem, {
                            name: this.ruleForm.name,
                            mobile: this.ruleForm.mobile,
                            address: this.ruleForm.address
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