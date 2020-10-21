<template>
    <div>
        <div class="detail">
            <h4 class="detail-title">报名列表</h4>
            <!-- list -->
            <div class="list">
                 <div class="list-item"
                      v-for="item in list"
                      :key="item.id">
                    <div class="item-t">
                        <div class="item-t-c">
                            <img :src="item.head_img_text" class="el-icon-s-promotions"/>
                            <div>
                                <h4>{{item.name}} <span>{{item.work_years}}年·{{item.wage_type_text}}</span></h4>
                                <p>报名说明：{{item.detail}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="item-b">
                        <span @click="pass(item.id, item.name, item.mobile, item.card_number)">通过</span>
                        <span @click="refuse(item.id)">拒绝</span>
                        <span>
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="$router.push(`/labour-service/worker-detail/${item.user_id}?card=${item.card_number}&mobile=${item.mobile}`)">工人主页</el-dropdown-item>
                                    <el-dropdown-item @click.native="contact(item.name, item.mobile, item.card_number)">立即沟通</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </span>
                    </div>
                 </div>
            </div>
            <p class="empty" v-if="list.length == 0">暂无数据哦~</p>
            <!-- 分页 -->
            <pages :page.sync="page" :total="total"/>
            <!-- 通过弹窗 -->
            <pass-dialog :show="pass_show"
                        :name="name"
                        :mobile="mobile"
                        :card="card"
                        @close="pass_show = false"
                        @confirm="passConfirm"/>
            <!-- 拒绝弹窗 -->
            <handle-dialog  :show="refuse_show"
                            content="确认拒绝该员工的报名么？"
                            @close="refuse_show = false"
                            @confirm="refuseConfirm"/>
            <!-- 联系弹窗 -->
            <contact-dialog :show="contact_show"
                            :name="name"
                            :mobile="mobile"
                            @close="contact_show = false"
                            @confirm="contact_show = false"/>
        </div>
    </div>
</template>

<script>
    import { GetSignUpList, Employment, ContactWorker } from '@/api/recruit'
    export default {
        components: {
            'HandleDialog': () => import('@/components/HandleDialog'),
            'PassDialog':() => import('./components/PassDialog'),
            'ContactDialog': () => import('../LabourService/components/ContactDialog')
        },
        data() {
            return {
                list: [],
                id: '',
                pass_show: false,
                refuse_show: false,
                contact_show: false,
                page: 1,
                total: 0,
                name: '',              // 姓名
                mobile: '',            // 联系
                card: ''
            }
        },
        watch: {
            'page'(val) {
                this.getList()
            }
        },
        methods: {
            getList() {
                this.$http(GetSignUpList, {
                    id: this.$route.params.id,
                    page: this.page,
                    type: 2
                })
                .then(res => {
                    if(res.data.code === 200) {
                        this.total = res.data.data.total
                        this.list = res.data.data.data
                    }
                })
            },
            pass(id, name, mobile, card) {
                this.id = id
                this.name = name+''
                this.mobile = mobile+''
                this.card = card+''
                this.pass_show = true
            },
            passConfirm() {
                this.pass_show = false
                this.$http(Employment, {
                    id: this.id,
                    type: 1
                })
                .then(res => {
                    if(res.data.code === 200) {
                        this.$msg.Success('操作成功')
                        this.getList()
                    }
                })
            },
            refuse(id) {
                this.id = id
                this.refuse_show = true
            },
            // 拒绝
            refuseConfirm() {
                this.refuse_show = false
                this.$http(Employment, {
                    id: this.id,
                    type: 2
                })
                .then(res => {
                    if(res.data.code === 200) {
                        this.$msg.Success('拒绝成功')
                        this.getList()
                    }
                })
            },
            contact(name, mobile, card) {
                this.name = name
                this.mobile = mobile
                this.contact_show = true
                this.$http(ContactWorker, { card_number: card })
            }
        },
        created() {
            this.getList()
        }
    }
</script>

<style lang="scss" scoped>
    .detail-title {
        color: #333;
        font-size: 16px;
    }
    .list {
        display: flex;
        flex-wrap: wrap;
    }
    .list-item {
        margin-top: 20px;
        width: calc((100% - 50px) / 3);
        height: 183px;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.14);
        border: 1px solid #E9E9E9;
        cursor: pointer;
        &:nth-child(3n) {
            margin-left: 20px;
        }
        &:nth-child(3n-1) {
            margin-left: 20px;
        }
        .item-t {
            height: 133px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            .item-t-c {
                display: flex;
                /deep/ .el-icon-s-promotions {
                    border-radius: 50%;
                    height: 40px;
                    width: 40px;
                    padding-left: 10px;
                }
                div {
                    margin-left: 10px;
                    margin-top: 10px;
                    h4 {
                        font-size: 16px;
                        span {
                            font-size: 14px;
                            color: #3A62D7;
                            margin-left: 50px;
                        }
                    }
                    p {
                        font-size: 14px;
                        color: #666;
                        margin-top: 10px;
                        padding-right: 15px;
                    }
                }
            }
        }
        .item-b {
            height: 50px;
            box-sizing: border-box;
            border-top: 1px solid #E9E9E9;
            display: flex;
            align-items: center;
            span {
                flex: 1;
                text-align: center;
                font-size: 14px;
                &:first-child {
                    color: #3A62D7;
                }
                &:nth-child(2) {
                    color: #f56c6c;
                }
                &:last-child {
                    color: #666;
                    font-weight: bold;
                }
            }
        }
    }
    .empty {
        line-height: 80px;
        text-align: center;
        color: #999;
        flex: 1;
        font-size: 20px;
    }
</style>
