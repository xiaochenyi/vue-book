<template>
    <div class="footer">
        <router-link to="/home">
            <i class="iconfont icon-shouye"></i>
            <span>首页</span>
        </router-link>
        <router-link to="/list">
            <i class="iconfont icon-yemian"></i>
            <span>列表页</span>
        </router-link>
        <router-link to="/add">
            <i class="iconfont icon-tianjia"></i>
            <span>添加</span>
        </router-link>
    </div>
</template>


<style scoped lang="less">
    .footer{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50px;
        display: flex;
        border-top:1px solid #ccc;
        a{
            display: flex;
            color: yellowgreen;
            flex-direction: column;
            justify-content:center;
            align-items: center;
            flex: 1;
        }
        .router-link-active{
            color:red
        }
    }
</style>