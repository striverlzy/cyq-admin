<template>
  <div style="padding: 15px">
    <br>
    <el-form :inline="true">

      <el-form-item label="用户名">
        <el-input v-model="params.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="用户账号">
        <el-input v-model="params.userId" placeholder="用户账号"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="params.state" placeholder="请选择">
          <el-option
            v-for="item in info.stateList"
            :key="item.state"
            :label="item.stateDetail"
            :value="item.state">
          </el-option>
        </el-select>
      </el-form-item>


      <el-button type="primary" @click="doSearch()" icon="el-icon-search">查询</el-button>
      <el-button type="primary" @click="clearSearch()" icon="el-icon-refresh">重置</el-button>

    </el-form>
    <el-table
      :data="info.rows"
      border
      style="width: 100%">
      <el-table-column prop="username" label="用户名" style="width: 70%;text-align: center"></el-table-column>
      <el-table-column prop="mobile" label="用户账号" style="width: 70%;text-align: center"></el-table-column>
      <el-table-column prop="stateDetail" label="状态" style="width: 20%;text-align: center"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        style="width: 10%;text-align: center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state === '1'" @click="handleLock(scope.row.userId)" type="info" size="small" plain>加入黑名单</el-button>
          <el-button v-if="scope.row.state === '0'" @click="handleUnLock(scope.row.userId)" type="info" size="small" plain>解封</el-button>
<!--          <el-button @click="handleDelete(scope.row.userId)" type="info" size="small" plain icon="el-icon-delete">-->
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="currentPage"
      :page-sizes="[5,10,20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="info.total">
    </el-pagination>

<!--    <el-dialog title="详情" :visible.sync="dialogFormVisible">-->
<!--      {{pojo.title}}-->
<!--      <hr>-->
<!--      <div v-html='pojo.content'></div>-->
<!--      <el-button type="success" @click="handleExamine(pojo.id)">审核通过</el-button>-->
<!--      <el-button type="danger" @click="handleDelete(pojo.id)">删除</el-button>-->
<!--      <el-button @click="dialogFormVisible = false">关闭</el-button>-->
<!--    </el-dialog>-->
  </div>
</template>
<script>
    import {getUser, lockUser, unlockUser, getUserById} from '@/api/user'
    import BasicTypeUtil from '@/utils/BasicTypeUtil'

    export default {
        data() {
            return {
                params: {
                    userId: '',
                    username: '',
                    mobile: '',
                    sex: '',
                    state: '',
                    page: this.currentPage,
                    size: this.pageSize
                },
                info: {
                    total: 0,
                    rows: [],
                    stateList: [
                        {
                            state: '1',
                            stateDetail: '普通用户'
                        },
                        {
                            state: '0',
                            stateDetail: '黑名单用户'
                        }
                    ]
                },
                total: 0, // 总记录数
                currentPage: 1, // 当前页
                pageSize: 10, // 每页大小
                searchMap: {state: '0'}, // 查询条件
                dialogFormVisible: false, // 编辑窗口是否可见
                pojo: {}, // 编辑表单绑定的实体对象
                cityList: [], // 城市列表
                id: '' // 当前用户修改的ID
            }
        },
        created() {
            this.getLoadData()
        },
        methods: {
            sizeChange(data) {
                this.pageSize = data
                this.doSearch()
            },
            currentChange(data) {
                this.doSearch()
                this.currentPage = data
            },
            clearSearch() {
                this.params = {
                    userId: '',
                    username: '',
                    mobile: '',
                    sex: '',
                    state: '',
                    page: this.currentPage,
                    size: this.pageSize
                }
                this.doSearch()
            },
            doSearch() {
                let params = {
                    userId: this.params.userId || '',
                    username: this.params.username || '',
                    mobile: this.params.mobile || '',
                    sex: this.params.sex || '',
                    state: this.params.state || '',
                    page: this.currentPage,
                    size: this.pageSize
                }
                getUser(params).then((res) => {
                    if (res) {
                        let list = []
                        let dataList = []
                        list = res.data.rows
                        this.info.total = res.data.total
                        for (let i = 0; i < list.length; i++) {
                            let name = ''
                            const {userId, mobile, password,username,sex,registerDate,age,personImage,state} = list[i]
                            for (let j = 0; j < this.info.stateList.length; j++) {
                                if (this.info.stateList[j].state === state) {
                                    name = this.info.stateList[j].stateDetail
                                }
                            }
                            dataList.push({
                                userId, mobile, password,username,sex,
                                registerDate:BasicTypeUtil.formateDate(new Date(registerDate)),
                                age,personImage,state,stateDetail: name
                            })
                        }
                        this.info.rows = dataList
                    }
                })
            },
            getLoadData() {
                this.clearSearch()
            },
            handleLock(id) {
                this.$confirm('确定要将此用户加入黑名单吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    lockUser(id).then(response => {
                      this.$message({
                        message: response.message, type: (response.flag
                          ? 'success' : 'error')
                      })
                      if (response.flag) {
                        this.getLoadData() // 刷新数据
                      }
                    })
                })
            },
            handleUnLock(id) {
                this.$confirm('确定要解封此用户吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    unlockUser(id).then(response => {
                      this.$message({
                        message: response.message, type: (response.flag
                          ? 'success' : 'error')
                      })
                      if (response.flag) {
                        this.getLoadData() // 刷新数据
                      }
                    })
                })
            },
            handleDelete(id) {
                this.$confirm('确定要删除此用户吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // articleApi.deleteById(id).then(response => {
                    //   this.$message({message: response.message, type: (response.flag ? 'success' : 'error')})
                    //   if (response.flag) {
                    //     this.fetchData() // 刷新数据
                    //   }
                    // })
                })
            }
        }
    }
</script>
