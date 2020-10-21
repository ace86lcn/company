<template>
    <div class="login" :style="{'backgroundImage': 'url(' + bgScreen + ')'}">
        <div class="login-header">
            <img :src="moyunLogo2"/>
        </div>
        <div class="box">
            <h2 class="title">修改密码</h2>
            <!-- 步骤条 -->
            <div :class="['steps-box', {'steps-box-active': activeStep == 2}]">
                <span :class="['steps-item', {'steps-item-active': item.id <= activeStep}]"
                      v-for="item in steps"
                      :key="item.id">{{item.title}}</span>
            </div>
            <h3 class="phone-title">{{activeStep == 1 ? '请验证老密码' : '修改您的密码'}}</h3>
            <!-- 第一步展示的内容 -->
            <template v-if="activeStep == 1">
                <el-input placeholder="请输入原密码..." 
                          prefix-icon="iconfont iconpassword" 
                          v-model="oldPwd" 
                          type="password"
                          style="margin-top: 27px"/>
            </template>
            <!-- 第二步展示的内容 -->
            <template v-else>
                <el-input placeholder="请输入新密码..." 
                          prefix-icon="iconfont iconpassword" 
                          v-model="pwd" style="margin-top: 27px" 
                          type="password"/>
                <el-input placeholder="请再次输入新密码..." 
                          prefix-icon="iconfont iconpassword" 
                          v-model="repeatPwd" style="margin-top: 27px" 
                          type="password"/>
            </template>
            <button class="login-btn" @click="nextStep" v-if="activeStep == 1">下一步</button>
            <button class="login-btn" @click="save" v-else>保存密码</button>
            <div class="login-type" style="margin-top: 15px" @click="goBack" v-if="activeStep == 1">取消修改</div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { CheckOldPassword, ChangeAccountPwd } from '@/api/common'
    export default {
        data() {
            return {
                oldPwd: '',
                pwd: '',               //密码
                repeatPwd: '',
                activeName: '1',       //登录方式，1：账号密码，2：手机号
                activeStep: 1,         //1：手机号验证  2：修改密码
                steps: [{
                    id: 1,
                    title: '验证老密码'
                }, {
                    id: 2,
                    title: '修改密码'
                }]
            }
        },
        computed: {
            ...mapState(['tokenName', 'moyunLogo2', 'bgScreen', 'authMobile'])
        },
        methods: {
            // 第一步要进行第二步
            nextStep() {
                if(!this.oldPwd) {
                    this.$msg.Warning('请输入完整')
                } else {
                    this.$http(CheckOldPassword, {
                        mobile: this.authMobile,
                        password: this.oldPwd
                    })
                    .then(res => {
                        if(res.data.code === 200) {
                            this.activeStep = 2
                        }
                    })
                }
            },
            // 保存修改密码
            save() {
                if(!this.pwd || !this.repeatPwd) {
                    this.$msg.Warning('请输入完整')
                } else if (this.pwd !== this.repeatPwd) {
                    this.$msg.Warning('两次输入不一致')
                } else {
                    this.$http(ChangeAccountPwd, {
                        mobile: this.authMobile,
                        password: this.pwd,
                        repassword: this.repeatPwd
                    })
                    .then(res => {
                        if(res.data.code === 200) {
                            this.$msg.Success('修改成功')
                            this.goBack()
                        }
                    })
                }
            },
            goBack() {
                this.$router.back()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login {
        height: 100vh;
        position: relative;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .login-header {
            height: 80px;
            box-sizing: border-box;
            padding-left: 40px;
            background-color: #fff;
            display: flex;
            align-items: center;
            img {
                width: 165px;
                height: 40px;
            }
        }
        .box {
            width: 490px;
            height: 650px;
            box-sizing: border-box;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            padding: 103px 95px 0;
            border-radius: 10px;
            box-shadow: 0px 4px 40px 0px rgba(128, 128, 128, 0.3);
            .title {
                color: #333;
                font-size: 30px;
                text-align: center;
                letter-spacing: 1px;
                line-height: 30px;
                margin-top: 18px;
            }
            .steps-box {
                display: flex;
                justify-content: space-between;
                margin-top: 56px;
                position: relative;
                &::after {
                    content: "";
                    position: absolute;
                    width: 80px;
                    height: 1px;
                    top: 7px;
                    left: 117px;
                    background-color: #ccc;
                }
                .steps-item {
                    color: #999;
                    font-size: 16px;
                    line-height: 16px;
                    position: relative;
                    padding-left: 22px;
                    &::before {
                        content: "";
                        position: absolute;
                        width: 16px;
                        height: 16px;
                        box-sizing: border-box;
                        border: 2px solid #ccc;
                        border-radius: 50%;
                        top: 1px;
                        left: 0;
                    }
                }
                .steps-item-active {
                    color: $color;
                    &::before {
                        border: 2px solid $color;
                    }
                    &::after {
                        content: "";
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        top: 5px;
                        left: 4px;
                        background-color: $color;
                    }
                }
            }
            .steps-box-active {
                &::after {
                    background-color: $color;
                }
            }
            .phone-title {
                margin-top: 75px;
                color: $color;
                font-size: 20px;
                line-height: 20px;
            }
            /deep/ .el-input {
                background-color: transparent;
            }
            /deep/ .el-input__inner {
                border-radius: 4px;
                height: 36px;
                font-weight: 600;
                color: #666;
                font-size: 12px;
                padding-left: 34px;
                letter-spacing: 1px;
                border-color: #999;
            }
            /deep/ .el-input__icon {
                line-height: 36px;
                margin-left: 4px;
                font-size: 18px;
                color: #666;
            }
            .login-btn {
                background-color: $color;
                display: block;
                width: 100%;
                height: 36px;
                margin-top: 60px;
                border: none;
                border-radius: 4px;
                font-size: 14px;
                color: #fff;
                cursor: pointer;
                &:active {
                    background-color: $active_color;
                }
            }
        }
    }
    .login-type {
        text-align: center;
        color: $color;
        text-decoration: underline;
        font-size: 12px;
        line-height: 12px;
        cursor: pointer;
        margin-top: 28px;
    }
    /deep/ .iconfont {
        font-size: 22px !important;
    }
    .code-ipt {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 27px;
        button {
            width: 108px;
            height: 36px;
            padding: 0;
        }
    }
</style>
