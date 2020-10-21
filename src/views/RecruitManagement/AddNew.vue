<template>
	<div>
		<div class="detail">
            <h2 class="add-title">请完善招揽工信息</h2>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="left" style="width: 600px">
				<el-form-item label="招揽工标题" prop="title">
					<el-input v-model="ruleForm.title" placeholder="请输入招聘标题（15以内）"  maxlength="15"/>
				</el-form-item>
				<el-form-item label="所属项目" prop="project" class="position-wrap">
					<el-select v-model="ruleForm.project"
                                placeholder="请选择">
                        <el-option v-for="item in projects"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"/>
                    </el-select>
                    <!-- <p class="position-text">没有想选择的项目？点击<span @click="$router.replace('/human')">添加项目</span></p> -->
				</el-form-item>
				<el-form-item label="工种" prop="job">
					<el-cascader v-model="ruleForm.job"
								separator=" - "
								:options="jobs"/>
				</el-form-item>
				<el-form-item label="薪资" prop="wage">
					<el-select v-model="ruleForm.wage" placeholder="请选择">
						<el-option
							v-for="item in prices"
							:key="item.id"
							:label="item.name"
							:value="item.id"/>
					</el-select>
				</el-form-item>
				<el-form-item label="工龄" prop="year">
					<el-select v-model="ruleForm.year"
                               placeholder="请选择">
                        <el-option v-for="item in years"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"/>
                    </el-select>
				</el-form-item>
				<el-form-item label="地区" prop="location">
					<el-cascader v-model="ruleForm.location"
                                separator=" - "
                                :options="cities"/>
				</el-form-item>
				<el-form-item label="工作说明" prop="desc1">
					<el-input type="textarea"  
                              v-model="ruleForm.desc1"
                              placeholder="请输入工作说明（50字以内）"
							  maxlength="50"/>
				</el-form-item>
				<el-form-item label="招揽工要求" prop="desc2">
					<el-input type="textarea" 
                              v-model="ruleForm.desc2"
                              placeholder="请输入招揽工要求（50字以内）"
							  maxlength="50"/>
				</el-form-item>
				<el-form-item>
                    <el-button type="primary" @click="caogao">保存草稿</el-button>
					<el-button type="primary" @click="submitForm('ruleForm')">确认发布</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
    import {  mapState } from 'vuex'
	import { CitieOptions } from '../../utils/country-data2'
	import { GetProjectList } from '@/api/common'
	import { AddRecruitItem, GetRecruitDetail } from '@/api/recruit'
	export default {
		data() {
			return {
                projects: [],		//项目列表
                jobs: [],			//职位列表
				years: [],			//工龄列表
				prices: [],			//薪资列表
				ruleForm: {
                    title: '',
                    project: '',
                    wage: '',
                    location: '',
					desc1: '',
                    desc2: '',
                    job: '',
					year: ''
				},
				rules: {
					title: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					],
					wage: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					],
					project: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					],
					location: [
						{ required: true, message: '请填写必填项', trigger: 'blur' },
					],
					desc1: [
						{ required: true, message: '请填写必填项', trigger: 'blur' }
					],
					desc2: [
						{ required: true, message: '请填写必填项', trigger: 'blur' }
					],
					job: [
						{ required: true, message: '请填写必填项', trigger: 'blur' }
					],
					year: [
						{ required: true, message: '请填写必填项', trigger: 'blur' }
					]
                },
                cities: CitieOptions
			}
		},
		computed: {
			...mapState(['positionList', 'workYearsList', 'wageList']),
			id() {
				return this.$route.query.id
			}
		},
		methods: {
			caogao() {
				this.$http(AddRecruitItem, {
					title: this.ruleForm.title,
					project_id: this.ruleForm.project,
					position: this.ruleForm.job ? this.ruleForm.job[this.ruleForm.job.length - 1] : '',
					position2: this.ruleForm.job,
					wage_type: this.ruleForm.wage,
					work_years: this.ruleForm.year,
					area: this.ruleForm.location ? this.ruleForm.location.join('·') : '',
					work_detail: this.ruleForm.desc1,
					work_require: this.ruleForm.desc2,
					type: 0,
					id: this.id
				})
				.then(res => {
					if(res.data.code === 200) {
						this.$msg.Success(res.data.data)
						this.$router.back()
					}
				})
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http(AddRecruitItem, {
							title: this.ruleForm.title,
							project_id: this.ruleForm.project,
							position: this.ruleForm.job[this.ruleForm.job.length - 1],
							position2: this.ruleForm.job,
							wage_type: this.ruleForm.wage,
							work_years: this.ruleForm.year,
							area: this.ruleForm.location.join('·'),
							work_detail: this.ruleForm.desc1,
							work_require: this.ruleForm.desc2,
							id: this.id,
							type: 1
						})
						.then(res => {
							if(res.data.code === 200) {
								this.$msg.Success(res.data.data)
								this.$router.back()
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			getDetail() {
				this.$http(GetRecruitDetail, { id: this.id })
				.then(res => {
					if(res.data.code === 200) {
						let jobarr = []
						if(res.data.data.position2.length > 0) {
							res.data.data.position2.map(item => {
								jobarr.push(item * 1)
							})
						}
						this.ruleForm = {
							title: res.data.data.title,
							project: res.data.data.project_id ? res.data.data.project_id : '',
							wage: res.data.data.wage_type,
							location: res.data.data.area ? res.data.data.area.split('·') : '',
							desc1: res.data.data.work_detail,
							desc2: res.data.data.work_require,
							job: jobarr,
							year: res.data.data.work_years
						}
					}
				})
			}
		},
		async created() {
			this.jobs = this.positionList
			this.years = this.workYearsList
			this.prices = this.wageList
			
            let result1 = await this.$http(GetProjectList)
            this.projects = result1.data.data
			if(this.$route.query.edit) {
				document.title = '编辑招揽工'
				this.getDetail()
            }
            if(this.$route.query.again) {
                document.title = '重新发布'
				this.getDetail()
            }
		}
	}	
</script>

<style lang="scss" scoped>
    .add-title {
        font-size: 16px;
        color: #666;
        margin-bottom: 20px;
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
    /deep/ .el-cascader {
        width: 500px;
    }
    /deep/ .el-select {
        width: 500px;
    }
    .position-wrap {
        position: relative;
        .position-text {
            position: absolute;
            top: 0px;
            left: 330px;
            width: 220px;
            span {
                color: #3A62D7;
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }
</style>

