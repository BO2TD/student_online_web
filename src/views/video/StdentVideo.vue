<template>
  <div>
    <div style="float: left">
      <el-input placeholder="请输入搜索内容" v-model="key" class="input-with-select" style="max-width: 600px">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div style="clear: both"></div>

    <el-table
        :data="tableData"
        :default-sort="{prop: 'date', order: 'descending'}"
        border
        style="width: 100%; margin-top: 20px;">
      <el-table-column
          sortable
          fixed
          prop="studentName"
          label="学生"
          width="180">
      </el-table-column>
      <el-table-column
          prop="courseName"
          label="课程"
          width="180">
      </el-table-column>
      <el-table-column
          prop="videoName"
          label="章节">
      </el-table-column>
      <el-table-column
          prop="punchTime"
          label="打卡时间">
      </el-table-column>


      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除记录
          </el-button>
          <!--                    <el-button-->
          <!--                            size="mini"-->
          <!--                            type="danger"-->
          <!--                            @click="handleDelete(scope.$index, scope.row)">编辑-->
          <!--                    </el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
    </el-pagination>

  </div>
</template>

<script>
import {tclassmanagemt,deleteStudent} from "../../api/teacher/teacherclass.js";
import {mapState} from 'vuex'
import Cookies from 'js-cookie'
import {videoHistoryDeleteTeacher, videoHistoryTeacher, videoTotalHistoryDeleteTeacher} from "@/api/video";
export default {
  name: "StudentVideo",

  data() {
    return {
      key: '',

      tableData: [],
      page: {
        page: 1, //初始页
        pageSize: 10,    //    每页的数据
        userId: ''
      },
      form: {
        userName: '',
        account: '',
        phone: '',
        className: '',
      },
      formLabelWidth: '120px',
      param: {
        id: '',
      }

    }
  },
  created() {
    this.page.userId = Cookies.get('userId')
    this.listAllVideoHistory(this.page)
  },
  methods: {
    handleDelete(index, row) {
      console.log(row.videoTotalCompletionId)
      if (row.videoTotalCompletionId) {
        videoTotalHistoryDeleteTeacher({id: row.videoTotalCompletionId})
      }

      this.param.id = row.punchCardId
      videoHistoryDeleteTeacher(this.param).then(resp => {
        if (resp.data.code == 200) {

          this.$message({
            message: '恭喜你，移除学生打卡记录成功 ',
            type: 'success'
          });
          this.dialogFormVisibleEdit = true
          this.listAllVideoHistory(this.page)
        } else {
          this.$message.error('移除学生打卡记录失败');
        }
      })
    },
    handleSizeChange(size) {
      this.page.pageSize = size;
      // console.log(this.pageSize,'888')
      this.listAllVideoHistory(this.page)
      console.log(`每页 ${size} 条`);
    },
    handleCurrentChange(pageNum) {
      this.page.pageNum = pageNum;
      this.listAllVideoHistory(this.page)
      console.log(`当前页: ${val}`);
    },

    listAllVideoHistory(page) {
      videoHistoryTeacher(page).then(resp => {
        this.tableData = resp.data.resultData.data
        console.log(this.tableData)
      })
    },
    search() {
      if (this.key === '') {
        this.listAllVideoHistory(this.page)
      } else {
        this.tableData = this.tableData.filter((item) => {
          return item.studentName.indexOf(this.key) !== -1 || item.courseName.indexOf(this.key) !== -1
        })
      }
    },
  },

}
</script>

<style>
el-table-column {
  line-height: 50px;
}

</style>
