<template>
    <div >
        <div class="detail">
            <!-- 筛选 -->
            <div class="search-list"
                    style="margin-top: 15px">
                <div class="search-item-title">筛选</div>
                <div class="search-item">
                    <span class="search-title">所属项目</span>
                    <el-select v-model="value"
                            placeholder="请选择"
                            style="width: 310px"
                            @change="getList">
                        <el-option v-for="item in options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"/>
                    </el-select>
                </div>
            </div>
            <search placeholder="请输入姓名、身份证号、手机号搜索"
                    @search="handleSearch"
                    @reset="handleReset"
                    width="386px"/>
            <div class="btn-group">
                <el-button type="primary" @click="excel">批量导出excel</el-button>
                <el-button type="primary" @click="del('all')">批量删除</el-button>
            </div>
            <!-- table -->
            <el-table
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%; margin-top: 20px"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection"
                                width="55"/>
                <el-table-column prop="name"
                                label="姓名"/>
                <el-table-column prop="card_number"
                                label="身份证号"
                                width="250"/>
                <el-table-column prop="mobile"
                                label="手机号"/>
                <el-table-column prop="position"
                                label="报名工种"/>
                <el-table-column prop="wage_type_text"
                                label="报名薪资（元）"/>
                <el-table-column prop="project_name"
                                label="所属项目"/>
                <el-table-column
                    label="操作"
                    width="120">
                    <template slot-scope="scope">
                        <p class="table-handle">
                            <span style="margin-left: 15px" @click="del(scope.row.id)">删除</span>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <pages :page.sync="page" :total="total"/>
        </div>
        <!-- 删除弹窗 -->
        <handle-dialog  :show="show"
                        content="删除后将不能恢复，确认删除？"
                        @close="show = false"
                        @confirm="del2"/>
    </div>
</template>

<script>
	import { GetProjectList } from '@/api/common'
    import { AgreeSignUpList, DelAgreeSignUp } from '@/api/recruit'
    export default {
        components: {
            'HandleDialog': () => import('@/components/HandleDialog')
        },
        data() {
            return {
            // 所属项目
                options: [{
                    id: '',
                    name: '不限'
                }],
                value: '',
                page: 1,
                total: 0,
                tableData: [],
                content: '',
                multipleSelection: [], //选中表格数据   
                show: false,
                ids: ''               // 选中id
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
                this.$http(AgreeSignUpList, {
                    project_id: this.value,
                    content: '',
                    page: this.page,
                    type: 1
                })
                .then(res => {
                    if(res.data.code === 200) {
                        this.total = res.data.data.total
                        this.tableData = res.data.data.data
                    }
                })
            },
            del(all) {
                this.show = true
                if(all == 'all') {
                    if(this.multipleSelection.length > 0) {
                        let arr = []
                        this.multipleSelection.map(item => {
                            arr.push(item.id)
                        })
                        this.ids = arr.join(',')
                    }
                } else {
                    this.ids = all
                }
            },
            del2() {
                this.show = false
                this.$http(DelAgreeSignUp, { ids: this.ids })
                .then(res => {
                    if(res.data.code === 200) {
                        this.$msg.Success('删除成功')
                        this.page = 1
                        this.getList()
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            excel() {
                if(this.multipleSelection.length > 0) {
                    let arr = []
                    this.multipleSelection.map(item => {
                        arr.push(item.id)
                    })
                    this.ids = arr.join(',')
                    window.open(`${this.domain}/admin/SmallBringIn/excelFileExportClass?ids=${this.ids}`,'_blank')
                }
            }
        },
        created() {
            // 获取项目列表
            this.$http(GetProjectList)
            .then(res => {
                if(res.data.code === 200) {
                    this.value = ''
                    this.options = [{
                        id: '',
                        name: '不限'
                    }].concat(res.data.data)
                }
            })
            this.getList()
        }
    }
</script>

<style lang="scss" scoped>
    .search-item-title {
        font-size: 18px;
        padding-right: 26px;
        color: #666;
        font-weight: 600;
        line-height: 40px;
    }
    .search {
        padding: 0 !important;
    }
    .btn-group {
        margin-top: 20px;
        button {
            margin-right: 30px;
        }
    }
</style>
