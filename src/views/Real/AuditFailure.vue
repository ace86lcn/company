<template>
    <div class="real"
         :style="{'backgroundImage': 'url(' + img + ')'}">
        <div class="box">
            <i class="el-icon-circle-close"/>
            <p class="status-text">实名认证失败</p>
            <p class="remark">您可以通过线上客服或服务热线了解详情，热线电话：{{service}}</p>
            <el-button type="primary" @click="$router.replace('/real/authentication')">重新认证</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                img: require('../../assets/images/login.jpg'),
                service: ''
            }
        },
        created() {
            this.service = this.$store.state.serviceMobile
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
            /deep/ .el-icon-circle-close {
                display: block;
                margin: 0 auto;
                font-size: 80px;
                color: #F93030;
                text-align: center;
                padding-top: 80px;
            }
            .status-text {
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                margin-top: 15px;
                color: #666;
            }
            .remark {
                width: 680px;
                text-align: center;
                font-size: 14px;
                color: #666;
                margin: 45px auto;
            }
            button {
                margin: 0 auto;
                display: block;
            }
        }
    }
</style>
