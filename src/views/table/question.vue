<template>
  <div style="padding: 15px">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="params.title" placeholder="标题">
        </el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="params.content" placeholder="内容">
        </el-input>
      </el-form-item>
      <el-button type="primary" @click="doSearch()"  icon="el-icon-search">查询</el-button>
      <el-button type="primary" @click="clearSearch()" icon="el-icon-refresh">重置</el-button>
    </el-form>
    <el-table :data="info.rows" border style="width: 100%">
      <el-table-column prop="title" label="标题" style="width: 40%"></el-table-column>
      <el-table-column prop="content" label="内容" style="width: 20%"></el-table-column>
      <el-table-column prop="userName" label="发布人" style="width: 20%">
        <template slot-scope="scope">
          <div>
            <img :src="scope.row.userImage" style="width: 20px;height: 20px;border-radius: 4px">
            <span>{{scope.row.userName}}</span>
          </div>



        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="发布时间" style="width: 20%"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        style="width: 20%">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.row.questionId)" type="info" size="small" plain icon="el-icon-delete">

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


  </div>
</template>

<script>
    import {
        getQuestion,
        deleteQuestion
    } from '@/api/question'

    export default {
        data() {
            return {
                params: {
                    userId: '',
                    userName: '',
                    title: '',
                    content: '',
                    searchState: '1'
                },
                info: {
                    total: 0,
                    rows: []
                },
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
            handleDelete(id) {
                this.$confirm('确定要删除此纪录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteQuestion(id).then(response => {
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
            clearSearch() {
                this.params = {
                    userId: '',
                    userName: '',
                    title: '',
                    content: '',
                    searchState: '1'
                }
                this.doSearch()
            },
            doSearch() {
                let params = {
                    userId: '',
                    userName: '',
                    title: this.params.title,
                    content: this.params.content,
                    searchState: '1',
                    page: this.currentPage,
                    size: this.pageSize
                }
                getQuestion(params).then((res) => {
                    if (res) {
                        this.info.total = res.data.total
                        this.info.rows = res.data.rows
                    }
                })
            },
            getLoadData() {
                this.clearSearch()
            }
        }
    }
</script>
