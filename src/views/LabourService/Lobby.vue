<template>
    <div >
        <p class="page-remark">劳务大厅：匠心小镇专为满足建筑企业招聘需求的业务</p>
        <div class="detail top-23">
            <!-- 条件筛选 -->
            <search-top @change="typeChange"/>
            <!-- 搜索框 -->
			<search placeholder="请输入姓名、擅长领域、地区搜索" @search="handleSearch" @reset="handleReset" width="576px"/>
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
                        <span @click="contact(item.name, item.mobile, item.id)">立即联系</span>
                        <span @click="$router.push(`/labour-service/worker-detail/${item.id}?card=${item.card_number}&mobile=${item.mobile}`)">查看详情</span>
                    </div>
                 </div>
            </div>
            <p class="empty" v-if="list.length == 0">暂无数据哦~</p>
            <!-- 分页 -->
            <pages :page.sync="page" :total="total" :size="15"/>
            <!-- 联系弹窗 -->
            <contact-dialog :show="show"
                            :name="name"
                            :mobile="mobile"
                            @close="show = false"
                            @confirm="show = false"/>
        </div>
    </div>
</template>

<script>
    import { GetLabourList, ContactWorker } from '@/api/labourService'
    export default {
        components: {
            'SearchTop': () => import('./components/SearchTop'),
            'ContactDialog': () => import('./components/ContactDialog')
        },
        data() {
            return {
                content: '',           // 搜索
                page: 1,               // 页数
                total: 0,              // 总数
                list: [],
                id: '',
                show: false,
                name: '',             // 姓名
                mobile: '',           // 联系
                job: '',              // 工作
                location: '',         // 地区
                age: ''               // 工龄
            }
        },
        watch: {
            'page'(val) {
                this.getList()
            }
        },
        methods: {
            // 条件筛选
            typeChange(arr) {
                console.log(arr)
                this.job = arr[0]
                this.location = arr[1]
                this.age = arr[2]
                this.page = 1
                this.getList()
            },
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
                this.$http(GetLabourList, {
                    position: this.job,
                    area: this.location,
                    work_years: this.age,
                    content: this.content,
                    page: this.page
                })
                .then(res => {
                    if(res.data.code === 200) {
                        this.total = res.data.data.total
                        this.list = res.data.data.data
                    }
                })
            },
            contact(name, mobile, id) {
                this.name = name
                this.mobile = mobile
                this.show = true
                this.$http(ContactWorker, { id: id })
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
    .search {
        padding: 0 !important;
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
    .empty {
        line-height: 80px;
        text-align: center;
        color: #999;
        font-size: 20px;
    }
</style>
