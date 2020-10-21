<template>
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="size"
      layout="prev, pager, next"
      :total="total"
        background
        v-if="total > 0">
    </el-pagination>
</template>

<script>
    export default {
        props: {
            total: {
                type: Number,
                default: 0
            },
            size: {
                type: Number,
                default: 10
            }
        },
        data() {
            return {
                
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.$emit('update:page', val)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-pagination {
        padding: 40px 53px;
        background-color: #fff;
        z-index: 999;
        display: flex;
        justify-content: flex-end;
        /deep/ .el-pagination__total {
            color: #3B3B3B;
        }
        /deep/ button {
            background-color: #fff !important;
            border: 1px solid $color;
            color: #3B3B3B !important;
            padding: 0 10px !important;
        }
        /deep/ li {
            background-color: #fff !important;
            border: 1px solid $color;
            color: #3B3B3B !important;
            padding: 0 10px !important;
            margin: 0 !important;
            margin-right: 5px !important;
        }
        /deep/ .el-pager li:not(.disabled).active {
            background-color: $color !important;
            color: #fff !important;
        }
        /deep/ .el-pager li.active+li {
            border-left: 1px solid $color;
        }
        /deep/ .btn-prev {
            margin-left: 10px;
        }
        // /deep/ .el-input__inner {
        //     border-color: #3A62D7;
        // }
    }
</style>