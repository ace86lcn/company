<template>
    <div>
        <div class="detail">
            <h2 class="detail-title">
                <span>招揽工详情</span>
                <!-- <span v-if="type == 1">已发布</span>
                <span v-if="type == 2">已下架</span>
                <span v-if="type == 0">草稿</span> -->
                <span>{{detail.type_text}}</span>
            </h2>
            <div class="contents">
                <div class="content-item">
                    <span class="content-title">招揽工标题：</span>
                    <p>{{detail.title}}</p>
                </div>
                <div class="content-item">
                    <span class="content-title">所属项目：</span>
                    <p>{{detail.project_name}}</p>
                </div>
                <div class="content-item">
                    <span class="content-title">职位：</span>
                    <p>{{detail.position_text}}</p>
                </div>
                <div class="content-item">
                    <span class="content-title">薪资：</span>
                    <p>{{detail.wage_type_text}}</p>
                </div>
                <div class="content-item">
                    <span class="content-title">工龄：</span>
                    <p>{{detail.work_years_text}}</p>
                </div>
                <div class="content-item">
                    <span class="content-title">地区：</span>
                    <p>{{detail.area}}</p>
                </div>
                <div class="content-item">
                    <span class="content-title">工作说明：</span>
                    <p>{{detail.work_detail}}</p>
                </div>
                <div class="content-item">
                    <span class="content-title">招聘要求：</span>
                    <p>{{detail.work_require}}</p>
                </div>
                <div class="content-item">
                    <span class="content-title">浏览量：</span>
                    <p>{{detail.look_count}}人</p>
                </div>
                <div class="content-item">
                    <span class="content-title">报名中人数：</span>
                    <p>{{detail.total}}人<span @click="$router.push(`/recruit-management/apply-list/${id}`)" v-if="detail.type_text == '已发布' || detail.type_text == '已下架'">查看报名列表</span></p>
                </div>
            </div>
            <div class="btn">
                <el-button type="primary" v-if="detail.type_text == '已发布'" @click="down">下架</el-button>
                <el-button type="primary" v-if="detail.type_text == '已下架' " @click="up">上架</el-button>
                <el-button type="primary" v-if="detail.type_text == '已发布' || detail.type_text == '已下架'" @click.native="$router.replace(`/recruit-management/add-new?edit=true&id=${id}&again=true`)">重新发布</el-button>
                <el-button type="primary" v-if="detail.type_text == '草稿'" @click.native="$router.replace(`/recruit-management/add-new?edit=true&id=${id}`)">编辑</el-button>
                <el-button type="primary" v-if="detail.type_text == '草稿' || detail.type_text == '已下架'" @click="del">删除</el-button>
            </div>
            <!-- 下架弹窗 -->
            <handle-dialog  :show="down_show"
                            content="下架后工人将不能看到该招聘信息，并拒绝所有报名，确认下架？"
                            @close="down_show = false"
                            :index="1"
                            @confirm="handleConfirm"/>
            <!-- 上架弹窗 -->
            <handle-dialog  :show="up_show"
                            content="上架后用户将可以浏览并报名该招聘，确认上架？"
                            @close="up_show = false"
                            :index="2"
                            @confirm="handleConfirm"/>
            <!-- 删除弹窗 -->
            <handle-dialog  :show="del_show"
                            content="删除后将不能恢复，确认删除？"
                            @close="del_show = false"
                            :index="3"
                            @confirm="handleConfirm"/>
        </div>
    </div>
</template>

<script>
	import { GetProjectList } from '@/api/common'
    import { DownRecruitItem, UpRecruitItem, DelRecruitItem, RecruitDetail } from '@/api/recruit'
    export default {
        components: {
            'HandleDialog': () => import('@/components/HandleDialog')
        },
        data() {
            return {
                detail: {},
                down_show: false,           // 下架弹窗
                up_show: false,             // 上家弹窗
                del_show: false             // 删除弹窗
            }
        },
        computed: {
            id() {
                return this.$route.params.id
            },
            type() {
                return this.$route.query.type     //0：草稿，1：已发布，2：已下架
            }
        },
        methods: {
            down() {
                this.down_show = true
            },
            up() {
                this.up_show = true
            },
            del() {
                this.del_show = true
            },
            handleConfirm(index) {
                if(index == 1) {        //下架
                    this.down_show = false
                    this.$http(DownRecruitItem, {
                        id: this.id,
                        status: 2
                    })
                    .then(res => {
                        if(res.data.code === 200) {
                            this.$msg.Success('下架成功')
                            this.$router.back()
                        }
                    })
                } else if(index == 2) {       //上架
                    this.up_show = false
                    this.$http(UpRecruitItem, {
                        id: this.id,
                        status: 1
                    })
                    .then(res => {
                        if(res.data.code === 200) {
                            this.$msg.Success('上架成功')
                            this.$router.back()
                        }
                    })
                } else if(index == 3) {       //删除
                    this.del_show = false
                    this.$http(DelRecruitItem, { id: this.id })
                    .then(res => {
                        if(res.data.code === 200) {
                            this.$msg.Success('删除成功')
                            this.$router.back()
                        }
                    })
                }
            }
        },
        created() {
            this.$http(RecruitDetail, { id: this.id })
            .then(res => {
                if(res.data.code === 200) {
                    this.$http(GetProjectList)
                    .then(res2 => {
                        if(res2.data.code === 200) {
                            res2.data.data.map(item => {
                                if(item.id == res.data.data.project_id) {
                                    res.data.data.project_text = item.name
                                }
                            })
                            this.detail = res.data.data
                        }
                    })
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    .detail-title {
        display: flex;
        justify-content: space-between;
        span {
            font-size: 16px;
            &:first-child {
                color: #333;
            }
            &:last-child {
                color: #3A62D7;
            }
        }
    }
    .contents {
        width: 600px;
        padding-top: 30px;
        .content-item {
            margin-top: 20px;
            display: flex;
            .content-title {
                width: 100px;
                text-align: right;
                color: #333;
                font-size: 14px;
            }
            p {
                padding-left: 30px;
                width: 470px;
                color: #333;
                font-size: 14px;
                span {
                    color: #3A62D7;
                    cursor: pointer;
                    text-decoration: underline;
                    margin-left: 50px;
                }
            }
        }
    }
    .btn {
        display: flex;
        justify-content: flex-end ;
        margin-top: 50px;
    }
</style>
