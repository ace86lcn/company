<template>
    <div class="search-list">
        <div class="search-item-title">筛选</div>
        <div class="search-item-wrap">
            <div class="search-item">
                <span class="search-title">工种</span>
                <el-cascader v-model="job"
                            separator=" - "
                            :options="jobs"
                            @change="handleChange"/>
            </div>
            <div class="search-item">
                <span class="search-title">地区</span>
                <el-cascader v-model="location"
                            separator=" - "
                            :options="cities"
                            @change="handleChange"/>
            </div>
            <div class="search-item">
                <span class="search-title">状态</span>
                <el-select v-model="statu"
                        placeholder="请选择"
                            @change="handleChange">
                    <el-option v-for="item in status"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"/>
                </el-select>
            </div>
        </div>
    </div>
</template>

<script>
    import { CitieOptions } from '../../../utils/country-data'
    export default { 
        data() {
            return {
                job: ['0'],
                jobs: [{
                    value: '0',
                    label: '不限'
                }],     // value就是id，label就是name
                cities: CitieOptions,
                location: ['0'],
                // 状态
                status: [
                    {
                        value: '',
                        label: '不限'
                    },
                    {
                        value: '1',
                        label: '已发布'
                    }, {
                        value: '2',
                        label: '已下架'
                    },
                    {
                        value: '0',
                        label: '草稿'
                    }
                ],
                statu: ''
            }
        },
        methods: {
            handleChange() {
                this.$emit('change', [this.job[this.job.length -1], this.location.join('·'), this.statu])
            }
        },
        created() {
            this.jobs = this.jobs.concat(this.$store.state.positionList)
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
    .search-item-wrap {
        width: calc(100% - 85px);
        display: flex;
        align-items: center;
    }
    /deep/ .el-select {
        width: 220px !important;
    }
    /deep/ .el-input__inner {
        width: 220px !important;
    }
</style>
