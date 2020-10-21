<template>
    <div >
        <div class="detail">
            <template v-if="detail.company_head_img">
                <div class="company-top">
                    <div class="logo">
                        <img :src="detail.company_head_img_path"/>
                        <span>{{detail.company_name}}</span>
                        <i class="iconfont iconrenzheng"/>
                    </div>
                    <span class="company-score">信用分：{{detail.credit_score}}分</span>
                </div>
                <div class="detail-item">
                    <span class="item-title">企业简介：</span>
                    <p>{{detail.company_self}}</p>
                </div>
                <div class="detail-item">
                    <span class="item-title">企业地址：</span>
                    <p>{{detail.company_address}}</p>
                </div>
                <div class="detail-item">
                    <span class="item-title">企业图集：</span>
                    <div class="img-group" v-if="detail.company_img_type == 'object'">
                        <img :src="item" v-for="(item, index) in detail.company_img_text" :key="index"/>
                    </div>
                </div>
                <div class="detail-item">
                    <span class="item-title">企业介绍：</span>
                    <p>{{detail.company_detail}}</p>
                </div>
                <div class="btn">
                    <el-button type="primary" @click="$router.push('/company-data/upload-data?edit=true')">编辑企业资料</el-button>
                </div>
            </template>
            <!-- 缺省图 -->
            <div class="empty" v-else>
                <p>尊敬的{{$store.state.companyName}}，你还未上传企业资料</p>
                <el-button type="primary" @click="$router.push('/company-data/upload-data')">上传企业资料</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { GetCompanyDetail } from '@/api/company'
    export default {
        data() {
            return {
                detail: {}
            }
        },
        methods: {
            getDetail() {
                this.$http(GetCompanyDetail)
                .then(res => {
                    if(res.data.code === 200) {
                        this.detail = res.data.data
                        this.detail.company_img_type = typeof this.detail.company_img_text
                    }
                })
            }
        },
        created() {
            this.getDetail()
        }
    }
</script>

<style lang="scss" scoped>
    .company-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo {
            display: flex;
            align-items: center;
            img {
                width: 60px;
                height: 60px;
                border-radius: 5px;
            }
            span {
                color: #333;
                font-weight: bold;
                font-size: 18px;
                margin: 0 30px;
            }
            i {
                font-size: 26px;
                color: #3A62D7;
            }
        }
        .company-score {
            color: #3A62D7;
            font-weight: bold;
            font-size: 20px;
        }
    }
    .detail-item {
        display: flex;
        margin-top: 20px;
        .item-title {
            width: 150px;
            color: #333;
            font-weight: bold;
            font-size: 16px;
        }
        p {
            color: #333;
            font-weight: bold;
            font-size: 16px;
        }
        .img-group {
            display: flex;
            flex-wrap: wrap;
            img {
                width: 180px;
                height: 120px;
                margin-right: 20px;
                margin-bottom: 20px;
            }
        }
    }
    .btn {
        text-align: right;
        margin-top: 50px;
    }
    .empty  p {
        line-height: 80px;
        text-align: center;
        color: #999;
        flex: 1;
        font-size: 20px;
    }
    .empty button {
        display: block;
        margin: 0 auto;
    }
</style>
