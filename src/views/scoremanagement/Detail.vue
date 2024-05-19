<template>
    <div>

        <div>
            <el-button type="success" @click="out()">返回</el-button>
            <el-button type="success" @click="addTest(paramData)">提交</el-button>
            <div class="cls">
                <div v-if="tag = 'homework'">
                    <p>班级:</p>
                    <div>
                        <el-select v-model="paramData.classId" filterable placeholder="请选择">
                            <el-option
                                    v-for="item in queryCla"
                                    :key="item.classId"
                                    :label="item.className"
                                    :value="item.classId">
                            </el-option>
                        </el-select>
                    </div>
                </div>

                <div>
                    <p>试题标题：</p>
                    <div>
                    <el-input
                            style="width: 80%"
                            placeholder="请输入标题"
                            v-model="paramData.title"
                            clearable>
                    </el-input>
                    </div>
                </div>

                <div  v-if=" tag !='test'">
                    <p class="demonstration">完成时间</p>
                    <div>
                    <el-date-picker
                            v-model="paramData.commitTime"
                            type="date"
                            placeholder="选择日期时间"
                            align="right"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="ce">


            <div style="width: 45%;">
                <p>正题</p>
                <div>
                <mavon-editor
                        :subfield="false"
                        :autofocus="false"
                        v-model="paramData.content"
                        ref="md"
                        style="width: 99%;"
                >
                </mavon-editor>
                </div>
            </div>

            <div style="width: 45%">
                <p> 参考答案</p>
                <div>
                <mavon-editor
                        :subfield="false"
                        :autofocus="false"
                        v-model="paramData.answer"
                        ref="md"
                        style="width: 99%;"
                >
                </mavon-editor>
                </div>
            </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {pclass} from "../../api/admin/queryclass";
    import {addt, saveHomework} from '../../api/teacher/test.js'
    import Cookies from 'js-cookie'

    export default {
        name: "Detail",
        data() {
            return {
                queryCla: [],
                paramData: {
                    classId: '',
                    title: '',
                    content: '',
                    commitTime: '',
                    answer: '',
                    creator: '',
                },

                param: {
                    userId: '',
                },
                tag: '',
                studenttag: '',
            }
        },
        computed() {

        },
        created() {
            this.paramData.creator = Cookies.get("userId")
            this.param.userId = Cookies.get("userId")
            this.queryClass(this.param)
         //   this.tag = this.$route.params.data1
            this.paramData.title = this.$route.params.data2.title
            this.paramData.content = this.$route.params.data2.content
            this.paramData.answer = this.$route.params.data2.answer
            this.paramData.commitTime = this.$route.params.data2.commitTime
            this.paramData.commitTime = this.$route.params.data2.completionTime
            this.paramData.classId = this.$route.params.data2.classId

            this.studenttag = this.$route.params.data4


        },
        methods: {
            out() {

                this.tag = this.$route.params.data1
                if (this.tag == 'homework') {
                    console.log(this.tag,'888')
                    this.$router.push('/classmanagement')
                } else {
                    this.$router.push('/scoremanagment')
                }
            },
            queryClass(pa) {
                pclass(pa).then(resp => {
                    this.queryCla = resp.data.resultData
                })
            },
            addTest(paramData) {

                this.tag = this.$route.params.data1
                if (this.tag == 'homework') {
                    saveHomework(paramData).then(resp => {
                        if (resp.data.code == 200) {
                            this.$router.push("/classmanagement")
                            this.$message({
                                message: '恭喜你，发布成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error('发布失败');
                        }
                    })
                } else {
                    addt(paramData).then(resp => {
                        if (resp.data.code == 200) {
                            this.$router.push("/scoremanagment")
                            this.$message({
                                message: '恭喜你，发布成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error('发布失败');
                        }
                    })
                }

            },
        }
    }
</script>

<style scoped>
    .ce {
        display: flex;
        justify-content: space-around;
    }

    .cls {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
</style>