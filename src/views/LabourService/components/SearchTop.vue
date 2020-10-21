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
                <span class="search-title">工龄</span>
                <el-select v-model="age"
                            placeholder="请选择"
                            @change="handleChange">
                    <el-option v-for="item in ages"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"/>
                </el-select>
            </div>
        </div>
    </div>
</template>

<script>
    import {  mapState } from 'vuex'
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
                ages: [{
                    id: '',
                    name: '不限'
                }],
                age: ''
            }
        },
        computed: {
            ...mapState(['positionList', 'workYearsList'])
        },
        methods: {
            handleChange() {
                this.$emit('change', [this.job[this.job.length -1], this.location.join('·'), this.age])
            },
        },
        created() {
            this.jobs = this.jobs.concat(this.positionList)
            this.ages = this.ages.concat(this.workYearsList)
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
    /deep/ .el-input__inner {
        width: 220px !important;
    }
    /deep/ .el-select {
        width: 220px !important;
    }
</style>
