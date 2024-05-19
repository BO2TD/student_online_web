<template>
    <div style="background-color: #babae4; padding-top: 10px;">
<!--        <h1 style="color:#303133" >学生在线学习系统&#45;&#45;学生端</h1>-->
        <h1 style="color:#fff" >学生在线学习系统--学生端</h1>

        <div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" :router="true" mode="horizontal"
                     @select="handleSelect">
                <el-menu-item index="/onlinelearn">在线学习</el-menu-item>
                <el-submenu index="1">
                    <template slot="title" >作业管理</template>
                    <el-submenu>
                        <template slot="title">查看作业</template>
                        <el-menu-item index="/checkhomework">已完成</el-menu-item>
                        <el-menu-item index="/nohomework">未完成</el-menu-item>
                    </el-submenu>
<!--                    <el-menu-item index="/askandanswer">问答</el-menu-item>-->
<!--                    <el-menu-item index="/studentpractice">练习</el-menu-item>-->
                </el-submenu>
                <el-menu-item index="/videohistory">学习记录</el-menu-item>
                <el-menu-item index="/studentmanagement">班级信息</el-menu-item>
                <el-menu-item index="/applicanthistory">申请记录</el-menu-item>
<!--                <el-menu-item index="/practicedetail">习题提交记录</el-menu-item>-->
                <el-menu-item index="/essentiainfo">基本信息</el-menu-item>
                <div class="cn">


                    <div class="blockl">

                        <el-submenu index="2">
                            <template slot="title">
                                <div class="demo-fit">
                                    <div class="block">
                                    <i  style="font-size: 50px;color: #ffffff" class="el-icon-user-solid"></i>

<!--                                            <el-avatar shape="square" :size="50" :fit="fit" :src="url"></el-avatar>-->


                                    </div>
                                </div>
                            </template>
                            <el-menu-item index="/checkhomework" @click="logout()">退出</el-menu-item>
                            <el-menu-item @click="change()">修改密码</el-menu-item>
                        </el-submenu>
                    </div>
                </div>
            </el-menu>

        </div>


        <div >
            <el-dialog
                    title="修改密码"
                    :visible.sync="dialogFormVisible"
                    width="30%"
                    :before-close="handleClose">
                原密码：
                <el-input placeholder="请输入密码" v-model="changePassword.password" show-password></el-input>
                <p>
                    新密码：
                    <el-input placeholder="请输入密码"  v-model="changePassword.newPassword" show-password></el-input>
                </p>
                <span slot="footer" class="dialog-footer">
     <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit(changePassword)">确 定</el-button>
  </span>
            </el-dialog>


        </div>

    </div>
</template>

<script>
    import Cookies from "js-cookie";
    import {password} from '../../../../api/personal.js'

    export default {
        name: "Header",
        data() {
            return {
                changePassword:{
                    password:'',
                    newPassword: '',
                    id:''
                },
                dialogFormVisible: false,
                info: {
                    password: '',
                    newPassword: '',
                    id: ''
                },
                drawer: false,
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
        },
        created() {
            this.changePassword.id = Cookies.get("userId")
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            change() {
                this.dialogFormVisible = true
            },

            submit(da) {
                password(da).then(resp => {
                    if (resp.data.code == 200) {
                        this.$message({
                            message: '恭喜你，密码修改成功 ',
                            type: 'success'
                        });
                        this.dialogFormVisible = false
                        this.studentquery(this.page)
                    } else {
                        this.$message.error('原密码错误');
                    }
                })
            },
            logout() {
                Cookies.remove('userId')
                Cookies.remove('classId')
                Cookies.remove('roleId')
                this.$router.push('/login')
                this.$message({
                    message: '恭喜你，退出成功',
                    type: 'success'
                });
            }
        }
    }
</script>

<style scoped>
    /*.blockl{*/
    /*    display: flex;*/
    /*    justify-content: space-between;*/
    /*}*/
    h1 {
        /* position: absolute; */
        margin-left: 40%;
    }
    .el-menu--horizontal>.el-submenu .el-submenu__title {
        height: 60px;
        line-height: 60px;
        border-bottom: 2px solid transparent;
        color: #ffffff !important;
        font-size: 20px !important;
    }


    .blockl {
        position: absolute;
        right: 0px;
    }

    .el-menu {
        border-right: solid 1px #e6e6e6;
        list-style: none;
        position: relative;
        margin: 0;
        padding-left: 0;
        background-color: #babae4;
    }
    .el-menu--horizontal>.el-menu-item[data-v-15228138] {
        float: left;
        height: 60px;
        line-height: 60px;
        margin: 0;
        border-bottom: 2px solid transparent;
        color: #ffffff;
        background-color: #babae4;
        font-size: 20px;
    }
    .el-menu--horizontal>.el-submenu .el-submenu__title {
        height: 60px;
        line-height: 60px;
        border-bottom: 2px solid transparent;
        color: #ffffff;
        font-size: 20px;
    }
    .el-menu--horizontal>.template {
      /*border-right: solid 1px #e6e6e6;
      list-style: none;
      position: relative;
      margin: 0;
      padding-left: 0;
      background-color: #babae4;*/
      float: left;
      height: 60px;
      line-height: 60px;
      margin: 0;
      border-bottom: 2px solid transparent;
      color: #ffffff;
      background-color: #babae4;
      font-size: 20px;
    }
    .cn {
        display: flex;
        justify-content: space-between;
    }

    .title {
        line-height: 100%;
    }
</style>