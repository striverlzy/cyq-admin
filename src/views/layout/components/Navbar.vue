<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb class="breadcrumb-container"/>

    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="http://cyq-test.oss-cn-beijing.aliyuncs.com/message.png"/>
        <span class="sum-message" v-if="total>0">{{total}}</span>
        <img class="user-avatar" src="http://cyq-test.oss-cn-beijing.aliyuncs.com/tx.jpg">

      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <!--        <router-link class="inlineBlock" to="/">-->
        <!--          <el-dropdown-item>-->
        <!--            Home-->
        <!--          </el-dropdown-item>-->
        <!--        </router-link>-->
        <el-dropdown-item>
          <span @click="logout" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'
    import {getArticle} from '@/api/article'

    export default {
        data() {
            return {
                total: '',
                params: {
                    categoryId: '',
                    content: '',
                    filterContent: '',
                    title: '',
                    articleState: '0',
                    userId: '',
                    page: 1,
                    size: 1000
                },
                isTrue: true
            }
        },
        components: {
            Breadcrumb,
            Hamburger
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'avatar'
            ])
        },

        mounted() {
            this.getMessage()
        },
        methods: {
            getMessage() {
                if (this.isTrue) {
                    setInterval(() => {
                        this.getArticleData()
                    }, 1000)
                }
            },
            getArticleData() {
                if (this.isTrue) {
                    getArticle(this.params).then((res) => {
                        this.total = res.data.total
                        if (res.data.total > 0) {
                            this.message()
                            this.isTrue = false
                        }
                    })
                }
            },
            message() {
                this.isTrue = false
                this.$notify({
                    title: '提示',
                    onClose: () => {
                        this.isTrue = true
                    },
                    message: '您有需要审核的文章',
                    duration: 0
                });
            },
            toggleSideBar() {
                this.$store.dispatch('ToggleSideBar')
            },
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .sum-message {
    font-size: 18px;
  }

  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;

    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }

    .breadcrumb-container {
      float: left;
    }

    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }

    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;

      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        line-height: initial;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 20px;
        }

        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>

