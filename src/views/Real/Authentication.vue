<template>
    <div class="real" :style="{'backgroundImage': 'url(' + img + ')'}">
        <div class="box">
            <h3 class="title">实名认证</h3>
            <div class="status">
                 <p :class="{'status-active': item.id==step || step > item.id}"
                    v-for="item in status"
                    :key="item.id">{{item.name}}</p>
            </div>
            <!-- form1 -->
            <el-form :model="ruleForm1" 
					 :rules="rules1" 
					 ref="ruleForm1" 
					 label-width="100px"
					 label-position="left"
					 style="width: 500px"
                     v-if="step == 1">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="ruleForm1.name"
							  placeholder="请输入您的真实姓名"/>
				</el-form-item>
				<el-form-item label="身份证号" prop="id_card">
					<el-input v-model="ruleForm1.id_card"
							  placeholder="请输入您的身份证号"/>
				</el-form-item>
				<el-form-item label="身份证正面" prop="img1">
					<img-upload :img="ruleForm1.img1"
                                :detailImg="ruleForm1.detail_img1"
                                url="/admin/Upload/cardImgFront"
                                @change="changeImg1"/>
				</el-form-item>
				<el-form-item label="身份证反面" prop="img2">
					<img-upload :img="ruleForm1.img2"
                                :detailImg="ruleForm1.detail_img2"
                                url="/admin/Upload/cardImgBack"
                                @change="changeImg2"/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm1('ruleForm1')">下一步</el-button>
				</el-form-item>
			</el-form>
            <!-- form2 -->
            <el-form :model="ruleForm2" 
					 :rules="rules2" 
					 ref="ruleForm2" 
					 label-width="140px"
					 label-position="left"
					 style="width: 500px"
                     v-if="step == 2">
				<el-form-item label="公司名称" prop="company">
					<el-input v-model="ruleForm2.company"
							  placeholder="请输入公司名称"/>
				</el-form-item>
				<el-form-item label="统一社会信用代码" prop="code">
					<el-input v-model="ruleForm2.code"
							  placeholder="请输入统一社会信用代码"/>
				</el-form-item>
				<el-form-item label="法人姓名" prop="name">
					<el-input v-model="ruleForm2.name"
							  placeholder="请输入法人姓名"/>
				</el-form-item>
				<el-form-item label="法人身份证号" prop="legal_card_number">
					<el-input v-model="ruleForm2.legal_card_number"
							  placeholder="请输入法人身份证号"/>
				</el-form-item>
				<el-form-item label="企业营业执照" prop="img">
					<img-upload :img="ruleForm2.img"
                                :detailImg="ruleForm2.detail_img"
                                url="/admin/Upload/businessLicense"
                                @change="changeImg3"/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm2('ruleForm2')">提交审核</el-button>
				</el-form-item>
			</el-form>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { CompanyRegister } from '@/api/common'
    export default {
		components: {
			'ImgUpload': () => import('@/components/ImgUpload1')
		},
        data() {
            return {
                img: require('../../assets/images/login.jpg'),
                step: 1,
                status: [{
                    id: 1,
                    name: '第一步：个人实名'
                }, {
                    id: 2,
                    name: '第二步：企业实名'
                }],
                ruleForm1: {
					name: '',                      // 姓名
					id_card: '',                   // 身份证号
					img1: '',                      // 相对路径
					detail_img1: '',               // 绝对路径
					img2: '',
					detail_img2: ''
				},
                rules1: {
					name: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					],
					id_card: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					],
					img1: [
						{ required: true, message: '请填写必填项', trigger: 'blur' }
					],
					img2: [
						{ required: true, message: '请填写必填项', trigger: 'blur' }
					]
				},
                ruleForm2: {
					company: '',
					code: '',
					name: '',
					img: '',
                    detail_img: '',
                    legal_card_number: ''
				},
                rules2: {
					company: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					],
					code: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					],
					name: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					],
					legal_card_number: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					],
					img: [
						{ required: true, message: '请填写必填项', trigger: 'blur' }
					]
				}
            }
        },
        computed: {
            ...mapState(['authMobile'])
        },
        methods: {
            changeImg1(detail, img) {
                this.$set(this.ruleForm1, 'img1', img)
                this.$set(this.ruleForm1, 'detail_img1', detail)
            },
            changeImg2(detail, img) {
                this.$set(this.ruleForm1, 'img2', img)
                this.$set(this.ruleForm1, 'detail_img2', detail)
            },
            changeImg3(detail, img) {
                this.$set(this.ruleForm2, 'img', img)
                this.$set(this.ruleForm2, 'detail_img', detail)
            },
            submitForm1(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
                        this.step = 2
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
            submitForm2(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http(CompanyRegister, {
                            mobile: this.authMobile,
                            real_name: this.ruleForm1.name,
                            card_number: this.ruleForm1.id_card,
                            card_img_front: this.ruleForm1.img1,
                            card_img_back: this.ruleForm1.img2,
                            company_name: this.ruleForm2.company,
                            company_code: this.ruleForm2.code,
                            legal_name: this.ruleForm2.name,
                            business_license: this.ruleForm2.img,
                            legal_card_number: this.ruleForm2.legal_card_number
                        })
                        .then(res => {
                            if(res.data.code === 200) {
                                this.$msg.Success('提交成功')
                                this.$router.replace('/real/under-review')
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
    $color: #3A62D7;
    .real {
        height: 100vh;
        position: relative;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .box {
            width: 800px;
            min-height: 480px;
            background-color: #fff;
            border-radius: 10px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            .title {
                font-size: 24px;
                color: #666;
                text-align: center;
            }
            .status {
                display: flex;
                justify-content: space-between;
                width: 500px;
                margin: 20px auto 0;
                p {
                    font-size: 16px;
                    color: #666;
                    position: relative;
                    &:first-child {
                        &::before {
                            height: 0;
                        }
                    }
                    &::before {
                        content: "";
                        position: absolute;
                        top: 12px;
                        left: -195px;
                        width: 150px;
                        height: 2px;
                        background-color: #999;
                    }
                }
                .status-active {
                    color: #3A62D7;
                    &::before {
                        background-color: #3A62D7;
                    }
                }
            }
        }
    }
    /deep/ .el-form {
        margin: 50px auto 0;
    }
</style>
