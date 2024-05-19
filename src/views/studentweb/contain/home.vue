<template>
    <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="url in urls" :key="item">
            <img :src="url" alt="some_text">
            <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    export default {
        name: "home",
        data(){
            return{
                urls:[
                    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F-vo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fa8014c086e061d95d74c41e47bf40ad163d9cae0.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658216004&t=3758309ecbc29d0c469952af5816f552',
                    'https://img2.baidu.com/it/u=2734070655,2558655617&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    'https://img2.baidu.com/it/u=2149839998,2294553201&fm=253&fmt=auto&app=138&f=JPEG?w=602&h=500',
                    'https://img2.baidu.com/it/u=3592725574,856672590&fm=253&fmt=auto&app=138&f=JPEG?w=562&h=374',
                    'https://img1.baidu.com/it/u=1765264479,2254548393&fm=253&fmt=auto&app=138&f=JPEG?w=748&h=500',
                ]
            }
        }
    }
</script>

<style scoped>

</style>