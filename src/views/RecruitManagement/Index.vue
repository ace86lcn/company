<template>
    <div >
        <p class="page-remark">招揽工管理：匠心小镇为建筑企业招揽工专门打造的模块</p>
        <div class="detail top-23">
            <!-- 条件筛选 -->
            <search-top @change="typeChange"/>
            <!-- 搜索框 -->
			<search placeholder="请输入招揽工标题、擅长领域、地区搜索" @search="handleSearch" @reset="handleReset" width="576px"/>
            <!-- list -->
            <div class="list">
                 <div class="list-item add-item" @click="$router.push('/recruit-management/add-new')">
                     <p>+ 新增招揽工</p>
                 </div>
                 <div class="list-item"
                      v-for="item in list"
                      :key="item.id">
                    <div class="item-t">
                        <div class="item-t-c">
                            <i class="el-icon-s-promotion"/>
                            <div>
                                <h4>{{item.title}}</h4>
                                <p>擅长领域：{{item.position_text}}·{{item.work_years_text}}·{{item.wage_type_text}}</p>
                                <p>地区：{{item.area}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="item-b">
                        <span >状态：{{item.type_text}}</span>
                        <span @click="$router.push(`/recruit-management/recruit-detail/${item.id}?type=${item.type}`)">查看详情</span>
                        <span>
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-if="item.type_text == '草稿'" @click.native="$router.push(`/recruit-management/add-new?edit=true&id=${item.id}`)">编辑</el-dropdown-item>
                                    <el-dropdown-item v-if="item.type_text == '已发布' || item.type_text == '已下架'" @click.native="$router.push(`/recruit-management/add-new?id=${item.id}&again=true`)">重新发布</el-dropdown-item>
                                    <el-dropdown-item @click.native="up(item.id)" v-if="item.type_text == '已下架'">上架</el-dropdown-item>
                                    <el-dropdown-item @click.native="down(item.id)" v-if="item.type_text == '已发布'">下架</el-dropdown-item>
                                    <el-dropdown-item @click.native="del(item.id)" v-if="item.type_text == '草稿' || item.type_text == '已下架'">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </span>
                    </div>
                 </div>
            </div>
            <!-- 分页 -->
            <pages :page.sync="page" :total="total" :size="11"/>
            <!-- 下架弹窗 -->
            <handle-dialog  :show="down_show"
                            content="下架后工人将不能看到该招聘信息，并拒绝所有报名，确认下架？"
                            @close="down_show = false"
                            :index="1"
                            @confirm="handleConfirm"/>
            <!-- 上架弹窗 -->
            <handle-dialog  :show="up_show"
                            content="上架后用户将可以浏览并报名该招聘，确认上架？"
                            @close="up_show = false"
                            :index="2"
                            @confirm="handleConfirm"/>
            <!-- 删除弹窗 -->
            <handle-dialog  :show="del_show"
                            content="删除后将不能恢复，确认删除？"
                            @close="del_show = false"
                            :index="3"
                            @confirm="handleConfirm"/>
        </div>
    </div>
</template>

<script>
    import { GetRecruitList, DownRecruitItem, UpRecruitItem, DelRecruitItem } from '@/api/recruit'
    export default {
        components: {
            'SearchTop': () => import('./components/SearchTop'),
            'HandleDialog': () => import('@/components/HandleDialog')
        },
        data() {
            return {
                content: '',
                page: 1,
                total: 0,
                list: [],
                id: '',
                down_show: false,         // 下架弹窗
                up_show: false,           // 上架弹窗
                del_show: false,         // 删除弹窗
                job: '',                // 工作
                location: '',          // 地址
                status: ''            // 状态
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
                this.job = arr[0]
                this.location = arr[1]
                this.status = arr[2]
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
                this.$http(GetRecruitList, {
                    position: this.job,
                    area: this.location,
                    type: this.status,
                    content: this.content,
                    page: this.page,
                    pageSize: 11
                })
                .then(res => {
                    if(res.data.code === 200) {
                        this.total = res.data.data.total
                        this.list = res.data.data.data
                    }
                })
            },
            down(id) {
                this.id = id
                this.down_show = true
            },
            up(id) {
                this.id = id
                this.up_show = true
            },
            del(id) {
                this.id = id
                this.del_show = true
            },
            handleConfirm(index) {
                if(index == 1) {        //下架
                    this.down_show = false
                    this.$http(DownRecruitItem, {
                        id: this.id,
                        status: 2
                    })
                    .then(res => {
                        if(res.data.code === 200) {
                            this.$msg.Success('下架成功')
                            this.getList()
                        }
                    })
                } else if(index == 2) {       //上架
                    this.up_show = false
                    this.$http(UpRecruitItem, {
                        id: this.id,
                        status: 1
                    })
                    .then(res => {
                        if(res.data.code === 200) {
                            this.$msg.Success('上架成功')
                            this.getList()
                        }
                    })
                } else if(index == 3) {       //删除
                    this.del_show = false
                    this.$http(DelRecruitItem, {
                        id: this.id
                    })
                    .then(res => {
                        if(res.data.code === 200) {
                            this.$msg.Success('删除成功')
                            this.getList()
                        }
                    })
                }
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
                /deep/ .el-icon-s-promotion {
                    font-size: 30px;
                    background-color: #2C92F6;
                    border-radius: 50%;
                    color: #fff;
                    padding: 10px;
                    height: 30px;
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
    .add-item {
        display: flex;
        justify-content: center;
        align-items: center;
        p {
            font-size: 14px;
            font-weight: bold;
            color: #666;
        }
    }
</style>
