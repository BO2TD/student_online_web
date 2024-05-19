<template>
  <div>
    <el-table
        :data="ApplicantHistory"
        border
        style="width: 100%">
      <el-table-column
          prop="createTime"
          label="申请日期"
          width="180">
      </el-table-column>
      <el-table-column
          prop="className"
          label="申请加入班级"
          width="180">
      </el-table-column>
      <el-table-column
          prop="charger"
          label="审核教师">
      </el-table-column>
      <el-table-column
          prop="chargerPhone"
          label="审核教师电话">
      </el-table-column>
      <el-table-column
          prop="status"
          label="审核状态">
      </el-table-column>
    </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="ApplicantHistory.length">
    </el-pagination>
  </div>

</template>

<script>
import {detailhistory} from "../../../api/studentweb/studentmanagement.js";
import Cookies from 'js-cookie'

export default {
  name: "ApplicantHistory",
  data() {
    return {
      ApplicantHistory: [],
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
      detailhistory(page).then(resp => {
        this.ApplicantHistory = resp.data.resultData.data;
        console.log(this.ApplicantHistory)
        // this.$store.dispatch('appliantHistory',this.applicantHistory)
      })
    }
  }
}
</script>

<style scoped>

</style>