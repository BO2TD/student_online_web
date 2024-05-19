<template>
  <div>
    <div style="float: left">
      <el-input placeholder="请输入搜索内容" v-model="key" class="input-with-select" style="max-width: 600px">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div style="float: right">
      <el-button type="primay" @click="uploadddVideo()">新增课程</el-button>
    </div>
    <div style="clear: both"></div>


    <div style="height: 20px"></div>
    <el-dialog
        title="请输入视频集的内容"
        :visible.sync="goDealDialogVisible"
        width="50%">
      <template>
        <div>
          <div style="margin: 10px;"></div>
          <el-form label-width="100px">
            <el-form-item label="课程名称">
              <el-input v-model="uploadVideo.topic" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="上传课程封面">
              <el-upload
                  class="upload-demo"
                  ref="upload"
                  :data="uploadVideo"
                  action="http://127.0.0.1:8000/study/videoTotal/save"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="uploadVideo.fileList">
                <el-button size="small" type="primary">点击上传课程封面</el-button>
                <!--                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-form-item>

          </el-form>
        </div>
      </template>

      <span slot="footer" class="dialog-footer">
        <el-button @click="goDealDialogVisible = false,cancelBtn">取 消</el-button>
        <el-button type="primary" @click="submit(videoParam)">确 定</el-button>
        </span>
    </el-dialog>



    <div class="dem">

      <div class='demo' v-for="url in videoData">
        <div >
          <router-link   :to="{path:'/teachervideo', query:{videoTotalId:url.id}}"  >
            <el-image :src=url.coverUrl></el-image>
          </router-link>
          <h3>{{url.topic}}</h3>
          <el-button type="primary" @click="deleteAllVideos(url.id)">删除课程</el-button>
        </div>
      </div>
    </div>
    <div style="height: 20px"></div>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="videoData.length">
    </el-pagination>
  </div>
</template>

<script>
import {listVideo,savaVideo,deleteVideos} from '../../api/video.js'
import Cookies from "js-cookie";
export default {
  name: "Video",
  data(){
    return{
      key: '',

      goDealDialogVisible:false,
      page:{
        page:1, //初始页
        pageSize:10,    //    每页的数据
        userId:'',
        roleId:'',
      },

      uploadVideo:{
        topic:'',
        userId:0,
      },


      videoData:[],
      videoParam:{
        fileList:'',
        title:'',
        userId:'',
      },
      deleteparam:{
        id:''
      }

    }
  },
  created() {
    this.page.userId=Cookies.get('userId')
    this.page.roleId=Cookies.get('roleId')
    this.videoParam.userId=Cookies.get('userId')
    this.listAllVideos(this.page)
  },
  methods:{
    deleteAllVideos(id){
      this.deleteparam.id=id
      this.$confirm('此操作将永久删除该视频集下的所有视频, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteVideos(this.deleteparam) .then(resp=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.listAllVideos(this.page)
        })
        this.listAllVideos(this.page)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });



    },


    uploadddVideo(){
      this.goDealDialogVisible=true,
          this.uploadVideo.userId=Cookies.get('userId')
      this.listAllVideos(this.page)
    },


    submit(videoParam){
      this.$refs.upload.submit();
      this.goDealDialogVisible=false
      this.listAllVideos(this.page)
      this.uploadVideo.topic = '';
      this.uploadVideo.fileList = [];
      console.log(this.uploadVideo)

      // savaVideo(videoParam).then(resp=>{
      //     if(resp.data.code==200){
      //         this.$message({
      //             message: '新增视频集成功',
      //             type: 'success'
      //         });
      //         this.listAllVideos(this.page)
      //     }else{
      //         this.$message.error('新增视频集失败');
      //     }
      // })
    },
    listAllVideos(page){
      listVideo(page).then(resp=>{
        this.videoData=resp.data.resultData.data
      })
    },
    handleSizeChange(size) {
      this.page.pageSize = size;
      this.listAllStudentsScore(this.page)
      // console.log(this.pageSize,'888')

      console.log(`每页 ${size} 条`);
    },
    handleCurrentChange(pageNum) {
      this.page.pageNum = pageNum;
      this.listAllStudentsScore(this.page)
      console.log(`当前页: ${pageNum}`);
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    search() {
      if (this.key === '') {
        this.listAllVideos(this.page)
      } else {
        this.videoData = this.videoData.filter((item) => {
          return item.topic.indexOf(this.key) !== -1
        })
      }
    }

  }
}
</script>

<style scoped>
.demo{
  width: 200px;
  /*height: 20%;*/
  text-align: center;
  line-height: 20%;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  margin-right: 4px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

}
el-button{
  display: inline-block;
}

.course{
  display: inline-block;
}
.ta{
  display: flex;
  justify-content: space-between;
}
.dem{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.el-image__inner {
  vertical-align: top;
  height: 200px;
}
.demo:hover{
  display: block;
}
</style>