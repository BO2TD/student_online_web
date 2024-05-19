<template>
  <div>
    <!--        <el-button type="primary"  style="width: 10%;" @click="addVideo()">新增视频</el-button>-->

    <div style="margin-left: 20px;">
      <h1>{{ className }}</h1>
    </div>

    <div style="height: 20px"></div>
    <div class="containvideo">

      <div class="vid student-vid">
        <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions[count]"
            @pause="onPlayerPause($event)"
            @ended="onPlayerEnded($event)"
        ></video-player>
      </div>


      <div class="videos">
        <ul>
          <vue-scroll :ops="ops"> 课程列表
            <li v-for="(item, index) in videolist" :key="index">
              <div class="videoInfo">
                <el-button :disabled="index !== count" class="el">{{ item.topic }} <span v-if="item.isComplete">(已完成)</span> </el-button>
              </div>
            </li>
          </vue-scroll>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
import {videos, deleteVideo, askandanswer, videoHistory} from "../../../api/studentweb/video.js";
import Cookies from "js-cookie";
import {saveUserVideo, saveUserVideoTotal} from "@/api/video";

export default {
  name: "DetailOnlineWeb",
  data() {
    return {
      videoCurrentTime: 0,

      className: '',

      goDealDialogVisible: false,
      Plus: true,
      addVideoDetail: {
        topic: '',
        sort: 0,
        videoTotalId: '',
      },


      Ask: {
        content: '',
        sender: '',
        recipient: '',
        videoId: '',
      },

      videolist: [],
      completeVideo: [],
      page: {
        page: 1, //初始页
        pageSize: 10,    //    每页的数据
        userId: '',
        roleId: ''
      },

      playsinline: true,
      playerOptions: [],
      options: [],
      count: 0,
      roleId: '',
      deleteOneVideoName: {
        id: ''
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
        tagRoute: '',
      },
    };

  },

  created() {
    this.roleId = Cookies.get('roleId')
    this.Ask.sender = Cookies.get('userId')

    this.page.userId = Cookies.get('userId')

    this.Ask.recipient = this.$route.query.userId;
    this.video.videoTotalId = this.$route.query.videoTotalId;
    this.addVideoDetail.videoTotalId = this.$route.query.videoTotalId;
    this.Ask.videoId = this.$route.query.videoTotalId;
    this.listAllStudentsScore(this.video)
    this.listVideoHistory(this.page)
    // this.getMovieList();
  },
  mounted() {
    this.className = this.$route.query.name;
  },
  methods: {
    choose(index) {
      this.count = index;
      console.log(this.count, '9999')
    },

    getMovieList() {
      // 这里正常来说应该是从后台获取的数据，以下操作都是在成功的回调函数里
      for (var i = 0; i < this.videolist.length; i++) {
        let arrs = {
          // playbackRates: [1.0, 2.0, 3.0], //播放速度
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
            fullscreenToggle: false //全屏按钮
          }
        };
        this.playerOptions.push(arrs);
        this.videolist[i].isComplete = false;
      }

      console.log(this.completeVideo)
      for (let i = 0; i < this.completeVideo.length; i++) {
        for (let j = 0; j < this.videolist.length; j++) {
          if (this.completeVideo[i].videoId === this.videolist[j].id) {
            this.videolist[j].isComplete = true;
            if (j === 0) {
              this.count = j+1;
            } else if (this.videolist[j-1].isComplete === true) {
              this.count = j+1;
            }
          }
        }
      }

      console.log(this.videolist, '888')
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

    onPlayerEnded($event) {
      console.log('播放结束')

      if (this.count === this.videolist.length - 1) {
        saveUserVideo({
          userId: Cookies.get('userId'), videoId: this.videolist[this.count].id,
          videoTotalId: this.$route.query.videoTotalId
        }).then(response => {
          saveUserVideoTotal({
            userId: Cookies.get('userId'), videoTotalId: this.$route.query.videoTotalId
          }).then(response => {
            console.log('你已经学完本课程！')
            this.$alert('你已经学完本课程！', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.count++;
              }
            });
          })
        })
      } else {
        saveUserVideo({
          userId: Cookies.get('userId'), videoId: this.videolist[this.count].id,
          videoTotalId: this.$route.query.videoTotalId
        }).then(response => {
          const count = this.count;
          for (let i = count + 1; i < this.videolist.length; i++) {
            if (this.videolist[i].isComplete === false) {
              this.count = i;
              break;
            }
          }
          if (this.count === count) {
            saveUserVideoTotal({
              userId: Cookies.get('userId'), videoTotalId: this.$route.query.videoTotalId
            }).then(response => {
              console.log('你已经学完本课程！')
              this.$alert('你已经学完本课程！', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.count = this.videolist.length;
                }
              });
            })
          } else {
            this.$alert('你已学完本小节，请进入下一小节的学习！', '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          }
        })
      }
    },

    // onPlayerTimeupdate(player) {
    //   this.videoCurrentTime = player.cache_.currentTime;
    //   console.log(this.videoCurrentTime);
    // @timeupdate="onPlayerTimeupdate($event)"
    // },

    listAllStudentsScore(page) {
      videos(page).then(resp => {
        this.videolist = resp.data.resultData;
        console.log(this.videolist)
        console.log(resp)

      })
    },

    listVideoHistory(page) {
      videoHistory(page).then(resp => {
        this.completeVideo = resp.data.resultData;
        this.getMovieList();
      })
    },


  }
}
</script>

<style scoped>
.containvideo {
  display: flex;
  justify-content: space-between;

}

.item {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: flex-start;
}

.videoInfo {
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
