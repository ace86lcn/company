<template>
    <el-dialog
        :visible.sync="show"
        :width="width"
        :before-close="handleClose"
        :center="true">
        <div class="content">
			<h4 class="title">{{title}}</h4>
			<div class="content-text">
                <p class="content-item">
                    <span>姓名：</span>
                    <span>{{name}}</span>
                </p>
                <p class="content-item">
                    <span>联系方式：</span>
                    <span>{{mobile}}</span>
                </p>
                <p class="content-item">
                    <span>身份证号：</span>
                    <span>{{card}}</span>
                </p>
                <p class="content-remark">
                    通过后，将添加工人数据至<span>已招聘人员</span>模块中，确认通过？
                </p>
            </div>
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
				default: '请确认工人资料'
			},
			name: {
				type: String
			},
			mobile: {
				type: String
			},
			card: {
				type: String
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
            width: {
                type: String,
                default: '550px'
            }
        },
        methods: {
            handleClose() {
                this.$emit('close')
            },
            handleConfirm() {
                this.$emit('confirm')
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog__title {
        font-size: 18px;
        font-weight: 600;
    }
    .content {
        .title {
			font-size: 20px;
			color: #333333;
			padding: 25px 0 29px;
			text-align: center;
		}
		.content-text {
			font-size: 18px;
			color: #666;
			text-align: center;
			font-weight: 600;
            .content-item {
                display: flex;
                span {
                    &:first-child {
                        width: 120px;
                    }
                }
            }
            .content-remark {
                margin-top: 15px;
                span {
                    color: #3A62D7;
                }
            }
		}
    }
	/deep/ .el-dialog__body {
		padding: 0 100px 42px;
	}
    /deep/ .el-button {
        width: 125px;
        height: 40px;
        padding: 0;
    }
    /deep/ .el-button+.el-button {
        margin-left: 60px;
    }
	/deep/ .el-dialog__header {
		height: 40px;
		background-color: #3A62D7;
		padding: 0;
	}
	/deep/ .el-dialog__footer {
		padding: 0 72px 37px;
	}
</style>