<template>
  <div>

    <!--        <div class="course" v-for="c in onLineCou">-->
    <!--            <el-button >{{c.subjectName}}</el-button>-->
    <!--        </div>-->
    <div class="dem">

      <div class='demo' v-for="url in urls">
        <div>
          <div v-if="url.isComplete">
            <el-image :src="url.coverUrl"></el-image>
          </div>

          <!-- 否则，使用router-link提供点击跳转 -->
          <router-link v-else :to="{path:'/detailonlineweb', query:{videoTotalId:url.id,userId:url.userId,name:url.topic}}">
            <el-image :src="url.coverUrl"></el-image>
          </router-link>
          <h3>{{ url.topic }} <span v-if="url.isComplete">(已完成)</span> </h3>
          <!--                <div class="ta">-->
          <!--&lt;!&ndash;                    <el-tag> {{url.userName}}   </el-tag>&ndash;&gt;-->
          <!--                    <el-tag> {{url.createTime}}</el-tag>-->
          <!--                </div>-->


        </div>

      </div>

    </div>
    <div style="height: 40px"></div>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="iData.length">
    </el-pagination>
  </div>
</template>
<script>
import {onlineweb, onlinecourse, videoTotalHistory} from '../../../api/studentweb/online.js'
import {videos} from "../../../api/studentweb/video.js";
import Cookies from "js-cookie";

export default {
  name: "OnLineLearn",
  data() {
    return {
      page: {
        page: 1, //初始页
        pageSize: 10,    //    每页的数据
        classId: ''
      },
      iData: [],
      completeClass: [],
      videos: [],
      videoss: {
        videoTotalId: ''
      },
      course: {
        classId: ''
      },
      onLineCou: []


    }
  },
  created() {
    this.page.classId = Cookies.get('classId')
    this.page.userId = Cookies.get("userId")
    this.course.classId = Cookies.get('classId')
    this.listAllCourse(this.course)
    this.listAllStudentsScore(this.page)
    this.listAllStudentsTotal(this.page)
  },
  computed: {
    urls() {
      return this.iData.map(item => {
        // 检查 item 是否在 completeClass 中
        const isComplete = this.completeClass.some(complete => complete.videoTotalId === item.id)
        if (isComplete) {
          item.isComplete = true
        } else {
          item.isComplete = false
        }
        return item
      })
    }
  },
  methods: {
    detailvideo(video) {
      this.videoss.videoTotalId = video
      videos(this.videos).then(resp => {
        this.videos = resp.data.resultData.data

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

    listAllCourse(page) {
      onlinecourse(page).then(resp => {
        this.onLineCou = resp.data.resultData
      })
    },
    listAllStudentsScore(page) {
      onlineweb(page).then(resp => {
        this.iData = resp.data.resultData.data
        console.log(resp)
        console.log(this.urls, '8888')

      })
    },
    listAllStudentsTotal(page) {
      videoTotalHistory(page).then(resp => {
        this.completeClass=resp.data.resultData
      })
    }
  }

}
</script>
<style scoped>
.el-image__inner {
  vertical-align: top;
  width: 200px;
  height: 100px;
}

.demo {
  width: 200px;
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

el-button {
  display: inline-block;
}

.course {
  display: inline-block;
}

.ta {
  display: flex;
  justify-content: space-between;
}

.dem {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.demo:hover {
  display: block;
}
</style>
