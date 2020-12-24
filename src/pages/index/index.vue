<template>
  <el-container>
  <el-aside width="150px">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b" :unique-opened="true" router>
       <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <template  v-for="item in user.menus">
        <!-- 这里遍历的是有目录的,即有children -->
           <el-submenu v-if="item.children" :index="item.title" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <template v-for="i in item.children">
               <el-menu-item :key="i.id" :index="'/'+i.url">{{i.title}}</el-menu-item>
            </template>
          </el-submenu>
          <!-- 这里显示没有目录的,即没有children -->
          <el-menu-item v-if="!item.children" :key="item.id" :index="'/'+item.url">{{item.title}}</el-menu-item>
      </template>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header height="80px">
      <span>{{user.username}}</span>
      <el-button type="primary" @click="logout">退出</el-button>
    </el-header>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <router-view></router-view>
      </el-main>
  </el-container>
</el-container>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  computed:{
    ...mapGetters({
      "user":"user"
    })
  },
  methods:{
    ...mapActions({
      "requestUser":"userActions"
    }),
    logout(){
      // 删除用户信息
      this.requestUser(null)
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.el-aside{
  height: 100vh;
  background: #333;
  color:white;
}
.el-header{
  /* height: 80px; */
  background: #B3C0D1;
  text-align: right;
  line-height: 80px;
}
.el-breadcrumb{
  margin-bottom: 20px;
}
</style>
