<template>
  <div style="padding: 15px">
    <br>
    <el-form :inline="true">
      <el-form-item label="标题">
        <el-input v-model="params.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="文章正文">
        <el-input v-model="params.filterContent" placeholder="文章正文"></el-input>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="params.articleState" placeholder="请选择">
          <el-option
            v-for="item in info.stateList"
            :key="item.articleState"
            :label="item.articleStateDetail"
            :value="item.articleState">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属标签">
        <el-select v-model="params.categoryId" placeholder="请选择">
          <el-option
            v-for="item in info.categoryList"
            :key="item.categoryId"
            :label="item.categoryName"
            :value="item.categoryId">
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
      <el-table-column prop="title" label="标题" style="width: 10%;text-align: center"></el-table-column>
      <el-table-column label="文章正文" style=" width: 70%;text-align: center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" content="点击预览" placement="top">
            <a @click="handleShow(scope.row.articleId)"><i class="el-icon-share"></i></a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="categoryName" label="标签所属" style="width: 70%;text-align: center"></el-table-column>
      <el-table-column prop="createDate" label="发表日期" style="width: 70%;text-align: center"></el-table-column>
      <el-table-column prop="articleStateDetail" label="状态" style="width: 20%;text-align: center"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        style="width: 10%;text-align: center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.articleState !== '0'" @click="handleCheck(scope.row.articleId)" type="info"
                     size="small" plain>已审核
          </el-button>
          <el-button v-else @click="handleCheck(scope.row.articleId)" type="info" size="small" plain>待审核</el-button>
          <el-button @click="handleDelete(scope.row.articleId)" type="info" size="small" plain
                     icon="el-icon-delete"></el-button>
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
    <el-dialog title="文章预览" :visible.sync="dialogFormVisible">
      <span v-if="!isHandleShow">{{pojo.title}}</span>

      <div v-html="pojo.content" class="show_img"></div>
      <el-button v-if="!isHandleShow" type="success" @click="handleOkChenk(pojo.articleId)">通过</el-button>
      <el-button v-if="!isHandleShow" type="danger" @click="handleUnChenk(pojo.articleId)">不通过</el-button>
      <el-button v-if="!isHandleShow" @click="dialogFormVisible = false">关闭</el-button>
    </el-dialog>
  </div>
</template>
<script>
    import {getArticle, addArticle, checkArticle, deleteArticle, unCheckArticle, findByArticleId} from '@/api/article'
    import {getUserById} from '@/api/user'
    import {getAllCategory} from '@/api/category'
    import BasicTypeUtil from '@/utils/BasicTypeUtil'

    export default {
        data() {
            return {
                isHandleShow: false,
                params: {
                    categoryId: '',
                    content: '',
                    filterContent: '',
                    title: '',
                    articleState: '',
                    userId: '',
                    page: this.currentPage,
                    size: this.pageSize
                },
                info: {
                    categoryList: [],
                    total: 0,
                    rows: [],
                    stateList: [
                        {
                            articleState: '2',
                            articleStateDetail: '未通过'
                        },
                        {
                            articleState: '1',
                            articleStateDetail: '通过'
                        },
                        {
                            articleState: '0',
                            articleStateDetail: '待审核'
                        }
                    ]
                },
                total: 0, // 总记录数
                currentPage: 1, // 当前页
                pageSize: 10, // 每页大小
                dialogFormVisible: false, // 编辑窗口是否可见
                pojo: {}, // 编辑表单绑定的实体对象
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
            getLoadData() {
                this.categoryData()
                this.clearSearch()
            },
            clearSearch() {
                this.params = {
                    categoryId: '',
                    content: '',
                    filterContent: '',
                    title: '',
                    userId: '',
                    articleState: '',
                    page: this.currentPage,
                    size: this.pageSize
                }
                this.doSearch()
            },
            doSearch() {
                let params = {
                    categoryId: this.params.categoryId || '',
                    content: this.content || '',
                    filterContent: this.filterContent || '',
                    title: this.title || '',
                    userId: '',
                    articleState: this.articleState || '',
                    page: this.currentPage,
                    size: this.pageSize
                }
                getArticle(params).then((res) => {
                    if (res) {
                        let list = []
                        let dataList = []
                        list = res.data.rows
                        this.info.total = res.data.total
                        for (let i = 0; i < list.length; i++) {
                            let articleStateDetail = ''
                            const {content, articleState, categoryId, categoryName, filterContent, userId, title, createDate,articleId} = list[i]
                            for (let j = 0; j < this.info.stateList.length; j++) {
                                if (this.info.stateList[j].articleState === articleState) {
                                    articleStateDetail = this.info.stateList[j].articleStateDetail
                                }
                            }
                            dataList.push({
                                content,
                                articleState,
                                filterContent,
                                title,
                                articleId,
                                categoryName,
                                articleStateDetail,
                                createDate: createDate
                            })
                        }
                        this.info.rows = dataList
                    }
                })
            },
            handleCheck(data) {
                this.isHandleShow = false
                this.dialogFormVisible = true
                findByArticleId(data).then((res) => {
                    if (res) {
                        this.pojo = res.data
                    }
                })
            },
            handleShow(data) {
                this.dialogFormVisible = true
                this.isHandleShow = true
                findByArticleId(data).then((res) => {
                    if (res) {
                        this.pojo = res.data
                    }
                })
            },
            handleUnChenk(id) {
                this.$confirm('确定要不通过此纪录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    unCheckArticle(id).then(response => {
                        this.$message({
                            message: response.message, type: (response.flag
                                ? 'success' : 'error')
                        })
                        if (response.flag) {
                            this.getLoadData() // 刷新数据
                        }
                        this.dialogFormVisible = false
                    })
                })
            },
            handleOkChenk(id) {
                this.$confirm('确定要通过此纪录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    checkArticle(id).then(response => {
                        this.$message({
                            message: response.message, type: (response.flag
                                ? 'success' : 'error')
                        })
                        if (response.flag) {
                            this.getLoadData() // 刷新数据
                        }
                        this.dialogFormVisible = false
                    })
                })
            },
            handleDelete(id) {
                this.$confirm('确定要删除此纪录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteArticle(id).then(response => {
                        this.$message({message: response.message, type: (response.flag ? 'success' : 'error')})
                        if (response.flag) {
                            this.getLoadData() // 刷新数据
                        }
                    })
                })
            },
            categoryData() {
                getAllCategory().then((res) => {
                    if (res) {
                        this.info.categoryList = res.data
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
  .show_img{
    /deep/ p{
      /deep/ img{
        width: 100%;
      }
    }


  }

</style>
