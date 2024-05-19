<template>
  <div>
    <div v-if="flag">
      <div>
              <span>
                <el-tag type="success"> 班级：</el-tag>
                {{ classInfo.className }}</span>
        <p>
          <el-tag type="success"> 班主任：</el-tag>
          {{ classInfo.userName }}
        </p>
        <el-popover
            placement="top-start"
            title="说明"
            width="100"
            class="right"
            trigger="hover"
            content="您已加入班级，如需更改，请联系班主任或者管理员">
          <!--                    <el-tooltip class="item" effect="dark" content="您已加入班级，如需更改，请联系班主任或者管理员" placement="top-start">-->
          <el-button type="primary" :disabled="flag" @click="studentAddClass(s.id,s.userId)" slot="reference" round>
            已加入
          </el-button>
          <!--                    </el-tooltip>-->
          <!--                    <router-link to=""><el-button type="success" @click="detailHistory()" round>申请记录</el-button></router-link>-->

        </el-popover>
      </div>
    </div>
    <div v-else>
      <div v-for="s in StudentClassData">
        <div>
              <span>
                <el-tag type="success"> 班级：</el-tag>
                {{ s.className }}</span>
          <p>
            <el-tag type="success"> 班主任：</el-tag>
            {{ s.userName }}
          </p>
          <el-popover
              placement="top-start"
              title="描述"
              width="100"
              class="right"
              trigger="hover"
              content="加入该班级">
            <!--                    <el-tooltip class="item" effect="dark" content="您已加入班级，如需更改，请联系班主任或者管理员" placement="top-start">-->
            <el-button type="primary" :disabled="flag" @click="studentAddClass(s.id,s.userId)" slot="reference" round>
              加入
            </el-button>
            <!--                    </el-tooltip>-->
            <!--                    <router-link to=""><el-button type="success" @click="detailHistory()" round>申请记录</el-button></router-link>-->

          </el-popover>
        </div>
        <el-divider></el-divider>
      </div>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="StudentClassData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {smanamgent, addClass, detailhistory, isFlage} from "../../../api/studentweb/studentmanagement.js";
import Cookies from "js-cookie";

export default {
  name: "StudentManagement",
  data() {
    return {
      StudentClassData: [],
      page: {
        page: 1, //初始页
        pageSize: 10,    //    每页的数据
      },
      addClassStudent: {
        classId: '',
        userId: ''
      },

      applicantHistory: [],
      flag: true,
      classId: 0,
      classInfo: null,
      param: {
        userId: ''
      }


    }
  },
  created() {
    this.param.userId = Cookies.get("userId")
    this.isAllFlag(this.param)
    this.StudentClass(this.page)
    this.addClassStudent.userId = Cookies.get('userId')
    if (Cookies.get('classId') != 'undefined') {
      console.log(Cookies.get('classId'))
      this.classId = parseInt(Cookies.get('classId'));
      this.flag = true
    } else {
      this.flag = false
    }
  },
  methods: {
    isAllFlag(param) {
      isFlage(param).then(resp => {
        this.flag = resp.data.resultData
      })
    },
    handleSizeChange(size) {
      this.page.pageSize = size;
      this.StudentClass(this.page)
      // console.log(this.pageSize,'888')
      console.log(`每页 ${size} 条`);
    },
    handleCurrentChange(pageNum) {
      this.page.pageNum = pageNum;
      this.StudentClass(this.page)
      console.log(`当前页: ${pageNum}`);
    },

    StudentClass(page) {
      smanamgent(page).then(resp => {
        this.StudentClassData = resp.data.resultData.data
        if (this.flag) {
          for (let classInfo of this.StudentClassData) {
            if (this.classId === classInfo.id) {
              this.classInfo = classInfo;
              break
            }
          }
        }
        // state.ClassData=resp.data.data.records
        // this.$store.dispatch('classAction',this.ClassData)
      })
    },
    studentAddClass(classId, userId) {
      this.addClassStudent.classId = classId;

      this.$alert('您已成功提出申请，待该班班主任审核', '申请成功', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          });
        }
      });

      addClass(this.addClassStudent).then(resp => {
        if (resp.data.code == 200) {
          this.$message({
            message: '恭喜你，申请成功，待该班班主任审核',
            type: 'success'
          });
          this.flag = true
        } else {
          this.$message.error('不可加入该班级');
        }
      })
    },


  },
}
</script>

<style scoped>
.right {
  display: flex;
  justify-content: center;
}
</style>