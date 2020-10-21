<template>
    <div>
        <!-- 详情 -->
        <div class="detail">
            <!-- 基本信息 -->
            <div class="msg">
                <h3 class="module-title" style="margin-bottom: 30px">基本信息</h3>
                <div class="msg-content">
                    <p>手机号/账户名：{{authMobile}}</p>
                    <p>密码：************</p>
                    <div>
                        <el-button @click="out">退出登录</el-button>
                        <el-button type="primary" @click="$router.push('/pwd/change')">修改密码</el-button>
                        <el-button type="primary" @click="$router.push('/pwd/forget')">忘记密码</el-button>
                    </div>
                </div>
            </div>
            <!-- 发票信息 -->
            <div class="bill">
                <h3 class="module-title">发票信息</h3>
                <div class="list">
                    <div class="list-item"
                        v-for="item in list1"
                        :key="item.id">
                        <div class="item-t">
                            <div class="item-t-c">
                                <i class="el-icon-s-promotion"/>
                                <div>
                                    <h4>{{item.company_name}}</h4>
                                    <p>税号：{{item.ein}}</p>
                                    <p>账户：{{item.company_account}}</p>
                                    <p>开户行：{{item.company_bank}}</p>
                                    <p>联系方式：{{item.company_mobile}}</p>
                                    <p>联系地址：{{item.company_address}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="item-b">
                            <span @click="del('list1', item.id)">删除</span>
                        </div>
                    </div>
                    <div class="list-item add-item" @click="bill_show = true">
                        <p>+ 新建抬头</p>
                    </div>
                </div>
            </div>
            <!-- 发票寄送信息 -->
            <div class="bill">
                <h3 class="module-title">发票寄送信息</h3>
                <div class="list">
                    <div class="list-item"
                        v-for="item in list2"
                        :key="item.id">
                        <div class="item-t">
                            <div class="item-t-c">
                                <i class="el-icon-s-promotion"/>
                                <div>
                                    <h4>{{item.name}}</h4>
                                    <p>联系方式：{{item.mobile}}</p>
                                    <p>联系地址：{{item.address}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="item-b">
                            <span @click="del('list2', item.id)">删除</span>
                        </div>
                    </div>
                    <div class="list-item add-item" @click="address_show = true">
                        <p>+ 新增地址</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 删除弹窗 -->
        <handle-dialog  :show="del_show"
                        content="确认删除？"
                        @close="del_show = false"
                        @confirm="delConfirm"/>
        <!-- 发票弹窗 -->
        <bill-dialog :show="bill_show"
                    @close="bill_show = false"
                    @confirm="getList"/>
        <!-- 地址弹窗 -->
        <address-dialog :show="address_show"
                    @close="address_show = false"
                    @confirm="getList"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { GetAccountData, DelInvoiceItem, DelAddressItem } from '@/api/account'
export default {
    components: {
        'HandleDialog': () => import('@/components/HandleDialog'),
        'BillDialog': () => import('./components/bill'),
        'AddressDialog': () => import('./components/address')
    },
    data() {
        return {
            list1: [],      //发票
            list2: [],      //地址
            del_show: false,
            id: '',
            type: '',
            bill_show: false,
            address_show: false
        }
    },
    computed: {
        ...mapState(['authMobile'])
    },
    methods: {
        getList() {
            this.bill_show = false
            this.address_show = false
            this.$http(GetAccountData)
            .then(res => {
                if(res.data.code === 200) {
                    this.list1 = res.data.data.invoice_info
                    this.list2 = res.data.data.invoice_address
                }
            })
        },
        del(list, id) {
            this.del_show = true
            this.id = id
            this.type = list
        },
        delConfirm() {
            this.del_show = false
            let url
            if(this.type == 'list1') {
                url = DelInvoiceItem
            } else {
                url = DelAddressItem
            }
            this.$http(url, { id: this.id })
            .then(res => {
                if(res.data.code === 200) {
                    this.$msg.Success('删除成功')
                    this.getList()
                }
            })
        },
        // 退出登录
        out() {
            this.$msg.MsgBox('确认退出登录？')
            .then(() => {
                this.$store.commit('changeToken', '')
                this.$store.commit('changeAuthMobile', '')
                setTimeout(_ => window.location.reload(), 200)
            })
        }
    },
    created() {
        this.getList()
    }
}
</script>

<style lang="scss" scoped>
    .module-title {
        font-size: 16px;
    }
    .msg-content {
        padding-left: 30px;
        p {
            font-size: 14px;
            margin-bottom: 15px;
        }
    }
    .bill {
        margin-top: 50px;
    }
    .list {
        display: flex;
        flex-wrap: wrap;
    }
    .list-item {
        margin-top: 20px;
        width: calc((100% - 50px) / 3);
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.14);
        border: 1px solid #E9E9E9;
        padding-top: 20px;
        &:hover {
            box-shadow:0px 5px 10px 0px rgba(63,101,255,0.5);
        }
        &:nth-child(3n) {
            margin-left: 20px;
        }
        &:nth-child(3n-1) {
            margin-left: 20px;
        }
        .item-t {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            .item-t-c {
                display: flex;
                /deep/ .el-icon-s-promotion {
                    font-size: 30px;
                    background-color: #FFBF00;
                    border-radius: 50%;
                    color: #fff;
                    padding: 10px;
                    height: 30px;
                }
                div {
                    margin-left: 10px;
                    h4 {
                        font-size: 16px;
                    }
                    p {
                        font-size: 14px;
                        color: #666;
                        margin-top: 5px;
                    }
                }
            }
        }
        .item-b {
            margin-top: 15px;
            height: 50px;
            box-sizing: border-box;
            display: flex;
            justify-content: flex-end;
            span {
                text-align: center;
                font-size: 14px;
                border: 1px solid #E9E9E9;
                line-height: 50px;
                width: 100px;
                text-align: center;
                cursor: pointer;
            }
        }
    }
    .add-item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 0;
        p {
            font-size: 14px;
            font-weight: bold;
            color: #666;
        }
    }
</style>