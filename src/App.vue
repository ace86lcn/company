<template>
  <div id="app">
    <transition name="fade" mode="out-in">
			<router-view/>
		</transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { GetUserStatus, GetServiceMobile, GetThreeList } from '@/api/common'
export default {
  computed: {
    ...mapState(['authStatus', 'token', 'companyIsPass'])
  },
  watch: {
    $route(to,from){
      if(this.token) {
        if(!to.meta.noLogin) {
          let cs_auth_status = this.authStatus
          if(!this.companyIsPass) {
            this.$http(GetUserStatus)
            .then(res => {
              this.$store.commit('changeAuthStatus', res.data.data)
              if(res.data.code === 200) {
                if(res.data.data == 0) {
                  this.$router.replace('/real/under-review')
                } else if(res.data.data == 1) {
                  this.$router.replace('/real/audit-failure')
                }  else if(res.data.data == 4) {
                  this.$router.replace('/real/authentication')
                } else if(res.data.data == 2) {
                  this.$store.commit('changeCompanyPass', true)
                }
              }
            })
          }
        }
      }
    }
  },
  created() {
    // 获取客服号码
    this.$http(GetServiceMobile)
    .then(res => {
      if(res.data.code === 200) {
        this.$store.commit('changeServiceMobile', res.data.data.mobile)
      }
    })

    // 获取职位/薪资/工龄列表
    this.$http(GetThreeList)
    .then(res => {
      if(res.data.code === 200) {
        let positionList = res.data.data.positionList
        positionList.map(item => {
          item.value = item.id
          item.label = item.name
          if(item.children) {
            item.children.map(i => {
              i.value = i.id
              i.label = i.name
            })
          }
        })
        this.$store.commit('changePositionList', positionList)
        this.$store.commit('changeWageList', res.data.data.wageList)
        this.$store.commit('changeWorkYearsList', res.data.data.workYearsList)
      }
    })
  }
}
</script>

<style lang="scss">
  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
