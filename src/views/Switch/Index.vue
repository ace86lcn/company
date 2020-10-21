<template>
    <div>
        <div class="switch-group">
            <div class="switch-item">
                <h2>摩云劳务实名制管理端</h2>
                <p>平台说明：企业可以创建、管理项目及人员，实现劳务实名制化管理</p>
                <button @click="openUrl('http://smz.aibanzhuan.cn')">一键切换</button>
            </div>
            <div class="switch-item">
                <h2>摩云劳务项目现场端</h2>
                <p>平台说明：企业的项目管理人员可以创建、管理班组及人员，实现项目人员现场管理</p>
                <button @click="openUrl('http://xianchang.caishui.hzjyun.com')">一键切换</button>
            </div>
        </div>
        <div class="switch-group" style="margin-top: 40px">
            <div class="switch-item">
                <h2>摩云劳务财务端</h2>
                <p>平台说明：企业的财务人员使用的管理公司财务,包括合同、代发工资、社保、考勤等</p>
                <button @click="openUrl('http://finance.moyuniot.com')">一键切换</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        openUrl(url) {
            window.open(url, '_blank')
        }
    }
}
</script>

<style lang="scss" scope>
    .switch-group {
        display: flex;
        .switch-item {
            width: 40%;
            box-sizing: border-box;
            border-radius: 10px;
            padding: 30px;
            background-color: $color;
            h2 {
                font-size: 18px;
                color: #fff;
            }
            p {
                font-size: 14px;
                color: #fff;
                margin-top: 20px;
            }
            button {
                margin-top: 20px;
                background-color: $color;
                border-radius: 10px;
                border: 1px solid #fff;
                color: #fff;
                font-size: 16px;
                padding: 8px 50px;
                cursor: pointer;
            }
            &:first-child {
                margin-right: 40px;
            }
        }
    }
</style>