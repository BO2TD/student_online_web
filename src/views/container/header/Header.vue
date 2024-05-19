<template>
    <div>



            <el-menu :default-active="activeIndex" mode="horizontal" style="line-height: 60px">
                <div class="cn">
                    <h3 class="title">学生在线学习系统--教师端</h3>

                    <div class="blockl">

                        <el-submenu index="2">
                            <template slot="title">
                                <div class="demo-fit">
                                    <div class="block">

<!--                                        <p>-->
<!--                                            <el-avatar shape="square" :size="50" :fit="fit" :src="url"></el-avatar>-->
<!--                                        </p>-->
                                        <i  style="color:#ffffff; font-size: 50px" class="el-icon-s-custom"></i>

                                    </div>
                                </div>
                            </template>
                            <el-menu-item index="/checkhomework" @click="logout()">退出</el-menu-item>
                            <el-menu-item @click="change()">修改密码</el-menu-item>
                        </el-submenu>
                    </div>
                </div>
            </el-menu>


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
    import {password} from  '../../../api/personal.js'

    export default {
        name: "Header.vue",
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
    .blockl{
        position: absolute;
        right: 0px;
        line-height: 60px;
    }
    .ls{
        height: 100%;
    }
    .cn[data-v-69faf9b7] {
        display: flex;
        justify-content: space-between;
        background-color: #9aa9e1;
    }

    .title {
        line-height: 100%;
        text-color:"#ffffff";
        left: 40%;
        color: #ffffff;
        position:absolute;
    }
</style>