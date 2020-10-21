<template>
	<div>
		<div class="detail">
			<el-form :model="ruleForm" 
					 :rules="rules" 
					 ref="ruleForm" 
					 label-width="140px"
					 label-position="left"
					 style="width: 100%">
				<h3 class="module-title">请填写企业相关信息</h3>
				<el-form-item label="企业名称">
					<p>{{$store.state.companyName}}</p>
				</el-form-item>
				<el-form-item label="企业头像" prop="img1">
					<img-upload2 :img="ruleForm.img1"
								:detailImg="ruleForm.detail_img1"
                                remark="请上传不超过2M的图片，比例1：1，支持格式JPG、JPEG、PNG"
								url="/admin/SmallCompany/uploadData"
								@change="changeImg1"/>
				</el-form-item>
				<el-form-item label="企业简介" prop="desc1">
					<el-input v-model="ruleForm.desc1"
							  placeholder="请输入企业简介（30字以内）"
							  type="textarea"
							  maxlength="30"/>
				</el-form-item>
				<el-form-item label="企业地址" prop="address">
					<el-input v-model="ruleForm.address"
							  placeholder="请输入企业地址"/>
				</el-form-item>
				<el-form-item label="企业介绍">
					<el-input v-model="ruleForm.desc2"
							  placeholder="请输入企业介绍（30字以内）"
							  type="textarea"
							  maxlength="30" />
				</el-form-item>
				<el-form-item label="企业图集">
					<img-upload1 :datas1="ruleForm.img2"
                                :datas2="ruleForm.detail_img2"
								:max="8"
                                remark="请上传八张以内，不超过2M的图片，比例2：3，支持格式JPG、JPEG、PNG"
                                url="/admin/SmallCompany/uploadData"
                                @change="changeImg2"/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
    import { GetCompanyDetail, UploadCompanyData } from '@/api/company'
	export default {
		components: {
			'ImgUpload1': () => import('@/components/ImgUploadn'),
			'ImgUpload2': () => import('@/components/ImgUpload1')
		},
		data() {
			return {
				ruleForm: {
					address: '',           // 企业地址
					desc1: '',             // 企业简介
					desc2: '',             // 企业介绍
					img2: [],		//相对路径
					detail_img2: [],       // 绝对路径
					img1: '',
					detail_img1: ''
				},
				rules: {
					address: [
						{ required: true, message: '请填写必填项', trigger: 'change' },
					],
					desc1: [
						{ required: true, message: '请填写必填项', trigger: 'change' },
					],
					desc2: [
						{ required: true, message: '请填写必填项', trigger: 'change' },
					],
					img1: [
						{ required: true, message: '请填写必填项', trigger: 'change' }
					]
				}
			}
		},
		methods: {
			// 保存
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let company_img = this.ruleForm.img2.length > 0 ? this.ruleForm.img2.join(',') : ''
						this.$http(UploadCompanyData, {
							company_self: this.ruleForm.desc1,
							company_address: this.ruleForm.address,
							company_head_img: this.ruleForm.img1,
							company_img: company_img,
							company_detail: this.ruleForm.desc2
						})
						.then(res => {
							if(res.data.code === 200) {
								this.$msg.Success('编辑成功')
								this.$router.back()
							}
						})
					} else {
						console.log('error submit!');
						return false;
					}
				});
			},
            changeImg1(detail, img) {
                this.$set(this.ruleForm, 'img1', img)
                this.$set(this.ruleForm, 'detail_img1', detail)
            },
            changeImg2(detail, img) {
                this.$set(this.ruleForm, 'img2', img)
				this.$set(this.ruleForm, 'detail_img2', detail)
            }
		},
		created() {
			// 编辑企业
			if(this.$route.query.edit) { 
				document.title = '编辑企业资料' 
				this.$http(GetCompanyDetail)
                .then(res => {
                    if(res.data.code === 200) {
                        this.ruleForm = {
							address: res.data.data.company_address,
							desc1: res.data.data.company_self,
							desc2: res.data.data.company_detail,
							img2: res.data.data.company_img ? res.data.data.company_img.split(',') : [],
							detail_img2: res.data.data.company_img ? res.data.data.company_img_text : [],
							img1: res.data.data.company_head_img,
							detail_img1: res.data.data.company_head_img_path
						}
						this.$store.commit('changeCompanyName', res.data.data.company_name)
                    }
                })
			}
		}
	}	
</script>

<style lang="scss" scoped>
	.module-title {
		font-size: 18px;
		color: #111;
	}
	/deep/ .el-textarea__inner {
		height: 90px;
	}
	/deep/ .el-form-item {
		margin-bottom: 0;
		&:not(:first-child) {
			margin-top: 20px;
		}
	}
    /deep/ .el-input {
        width: 500px;
    }
    /deep/ .el-textarea {
        width: 500px;
    }
</style>