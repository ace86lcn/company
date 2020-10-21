<template>
    <el-dialog
        :visible.sync="show"
        :width="width"
        :before-close="handleClose"
        :center="true"
        :title="title">
        <div class="content">
			<p class="content-text">{{content}}</p>
		</div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleConfirm">{{btn1Text}}</el-button>
            <el-button type="primary" 
                        v-if="showBtn2"
                        @click="handleClose">
                {{btn2Text}}
            </el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        props: {
			title: {
				type: String,
				default: '温馨提示'
			},
            show: {
                type: Boolean,
                default: false
            },
            showBtn2: {
                type: Boolean,
                default: true
            },
            btn1Text: {
                type: String,
                default: '确认'
            },
            btn2Text: {
                type: String,
                default: '取消'
            },
            content: {
                type: String
            },
            width: {
                type: String,
                default: '450px'
            },
            index: {
                type: Number,
                default: 0
            }
        },
        methods: {
            handleClose() {
                this.$emit('close')
            },
            handleConfirm() {
                this.$emit('confirm', this.index)
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog__title {
        font-size: 16px;
        line-height: 40px;
        color: #fff;
    }
	/deep/ .el-dialog__body {
		padding:  26px 55px;
	}
    /deep/ .el-button {
        width: 108px;
        height: 36px;
        padding: 0;
    }
    /deep/ .el-button+.el-button {
        margin-left: 32px;
    }
	/deep/ .el-dialog__header {
		height: 40px;
		background-color: $color;
		padding: 0;
        padding-left: 20px;
        text-align: left;
	}
	/deep/ .el-dialog__footer {
		padding: 0 72px 30px;
	}
    .content-text {
        text-align: center;
        color: #666;
        font-size: 18px;
        font-weight: bold;
    }
</style>