<template>
    <div >
        <p class="page-remark">我联系过的：企业有意向的联系的过的员工列表</p>
        <div class="detail top-23">
            <template  v-if="list.length > 0">
                <div class="del-contact">
                    <i class="el-icon-delete" @click="delAll"/>
                    <span @click="delAll">清空我联系过的</span>
                </div>
                <!-- list -->
                <div class="list">
                    <div class="list-item"
                        v-for="item in list"
                        :key="item.id">
                        <div class="item-t">
                            <div class="item-t-c">
                                <img :src="item.head_img_text" class="el-icon-s-promotions"/>
                                <div>
                                    <h4>{{item.name}}</h4>
                                    <p>擅长领域：{{item.position_text}}·{{item.work_years}}年·{{item.wage_type_text}}</p>
                                    <p>地区：{{item.area}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="item-b">
                            <span @click="contact(item.name, item.mobile)">立即联系</span>
                            <span @click="$router.push(`/labour-service/worker-detail/${item.worker_id}?card=${item.card_number}&mobile=${item.mobile}`)">查看详情</span>
                            <span @click="del(item.id)">删除</span>
                        </div>
                    </div>
                </div>
                <!-- 分页 -->
                <pages :page.sync="page" :total="total" :size="15"/>
            </template>
            <!-- 缺省图 -->
            <div class="empty" v-if="list.length == 0">
                <p>您还没有联系过的工人，快去劳务大厅看看吧！</p>
                <el-button type="primary" @click="$router.push('/labour-service/lobby')">前往劳务大厅</el-button>
            </div>
            <!-- 联系弹窗 -->
            <contact-dialog :show="show"
                            :name="name"
                            :mobile="mobile"
                            @close="show = false"
                            @confirm="show = false"/>
            <!-- 删除弹窗 -->
            <handle-dialog  :show="del_show"
                            content="清空后将不能恢复，确认清空？"
                            @close="del_show = false"
                            @confirm="delConfirm"/>
            <!-- 清空弹窗 -->
            <handle-dialog  :show="del_show2"
                            content="清空后将不能恢复，确认清空？"
                            @close="del_show2 = false"
                            @confirm="delConfirm2"/>
        </div>
    </div>
</template>

<script>
    import { ContactedList, DelContactItem, ClearContact } from '@/api/labourService'
    export default {
        components: {
            'SearchTop': () => import('./components/SearchTop'),
            'ContactDialog': () => import('./components/ContactDialog'),
            'HandleDialog': () => import('@/components/HandleDialog')
        },
        data() {
            return {
                content: '',             // 搜索
                page: 1,                 // 当前页
                total: 0,                // 总数
                list: [],
                id: '',
                show: false,
                del_show: false,
                name: '',               // 姓名
                mobile: '',             // 联系
                del_show2: false
            }
        },
        watch: {
            'page'(val) {
                this.getList()
            }
        },
        methods: {
            handleSearch(val) {
                this.content = val
                this.page = 1
                this.getList()
            },
            handleReset() {
                this.content = ''
                this.page = 1
                this.getList()
            },
            getList() {
                this.$http(ContactedList)
                .then(res => {
                    if(res.data.code === 200) {
                        this.total = res.data.data.total
                        this.list = res.data.data.data
                    }
                })
            },
            contact(name, mobile) {
                this.name = name
                this.mobile = mobile
                this.show = true
            },
            del(id) {
                this.id = id
                this.del_show = true
            },
            delConfirm() {
                this.del_show = false
                this.$http(DelContactItem, {
                    id: this.id
                })
                .then(res => {
                    if(res.data.code === 200) {
                        this.$msg.Success('删除成功')
                        this.getList()
                    }
                })
            },
            delAll() {
                this.del_show2 = true
            },
            delConfirm2() {
                this.del_show2 = false
                this.$http(ClearContact)
                .then(res => {
                    if(res.data.code === 200) {
                        this.$msg.Success('清空成功')
                        this.page = 1
                        this.getList()
                    }
                })
            }
        },
        created() {
            this.getList()
        }
    }
</script>

<style lang="scss" scoped>
    .page-remark {
        font-size: 14px;
        font-weight: bold;
        color: #666;
    }
    .del-contact {
        text-align: right;
        line-height: 30px;
        i {
            cursor: pointer;
            color: #3A62D7;
            font-size: 20px;
        }
        span {
            cursor: pointer;
            color: #3A62D7;
            font-size: 16px;
        }
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
                }
                div {
                    margin-left: 10px;
                    margin-top: 10px;
                    h4 {
                        font-size: 16px;
                    }
                    p {
                        font-size: 14px;
                        color: #666;
                        margin-top: 10px;
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
                &:last-child {
                    color: #666;
                    font-weight: bold;
                }
            }
        }
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
