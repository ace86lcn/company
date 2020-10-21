<template>
    <div class="search">
        <p>搜索</p>
        <el-input
            :placeholder="placeholder"
            prefix-icon="el-icon-search"
            :style="`width: ${width}`"
            v-model="input">
        </el-input>
        <el-button type="primary"
                   style="margin-left: 10px"
                   @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
    </div>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: '请输入搜索内容'
            },
            width: {
                type: String,
                default: '403px'
            }
        },
        data() {
            return {
                input: ''
            }
        },
        methods: {
            search() {
                this.$emit('search', this.input)
            },
            reset() {
                this.input = ''
                this.$emit('reset', '')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search {
        display: flex;
        align-items: center;
        height: 74px;
        background-color: #fff;
        border-radius: 10px;
        padding: 0 30px;
        p {
            font-size: 16px;
            padding-right: 46px;
            color: #111;
            font-weight: 600;
        }
        /deep/ .el-button {
            margin-left: 29px !important;
        }
    }
</style>
