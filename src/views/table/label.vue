<template>
  <div style="padding: 15px">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="标签名称">
        <el-input v-model="params.categoryName" placeholder="标签名称">
        </el-input>
      </el-form-item>
      <el-form-item label="标签状态">
        <el-select v-model="params.categoryState" placeholder="请选择">
          <el-option
            v-for="item in info.stateList"
            :key="item.categoryState"
            :label="item.categoryStateDetail"
            :value="item.categoryState">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="doSearch()"  icon="el-icon-search">查询</el-button>
      <el-button type="primary" @click="handleEdit()" icon="el-icon-plus">新增</el-button>
      <el-button type="primary" @click="clearSearch()" icon="el-icon-refresh">重置</el-button>
    </el-form>
    <el-table :data="info.rows" border style="width: 100%">
      <el-table-column prop="categoryName" label="标签名称" style="width: 40%"></el-table-column>
      <el-table-column prop="categoryStateDetail" label="标签状态" style="width: 20%"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        style="width: 20%">
        <template slot-scope="scope">
          <el-button v-if="scope.row.categoryState === '1'" @click="handleUnLock(scope.row.categoryId)" type="info"
                     size="small" plain>
            禁用
          </el-button>
          <el-button v-if="scope.row.categoryState === '0'" @click="handleLock(scope.row.categoryId)" type="info"
                     size="small" plain>
            启用
          </el-button>
          <el-button @click="handleEdit(scope.row.categoryId)" type="info" size="small" plain icon="el-icon-edit">

          </el-button>
          <el-button @click="handleDelete(scope.row.categoryId)" type="info" size="small" plain icon="el-icon-delete">

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


    <el-dialog title="标签编辑" :visible.sync="dialogFormVisible">
    </el-dialog>


    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form label-width="80px">
        <el-form-item label="标签名称">
          <el-input v-model="pojo.categoryName" placeholder="标签名称"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch active-value="1" inactive-value="0" v-model="pojo.categoryState"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSave()" type="primary"> 保存</el-button>
          <el-button @click="dialogFormVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


  </div>
</template>

<script>
    import {
        getCategory,
        addCategory,
        deleteCategory,
        updateCategory,
        lockCategory,
        unlockCategory,
        findByCategoryId
    } from '@/api/category'

    export default {
        data() {
            return {
                params: {
                    categoryName: '',
                    categoryState: '',
                    categoryStateDetail: '',
                },
                info: {
                    total: 0,
                    rows: [],
                    stateList: [
                        {
                            categoryState: '1',
                            categoryStateDetail: '启用'
                        },
                        {
                            categoryState: '0',
                            categoryStateDetail: '禁用'
                        }
                    ]
                },
                dialogFormVisible: false,
                pojo: {
                    categoryId: '',
                    categoryName: '',
                    categoryState: '0',
                },
                total: 0,//总记录数
                currentPage: 1,//当前页
                pageSize: 10,//每页大小
                searchMap: {}//查询表单绑定变量
            }
        },
        created() {
            this.getLoadData()
        },
        methods: {
            sizeChange(data){
                this.pageSize = data
                this.doSearch()
            },
            currentChange(data){
                this.doSearch()
                this.currentPage = data
            },
            handleUnLock(id) {
                this.$confirm('确定要禁用吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    lockCategory(id).then(res => {
                        this.$message({
                            message: res.message,
                            type: (res.flag ? 'success' : 'error')
                        })
                        this.getLoadData()// 刷新数据
                    })
                }).catch(() => {
                });
            },
            handleLock(id) {
                this.$confirm('确定要启用吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    unlockCategory(id).then(res => {
                        this.$message({
                            message: res.message,
                            type: (res.flag ? 'success' : 'error')
                        })
                        this.getLoadData()// 刷新数据
                    })
                }).catch(() => {
                });
            },
            handleDelete(id) {
                this.$confirm('确定要删除此纪录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteCategory(id).then(response => {
                        this.$message({
                            message: response.message,
                            type: (response.flag ? 'success' : 'error')
                        })
                        if (response.flag) {
                            this.getLoadData()// 刷新数据
                        }
                    })
                }).catch(() => {
                });
            },
            handleSave() {
                if (this.id) {
                    updateCategory(this.pojo).then(response => {
                        this.$message({
                            message: response.message,
                            type: (response.flag ? 'success' : 'error')
                        });
                        if (response.flag) {//如果成功
                            this.getLoadData()//刷新列表
                        }
                    })
                } else {
                    console.log("this.pojo",this.pojo)
                    addCategory(this.pojo).then(response => {
                        this.$message({
                            message: response.message,
                            type: (response.flag ? 'success' : 'error')
                        });
                        if (response.flag) {//如果成功
                            this.getLoadData()//刷新列表
                        }
                    })
                }
                this.dialogFormVisible = false//关闭窗口
            },
            handleEdit(id) {
                this.id = id
                if (id) {
                    findByCategoryId(id).then((res) => {
                            this.pojo = res.data[0]
                    })
                } else {
                    this.pojo = {
                        categoryId: '',
                        categoryName: '',
                        categoryState: '0',
                    }
                }
                this.dialogFormVisible = true//打开窗口

            },
            clearSearch() {
                this.params = {
                    categoryName: '',
                    categoryState: '',
                    categoryStateDetail: '',
                }
                this.doSearch()
            },
            doSearch() {
                let params = {
                    categoryId: '',
                    categoryName: this.params.categoryName || '',
                    categoryState: this.params.categoryState || '',
                    page: this.currentPage,
                    size: this.pageSize
                }
                getCategory(params).then((res) => {
                    if (res) {
                        let list = []
                        let dataList = []
                        list = res.data.rows
                        this.info.total = res.data.total
                        for (let i = 0; i < list.length; i++) {
                            let name = ''
                            const {categoryName, categoryState, categoryId} = list[i]
                            for (let j = 0; j < this.info.stateList.length; j++) {
                                if (this.info.stateList[j].categoryState === categoryState) {
                                    name = this.info.stateList[j].categoryStateDetail
                                }
                            }
                            dataList.push({
                                categoryId, categoryName, categoryStateDetail: name, categoryState
                            })
                        }
                        this.info.rows = dataList
                    }
                })
            },
            getLoadData() {
                this.clearSearch()
            }
        }
    }
</script>
