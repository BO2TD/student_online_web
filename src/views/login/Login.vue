<template>

  <div class="login_container">
    <h1 class="onfont" style="color: white;margin-bottom: 50%">学生在线学习系统</h1>
    <div class="login_box">
      <div>
        <img src="../../assets/learn.jpeg" width="110%" height="90%;" style="margin-left: 3%">
      </div>
      <div>

        <!-- 登录表单区域 -->
        <el-form class="lf" size="medium " :model="tabUser"
                 style="width: 40%;height: 15%;margin-bottom: 40%;margin-left: 15%">
          <!-- 用户名 -->
          <h1 style="text-align: center;color: cadetblue; margin-top: 100px;">登录</h1>
          <br>
          <el-form-item>
            <el-input placeholder="账号" prefix-icon="el-icon-user" v-model="tabUser.account"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item>
            <el-input placeholder="密码" show-password prefix-icon="el-icon-user"
                      v-model="tabUser.password"></el-input>
          </el-form-item>
          <br>
          <div class="lr">
            <el-button type="success" @click="login(tabUser)" style="width: 25%">登录</el-button>
            <el-button type="primary" @click="dialog=true" style="width: 25%">注册</el-button>
          </div>
          <!-- 验证码 -->
          <!--                <el-form-item>-->
          <!--                    <el-input class="code" placeholder="验证码"></el-input>-->
          <!--                    <a>-->
          <!--&lt;!&ndash;                        <img/>&ndash;&gt;-->
          <!--                        <el-button class="code1" @click="sendCode()">发送</el-button>-->
          <!--                    </a>-->
          <!--                </el-form-item>-->
          <!--                &lt;!&ndash; 记住我 &ndash;&gt;-->
          <!--                <el-form-item>-->
          <!--                    <el-checkbox label="记住我" class="rememberMe" v-model="tabUser.checkbox"></el-checkbox>-->
          <!--                </el-form-item>-->
          <!-- 登录按钮 -->
        </el-form>

      </div>

    </div>
    <el-drawer
        title="学生在线学习系统 -- 注册页"
        :visible.sync="dialog"

        custom-class="demo-drawer"
        ref="drawer"
    >
      <!--        <div class="demo-drawer__content">-->
      <el-form :model="form" :rules="rules" style="padding: 20px">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item :show-password="true" label="密码" :label-width="formLabelWidth" prop="password">
          <el-input :placeholder="form.password" v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item :show-password="true" label="确认密码" :label-width="formLabelWidth" prop="confirmPassword">
          <el-input :placeholder="form.confirmPassword" type="password" v-model="form.confirmPassword"></el-input>
        </el-form-item>
        <!--                <el-form-item label="角色" :label-width="formLabelWidth">-->
        <!--                    <el-select v-model="form.roleId" placeholder="请选择性别">-->
        <!--                        <el-option label="教师" value="2"></el-option>-->
        <!--                        <el-option label="学生" value="3"></el-option>-->
        <!--                    </el-select>-->
        <!--                </el-form-item>-->
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="lr" style=" padding-left: 20px; padding-right: 20px;">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="confirm(form)">确定</el-button>
      </div>
      <!--        </div>-->
    </el-drawer>


  </div>
</template>
<script>

import {loginRequest, VerificationCode, register} from "../../api/login";
import Cookies from 'js-cookie'

export default {
  name: "Login",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      tabUser: {
        account: '',
        password: '',
        // VerificationCode: '',
        // checkbox: false,
      },
      form: {
        userName: '',
        account: '',
        sex: '',
        phone: '',
        password: '',
        confirmPassword: [],
        // roleId: '',
        desc: ''
      },
      formLabelWidth: '80px',
      timer: null,
      dialog: false,
      loading: false,


      rules: {
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/,
            message: '密码为数字字母，特殊符号 至少包含三种，长度为 8 - 30位,不区分大小写'
          }
        ],
        confirmPassword: [
          {required: true, validator: validatePass2, trigger: 'blur'}
        ]
      }
    }

  },
  created() {

  },
  methods: {

    confirm(form) {
      register(form).then(resp => {
        if (resp.data.code == 200) {
          this.dialog = false;
          this.$message({
            message: '恭喜你，注册成功',
            type: 'success'
          });
        } else {
          this.$message.error('注册失败');
        }
      })
    },

    handleClose(done) {
      if (this.loading) {
        return;
      }
      // this.$confirm('确定要提交表单吗？')
      //     .then(_ => {
      //       this.loading = true;
      //       this.confirm(form)
      //       this.timer = setTimeout(() => {
      //         done();
      //         // 动画关闭需要一定的时间
      //         setTimeout(() => {
      //           this.loading = false;
      //         }, 400);
      //       }, 2000);
      //     })
      //     .catch(_ => {
      //     });
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },


    sendCode() {
      VerificationCode().then(resp => {
        console.log("123")
      })
    },
    login(tabUser) {
      loginRequest(tabUser).then(resp => {
        Cookies.set('roleId', resp.data.resultData.roleId)
        Cookies.set('userId', resp.data.resultData.userId)
        Cookies.set('classId', resp.data.resultData.classId)

        if (resp.data.code == 200) {
          if (resp.data.resultData.roleId == 1) {
            this.$router.push("/adminmanagement")
          }
          if (resp.data.resultData.roleId == 2) {
            this.$router.push("/hometeacher")
          }
          if (resp.data.resultData.roleId == 3) {
            this.$router.push("/studentweb")
          }
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success'
          });
        } else {
          this.$message.error('账号或者密码错误');
        }
      })

    },

  }
}
</script>
<style scoped>
.onfont[data-v-2529d779] {
  /* display: flex; */
  /* justify-content: center; */
  position: absolute;
  left: 50%;
  top: 120px;
  transform: translate(-50%,0);
}

.lr {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.login_container {
  /*background-image: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%);*/
  /*background-image: url("../images/bg_login.png");*/
  background-color: cadetblue;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

.login_box {
  width: 60%;
  height: 50%;
  /* background-color: #fff; */
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
}

.lf {
  padding: 32px;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
}

.el-button {
  //width: 100%;
}

.code {
  width: 45%;
}

.code1 {
  /* style="width: 100px; height: 30px; margin-left:5px;vertical-align: middle;" */
  display: line-inline;
  width: 45%;
  height: 28px;
  margin-left: 10px;
  vertical-align: middle;
  border-radius: 3px;
}

.rememberMe {
  color: #fff;
}
</style>
