<template>
    <div class="real"
         :style="{'backgroundImage': 'url(' + img + ')'}">
        <div class="box">
            <i class="el-icon-warning"/>
            <p class="status-text">实名认证审核中</p>
            <p class="remark">您提交的审核我们已经收到，感谢您的支持与信任，我们会尽快处理您的订单，并将处理进度以短信的形式实时发送到您绑定的手机中；您也可以通过线上客服或服务热线了解详情，热线电话：{{service}}</p>
            <el-button type="primary" @click="$router.replace('/login')">返回登录</el-button>
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
            /deep/ .el-icon-warning {
                display: block;
                margin: 0 auto;
                font-size: 80px;
                color: #2C92F6;
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
