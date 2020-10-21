<template>
    <div>
        <div class="detail">
            <div class="top">
                <img :src="detail.head_img_text"/>
                <span>{{detail.name}}</span>
                <p>{{detail.position}}·{{detail.work_years}}年·{{detail.wage_type_text}}</p>
                <p>{{detail.area}}</p>
            </div>
            <div class="desc top-23">
                <span>个人简介：</span>
                <p>{{detail.self_detail}}</p>
            </div>
            <el-tabs v-model="activeName" class="top-23">
                <el-tab-pane label="工作经历" name="1"></el-tab-pane>
            </el-tabs>
            <div class="jl-item top-23"
                 v-for="(item, index) in detail.experience"
                 :key="index">
                <span class="jl-index">{{index+1}}</span>
                <div class="jl-right">
                    <p class="jl-title">
                        <span>{{item.name}}</span>
                        <span>{{item.start_time}}—{{item.end_time}}</span>
                    </p>
                    <p class="jl-desc">经历说明：{{item.work_detail}}</p>
                </div>
            </div>
            <div class="btn top-23">
                <el-button type="primary" @click="contact">立即沟通</el-button>
                <el-button type="primary" @click="$router.back()">返回上一页</el-button>
            </div>
        </div>
        <!-- 联系弹窗 -->
        <contact-dialog :show="show"
                        :name="detail.name"
                        :mobile="$route.query.mobile"
                        @close="show = false"
                        @confirm="show = false"/>
    </div>
</template>

<script>
    import { GetWorkerDetail, ContactWorker } from '@/api/labourService'
    export default {
        components: {
            'ContactDialog': () => import('./components/ContactDialog')
        },
        data() {
            return {
                activeName: '1',
                show: false,             // 弹窗是否显示
                detail: {}
            }
        },
        computed: {
            id() {
                return this.$route.params.id
            }
        },
        methods: {
            contact() {
                this.show = true
                this.$http(ContactWorker, {
                    id: this.id
                })
            }
        },
        created() {
            this.$http(GetWorkerDetail, { id: this.id })
            .then(res => {
                if(res.data.code === 200) {
                    this.detail = res.data.data
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    .top {
        display: flex;
        align-items: center;
        img {
            border-radius: 50%;
            width: 60px;
            height: 60px;
        }
        span {
            color: #666;
            font-size: 18px;
            font-weight: bold;
            margin-left: 40px;
        }
        p {
            color: #3A62D7;
            font-size: 18px;
            font-weight: bold;
            margin-left: 80px;
        }
    }
    .desc {
        display: flex;
        color: #666;
        font-size: 16px;
        font-weight: bold;
        width: 800px;
        span {
            width: 100px;
        }
    }
    .jl-item {
        display: flex;
        width: 800px;
        font-size: 14px;
        .jl-index {
            margin-right: 10px;
        }
        .jl-title {
            display: flex;
            span {
                color: #666;
                width: 300px;
                &:last-child {
                    color: #3A62D7;
                }
            }
        }
        .jl-desc {
            color: #666;
            margin-top: 15px;
        }
    }
    .btn {
        display: flex;
        justify-content: flex-end;
    }
</style>
