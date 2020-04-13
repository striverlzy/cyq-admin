<template>
  <div style="padding: 15px">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="活动名称">
        <el-input v-model="params.title" placeholder="活动名称">
        </el-input>
      </el-form-item>
      <el-form-item label="主办方">
        <el-input v-model="params.sponsor" placeholder="主办方">
        </el-input>
      </el-form-item>
      <el-form-item label="活动日期">
        <el-date-picker
          @change="searchDoubleDate"
          v-model="params.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy年MM月dd日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-button type="primary" @click="doSearch()" icon="el-icon-search">查询</el-button>
      <el-button type="primary" @click="handleEdit()" icon="el-icon-plus">新增</el-button>
      <el-button type="primary" @click="clearSearch()" icon="el-icon-refresh">重置</el-button>
    </el-form>
    <el-table :data="info.rows" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180"></el-table-column>
      <el-table-column label="活动图片" width="180">
        <template slot-scope="scope">
          <img
            style="width: 100px; height: 100px"
            :src="scope.row.gatheringImage"
          ></img>
        </template>
      </el-table-column>
      <el-table-column prop="sponsor" label="主办方" width="180"></el-table-column>
      <el-table-column prop="address" label="活动地址" width="180"></el-table-column>
      <el-table-column prop="date" label="活动日期" width="180">
      </el-table-column>
      <el-table-column prop="signNum" label="报名人数" width="180">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        style="width: 20%">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row.gatheringId)" type="info" size="small" plain icon="el-icon-edit">
          </el-button>
          <el-button @click="handleDelete(scope.row.gatheringId)" type="info" size="small" icon="el-icon-delete" plain>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="getLoadData"
      @current-change="getLoadData"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="info.total">
    </el-pagination>


    <el-dialog title="活动编辑" :visible.sync="dialogFormVisible">
    </el-dialog>


    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
      <el-form label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="pojo.title" placeholder="活动名称"></el-input>
        </el-form-item>

        <el-form-item label="活动介绍">
          <el-input v-model="pojo.introduction" placeholder="活动介绍" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="活动详情">
          <el-input v-model="pojo.detail" placeholder="活动详情" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="活动官网">
          <el-input v-model="pojo.internetUrl" placeholder="活动官网"></el-input>
        </el-form-item>
        <el-form-item label="举办地点">
          <el-input v-model="pojo.address" placeholder="举办地点"></el-input>
        </el-form-item>
        <el-form-item label="主办方">
          <el-input v-model="pojo.sponsor" placeholder="举办地点"></el-input>
        </el-form-item>


        <el-form-item label="活动日期">
          <el-date-picker
            @change="addDate"
            v-model="pojo.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报名截止">
          <el-date-picker type="date" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" v-model="pojo.signEnd"
                          placeholder="报名截止"></el-date-picker>
        </el-form-item>
        <el-form-item label="活动图片">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="upLoad">
            <img v-if="pojo.gatheringImage" :src="pojo.gatheringImage" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>

          </el-upload>
          <el-button v-if="imageName" @click="photoRemove()" type="info" size="small" icon="el-icon-delete" plain>
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-button @click="handleSave(isUpdate)" type="primary"> 保存</el-button>
          <el-button @click="dialogFormVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


  </div>
</template>

<script>
    import {client, put, remove} from '@/utils/fileUtils'
    import {getGathering, publishGathering, deleteGathering, updateGathering, findGathingById} from '@/api/gathering'

    export default {
        data() {
            return {
                params: {
                    date: '',
                    gatheringId: '',
                    gatheringImage: '',
                    introduction: '',
                    address: '',
                    detail: '',
                    startDate: '',
                    endDate: '',
                    signEnd: '',
                    signIds: '',
                    signNum: '',
                    internetUrl: '',
                    sponsor: '',
                    title: '',
                    articleState: '',
                    state: '',
                    page: this.currentPage,
                    size: this.pageSize
                },
                info: {
                    gatheringList: [
                        {
                            state: '0',
                            name: '已结束'
                        },
                        {
                            state: '1',
                            name: '最热活动'
                        }
                    ],
                    total: 0,
                    rows: []
                },
                imageName: '',
                dialogFormTitle: '',
                dialogFormVisible: false,
                total: 0,//总记录数
                currentPage: 1,//当前页
                pageSize: 10,//每页大小
                pojo: {},
                isUpdate: false
            }
        },
        created() {
            this.getLoadData()
        },
        methods: {
            addDate(item) {
                if (item) {
                    this.pojo.startDate = item[0]
                    this.pojo.endDate = item[1]
                } else {
                    this.pojo.startDate = ""
                    this.pojo.endDate = ""
                }
            },
            searchDoubleDate(item) {
                if (item) {
                    this.params.startDate = item[0]
                    this.params.endDate = item[1]
                } else {
                    this.params.startDate = ""
                    this.params.endDate = ""
                }
            },
            upLoad(item) {  // item 是当前本地上传的这张图片
                // 随机命名
                let fileName = item.file.name  // 当前本地上传的这张图片的名称(没有时间日期)
                let date = new Date()
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                month = (month < 10 ? '0' + month : month)
                let mydate = date.getDate()
                mydate = (mydate < 10 ? '0' + mydate : mydate)
                this.baseurl = 'img/' + year + '/' + year + month + '/' + year + month + mydate + '/'
                // 这里是把时间+图片名称拼接起来形成一个新的图片上传至oss，目的是区别于本地图片的名称，避免名称相同会误删，同时便于查看oss上最新上传图片的时间点
                let filePath = year + month + mydate + '-' + fileName

                let file = item.file // 当前本地上传的这张图片
                put(filePath, file).then(result => {  // 调oss api 上传图片
                    console.log("result", result)
                    // 文件上传成功后，获取返回值中的文件名name，并把其放入fileList数组中，表示当前已上传的文件
                    this.pojo.gatheringImage = result.url
                    this.imageName = result.name
                })
            },
            photoRemove() {  // file 当前本地已上传的这张图片
                let removeName = this.imageName  // 当前本地已上传的这张图片的名称(带有时间日期)
                remove(removeName).then(result => {
                    this.pojo.gatheringImage = ''
                    this.imageName = ''
                    if (result.res.status != '204') {
                        console.log('删除失败')
                    }
                })
            },
            handleAvatarSuccess(res, file) {

            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
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
                    gatheringId: '',
                    gatheringImage: '',
                    introduction: '',
                    address: '',
                    detail: '',
                    startDate: '',
                    endDate: '',
                    signEnd: '',
                    signIds: '',
                    signNum: '',
                    internetUrl: '',
                    sponsor: '',
                    isHost: '',
                    title: '',
                    articleState: '',
                    page: this.currentPage,
                    size: this.pageSize
                }
                this.doSearch()
            },
            doSearch() {
                let params = {
                    gatheringId: this.params.gatheringId || '',
                    gatheringImage: this.params.gatheringImage || '',
                    introduction: this.params.introduction || '',
                    address: this.params.address || '',
                    detail: this.params.detail || '',
                    startDate: this.params.startDate || '',
                    endDate: this.params.endDate || '',
                    signEnd: this.params.signEnd || '',
                    signIds: this.params.signIds || '',
                    signNum: this.params.signNum || '',
                    internetUrl: this.params.internetUrl || '',
                    sponsor: this.params.sponsor || '',
                    title: this.params.title || '',
                    isHost: this.params.isHost || '',
                    page: this.currentPage,
                    size: this.pageSize
                }
                getGathering(params).then((res) => {
                    if (res) {
                        let list = []
                        let dataList = []
                        list = res.data.rows
                        this.info.total = res.data.total
                        for (let i = 0; i < list.length; i++) {
                            let stateDetail = ''
                            const {gatheringId, gatheringImage, introduction, address, detail, startDate, endDate, signEnd, signIds, signNum, internetUrl, sponsor, title} = list[i]
                            dataList.push({
                                gatheringId, gatheringImage,
                                introduction, address,
                                detail,
                                date: startDate + "至" + endDate,
                                signEnd,
                                signIds, signNum,
                                internetUrl,
                                sponsor, title,
                                stateDetail
                            })
                        }
                        this.info.rows = dataList
                    }
                })
            },
            handleDelete(id) {
                this.$confirm('确定要删除此活动吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteGathering(id).then(response => {
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
            handleSave(isUpdate) {
                if (isUpdate) {
                    updateGathering(this.pojo).then(response => {
                        this.$message({
                            message: response.message,
                            type: (response.flag ? 'success' : 'error')
                        });
                        if (response.flag) {//如果成功
                            this.getLoadData()//刷新列表
                        }
                    })
                } else {
                    publishGathering(this.pojo).then(response => {
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
            upDateRefresh(){
                this.isUpdate = false
                this.$nextTick(() => this.isUpdate = true)
            },
             addRefresh(){
                this.isUpdate = true
                this.$nextTick(() => this.isUpdate = false)
            },
            async handleEdit(id) {
                if (id) {
                     await this.upDateRefresh()
                    this.dialogFormVisible = true//打开窗口
                    this.dialogFormTitle = '编辑'
                    this.getGathingById(id)
                } else {
                    await this.addRefresh()
                    this.dialogFormTitle = '新增'
                    this.pojo = {}
                    this.dialogFormVisible = true//打开窗口
                }
            },
            getGathingById(id) {
                findGathingById(id).then((res) => {
                    if (res) {
                        this.pojo = {...this.pojo, ...res.data[0]}
                    }
                })
            },
            getLoadData() {
                this.clearSearch()
            }
        }
    }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
