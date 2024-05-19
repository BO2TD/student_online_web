<template>
  <div>
    <el-table
        :data="VideoHistory"
        border
        style="width: 100%">
      <el-table-column
          prop="courseTopic"
          label="课程">
      </el-table-column>
      <el-table-column
          prop="videoTopic"
          label="章节">
      </el-table-column>
      <el-table-column
          prop="learningStatus"
          label="进度" width="180">
      </el-table-column>
      <el-table-column
          prop="learningTime"
          label="完成时间">
      </el-table-column>
    </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="VideoHistory.length">
    </el-pagination>
  </div>

</template>

<script>
import {detailhistory} from "../../api/studentweb/studentmanagement.js";
import Cookies from 'js-cookie'
import {videohistory} from "@/api/video";

export default {
  name: "VideoHistory",
  data() {
    return {
      VideoHistory: [],
      page: {
        page: 1, //初始页
        pageSize: 10,    //    每页的数据
        userId: '',
        // roleId: ''
      },
    }
  },
  created() {
    this.page.userId = Cookies.get("userId")
    this.page.roleId = Cookies.get("roleId")
    this.detailHistory(this.page)
  },
  methods: {

    handleSizeChange(size) {
      this.page.pageSize = size;
      this.detailHistory(this.page)
      // console.log(this.pageSize,'888')
      console.log(`每页 ${size} 条`);
    },
    handleCurrentChange(pageNum) {
      this.page.pageNum = pageNum;
      this.detailHistory(this.page)
      console.log(`当前页: ${pageNum}`);
    },

    detailHistory(page) {
      videohistory(page).then(resp => {
        this.VideoHistory = resp.data.resultData.data;
        console.log(this.VideoHistory)
        // this.$store.dispatch('appliantHistory',this.applicantHistory)
      })
    }
  }
}
</script>

<style scoped>

</style>
