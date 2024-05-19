<template>
  <div>
    <el-button type="primary"  style="width: 10%;" @click="addVideo()">新增视频</el-button>

    <div style="height: 20px"></div>
    <div class="containvideo">



      <el-dialog
          title="请输入视频集的内容"
          :visible.sync="goDealDialogVisible"
          width="50%"
          :before-close="goDealHandleClose">
        <template>
          <div>
            <div style="margin: 10px;"></div>
            <el-form label-width="100px">
              <el-form-item label="视频标题">
                <el-input v-model="addVideoDetail.topic" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="视频排名">
                <el-input v-model="addVideoDetail.sort" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="上传视频">

                <el-upload style="margin-left:14%;margin-top:5%"
                           class="avatar-uploader el-upload--text"
                           :drag="{Plus}"
                           action="http://127.0.0.1:8000/study/videos/save"
                           multiple
                           :show-file-list="false"
                           :data="addVideoDetail"
                           :on-success="handleVideoSuccess"
                           :before-upload="beforeUploadVideo"
                           :on-progress="uploadVideoProcess">
                  <i v-if="Plus" class="el-icon-upload"></i>
                  <div v-if="Plus" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
                  <div class="el-upload__tip" slot="tip">只能上传mp4/flv/avi文件，且不超过300M</div>
                </el-upload>





                <!--                            <el-upload-->
                <!--                                    class="upload-demo"-->
                <!--                                    :data="addVideoDetail"-->
                <!--                                    action="http://localhost:8000/study/videoTotal/save"-->
                <!--                                    :on-preview="handlePreview"-->
                <!--                                    :on-remove="handleRemove"-->
                <!--                                    :before-remove="beforeRemove"-->
                <!--                                    multiple-->
                <!--                                    :limit="3"-->
                <!--                                    :on-exceed="handleExceed"-->
                <!--                                    :file-list="uploadVideo.fileList">-->
                <!--                                <el-button size="small" type="primary">点击上传视频封面</el-button>-->
                <!--                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                <!--                            </el-upload>-->
              </el-form-item>

            </el-form>
          </div>
        </template>

        <span slot="footer" class="dialog-footer">
        <el-button @click="goDealDialogVisible = false,cancelBtn">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
        </span>
      </el-dialog>




      <div class="vid">
        <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions[count]"
            @play="onPlayerPlay($event,index)"
            @pause="onPlayerPause($event)"
        ></video-player>

<!--        <div style="margin: 20px 0;"></div>-->

<!--        留言： <p><el-input-->
<!--          type="textarea"-->
<!--          placeholder="请输入内容"-->
<!--          v-model="Ask.content"-->
<!--          maxlength="300"-->
<!--          show-word-limit></el-input>-->
<!--      </p>-->
<!--        <el-button type="success"  style="width: 10%" @click="answer(Ask)">留言</el-button>-->

<!--        <div style="margin: 200px 0;"></div>-->
      </div>


      <div class="videos">
        <ul>
          <vue-scroll :ops="ops"> 课程列表
            <li v-for="(item, index) in videolist" :key="index">
              <div class="videoInfo">
                <el-button class="el" @click="choose(index)">{{ item.topic }}</el-button>
                <el-button type="primary" @click="deletOneVideo(item.id)" v-if="roleId == 2">删除视频课程</el-button>
              </div>
            </li>
          </vue-scroll>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
import {videos,deleteVideo,askandanswer} from "../../../api/studentweb/video.js";
import Cookies from "js-cookie";

export default {
  name: "DetailOnlineWebTeacher",
  data() {
    return {
      goDealDialogVisible:false,
      Plus: true,
      addVideoDetail:{
        topic:'',
        sort:0,
        videoTotalId:'',
      },


      Ask:{
        content:'',
        sender:'',
        recipient:'',
        videoId:'',
      },
      videolist: [],
      playsinline: true,
      playerOptions: [],
      options: [],
      count: '0',
      roleId:'',
      deleteOneVideoName:{
        id:''
      },
      video: {
        videoTotalId: '',
      },
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true,
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: '#F5F5F5', //滚动条颜色
          opacity: 0.5, //滚动条透明度
          'overflow-x': 'hidden',
        },
        videoData: [],
        tagRoute:'',
      },
    };

  },




  created() {
    this.roleId=Cookies.get('roleId')
    this.Ask.sender=Cookies.get('userId')
    this.Ask.recipient = this.$route.query.userId;
    this.video.videoTotalId = this.$route.query.videoTotalId;
    this.addVideoDetail.videoTotalId = this.$route.query.videoTotalId;
    this.Ask.videoId = this.$route.query.videoTotalId;
    this.listAllStudentsScore(this.video)
    // this.getMovieList();
  },
  methods: {


    submit(){
      this.goDealDialogVisible=false;
      this.listAllStudentsScore(this.video);
    },




    // 视频上传前执行
    beforeUploadVideo (file) {
      const isLt300M = file.size / 1024 / 1024 < 30000000
      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) === -1) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
     /* if (!isLt300M) {
        this.$message.error('上传视频大小不能超过300MB哦!')
        return false
      }*/
    },
    // 视频上传过程中执行
    uploadVideoProcess (event, file, fileList) {
      this.Plus = false
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0)
    },
    // 视频上传成功是执行
    handleVideoSuccess (res, file) {
      this.Plus = false
      this.videoUploadPercent = 100
      console.log(res)
      // 如果为200代表视频保存成功
      if (res.resCode === '200') {
        // 接收视频传回来的名称和保存地址
        // 至于怎么使用看你啦~
        this.videoForm.videoId = res.newVidoeName
        this.videoForm.videoUrl = res.VideoUrl
        this.$message.success('视频上传成功！')
      } else {
        this.$message.success('视频上传成功')
      }
    },
















    addVideo(){
      this.goDealDialogVisible=true
      this.addVideoDetail.videoTotalId = this.$route.query.videoTotalId;
      setTimeout(this.listAllStudentsScore(this.video), 1);
    },


    answer(ask){
      askandanswer(ask).then(resp=>{
        if(resp.data.code==200){
          this.$message({
            message: '恭喜你，留言成功，请到问答社区查看结果',
            type: 'success'
          });
          this.$router.push("/askandanswer")
        }else{
          this.$message.error('留言失败');
        }
      })
    },
    choose(index) {
      this.count = index;
      console.log(index, '9999')
    },


    deletOneVideo(id){
      this.deleteOneVideoName.id=id
      deleteVideo(this.deleteOneVideoName).then(resp=>{
        if(resp.data.code==200){
          this.$message({
            message: '恭喜你，删除视频',
            type: 'success'
          });
          this.listAllStudentsScore(this.video)
        }else{
          this.$message.error('删除失败');
        }
      })
    },


    getMovieList() {
      // 这里正常来说应该是从后台获取的数据，以下操作都是在成功的回调函数里
      for (var i = 0; i < this.videolist.length; i++) {
        let arrs = {
          playbackRates: [1.0, 2.0, 3.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: "zh-CN",
          aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [
            {
              type: "video/mp4",
              src: this.videolist[i].videoUrl //url地址
            }
          ],
          poster: "", //封面地址
          notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true //全屏按钮
          }
        };
        this.playerOptions.push(arrs);
      }
      console.log(this.videolist.size, '888')
    },
    onPlayerPlay(player, index) {


      var that = this.$refs.videoPlayer;
      for (let i = 0; i < that.length; i++) {
        if (i != index)
          that[i].player.pause()
      }
    },
    onPlayerPause(player) {


    },

    listAllStudentsScore(page) {
      videos(page).then(resp => {
        this.videolist = resp.data.resultData;
        this.getMovieList();
        console.log(resp)

      })
    }
  }
}
</script>

<style scoped>
.containvideo {
  display: flex;
  justify-content: space-between;

}

.item{
  width: 20px;
  height: 20px;
  display: flex;
  justify-content:flex-start;
}

.videoInfo{
  display: flex;
  justify-content: space-between;
}
.videos {
  width: 20%;
  height: 50%;
  border: thick double yellow;
}

.vid {
  width: 80%;
  height: 20%;
}

.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #FFF;
  border: 1px solid #DCDFE6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  width: 100%;
}
</style>
