<template>
    <div class="login" :style="{'backgroundImage': 'url(' + bgScreen + ')'}">
        <div class="login-header">
            <img :src="moyunLogo2"/>
        </div>
        <div class="box">
            <img :src="moyunLogo3" class="box-logo"/>
            <h2 class="title">摩云劳务企业端</h2>
            <el-tabs v-model="activeName" 
                     @tab-click="tabClick" 
                     style="margin-top: 50px;padding: 0 25px">
                <el-tab-pane label="登录" name="1"/>
                <el-tab-pane label="注册" name="2"/>
            </el-tabs>
            <div class="choose-type" v-if="activeName == 1"><span @click="changeLogin">{{login_type == 1 ? '使用手机号登录' : '使用账号密码登录'}}</span></div>
            <el-input placeholder="请输入手机号..." 
                      :prefix-icon="activeName == 1 ? 'iconfont iconaccount' : 'iconfont iconaccount'" 
                      v-model="mobile" 
                      style="margin-top: 27px"/>
            <div class="code-ipt" v-if="activeName == 2 || login_type == 2">
                <el-input placeholder="请输入验证码..." 
                          prefix-icon="iconfont iconpassword" 
                          v-model="code"
                          style="width: 180px"/>
                <el-button slot="suffix"  
                           type="primary" 
                           v-if="!verification" 
                           @click="startLow">获取验证码</el-button>
                <el-button slot="suffix" 
                           type="info"  
                           plain 
                           disabled 
                           v-else>{{timer}}s</el-button>
            </div>
            <el-input placeholder="请输入密码..." 
                      prefix-icon="iconfont iconpassword" 
                      v-model="pwd" style="margin-top: 27px" 
                      type="password" 
                      v-if="activeName == 2 || login_type == 1"/>
            <button class="login-btn" @click="activeName == 1 ? login() : reg()">{{activeName == 1 ? '立即登录' : '立即注册'}}</button>
            <div class="login-type" 
                 style="margin-top: 15px" 
                  v-if="activeName == 1"
                 @click="$router.push('/pwd/forget?from=login')">忘记密码</div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { PwdLogin, Register, LoginCode, RegisterCode, PhoneLogin } from '@/api/common'
    export default {
        data() {
            return {
                img: require('@/assets/images/login.jpg'),
                pwd: '',            // 密码
                mobile: '',         // 手机号
                activeName: '1',
                login_type: 1,      //登录方式，1：账号密码，2：手机号
                code: '',           // 验证码
                timer: 60,          // 时间
                verification: false,      //是否开始倒计时
                auth_timer: ''
            }
        },
        computed: {
            ...mapState(['tokenName', 'moyunLogo2', 'moyunLogo3', 'bgScreen'])
        },
        methods: {
            // 更换登录方式
            changeLogin() {
                if(this.login_type == 1) {
                    this.login_type = 2
                } else {
                    this.login_type = 1
                }
                this.tabClick()
            },
            // tab切换
            tabClick() {
                // 重置
                this.mobile =  ''
                this.pwd = ''
                this.code = ''
                this.timer = 60
                this.verification = false
            },
            // 发送验证码，开始倒计时
            startLow() {
                if(!this.mobile) {
                    this.$msg.Warning('请输入手机号')
                    return false
                }
                if(this.activeName == 1) {
                    // 登录验证码
                    this.$http(LoginCode, {
                        mobile: this.mobile
                    })
                    .then(res => {
                        if(res.data.code === 200) {
                            this.$msg.Success('发送成功')
                        }
                    })
                } else {
                    // 注册验证码
                    this.$http(RegisterCode, {
                        mobile: this.mobile
                    })
                    .then(res => {
                        if(res.data.code === 200) {
                            this.$msg.Success('发送成功')
                        }
                    })
                }
                clearInterval(this.auth_timer)
                this.verification = true
                this.auth_timer = setInterval(()=>{  //定时器设置每秒递减
                    this.timer--;        //递减时间
                    if(this.timer<=0){  
                        this.verification = false;    //60s时间结束还原v-show状态并清除定时器
                        clearInterval(this.auth_timer)
                    }
                },1000)
            },
            // 登录
            login() {
                if(this.login_type == 2) {
                    // 使用手机号登陆
                    if(!this.mobile || !this.code) {
                        this.$msg.Warning('请输入完整')
                        return false
                    }
                    this.$http(PhoneLogin, {
                        mobile: this.mobile,
                        code: this.code
                    })
                    .then(res => {
                        if(res.data.code === 200) {
                            this.$msg.Success('登录成功')
                            this.loginLink(res.data.data)
                        }
                    })
                } else {
                    // 使用账号密码登陆
                    if(!this.mobile || !this.pwd) {
                        this.$msg.Warning('请输入完整')
                        return false
                    }
                    this.$http(PwdLogin, {
                        mobile: this.mobile,
                        password: this.pwd
                    })
                    .then(res => {
                        if(res.data.code === 200) {
                            this.$msg.Success('登录成功')
                            this.loginLink(res.data.data)
                        }
                    })
                }
            },
            // 注册
            reg() {
                if(!this.mobile || !this.code || !this.pwd) {
                    this.$msg.Warning('请输入完整')
                    return false
                }
                this.$http(Register, {
                    mobile: this.mobile,
                    code: this.code,
                    password: this.pwd
                })
                .then(res => {
                    if(res.data.code === 200) {
                        this.$msg.Success('注册成功')
                        this.loginLink(res.data.data)
                    }
                })
            },
            // 登录成功后的跳转
            loginLink(data) {
                this.$store.commit('changeToken', data.token)
                this.$store.commit('changeCompanyName', data.company_name)
                this.$store.commit('changeAuthStatus', data.edit_status)            //0待审核  1.拒绝  2通过  4未提交认证
                this.$store.commit('changeAuthMobile', data.mobile) 
                if(data.edit_status == 0) {
                    this.$router.push('/real/under-review')
                } else if(data.edit_status == 1) {
                    this.$router.push('/real/audit-failure')
                } else if(data.edit_status == 2) {
                    this.$router.push('/')
                } else if(data.edit_status == 4) {
                    this.$router.push('/real/authentication')
                }
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
            padding: 73px 95px 0;
            border-radius: 10px;
            .box-logo {
                display: block;
                width: 101px;
                height: 66px;
                margin: 0 auto;
            }
            .title {
                color: #333;
                font-size: 30px;
                text-align: center;
                letter-spacing: 1px;
                line-height: 30px;
                margin-top: 18px;
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
    /deep/ .el-tabs__nav {
        width: 100%;
        display: flex;
        .el-tabs__item {
            flex: 1;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            color: #999;
        }
    }
    /deep/ .el-tabs__item.is-active {
        color: $color;
    }
    /deep/ .el-tabs__active-bar {
        background-color: $color;
    }
    /deep/ .el-tabs__nav-wrap::after {
        height: 0;
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
    .choose-type {
        text-align: right;
        color: $color;
        text-decoration: underline;
        font-size: 14px;
        cursor: pointer;
    }
</style>
