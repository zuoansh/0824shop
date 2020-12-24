<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <el-input v-model="user.username" placeholder="请输入用户"></el-input>
      <el-input v-model="user.password" type="password"  placeholder="请输入密码"></el-input>
      <div class="btn">
        <el-button type="primary" @click="login">登录</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import {requestLogin} from '../../utils/request';
import { successAlert, warningAlert } from '../../utils/alert';
import {mapActions} from 'vuex';
 export default {
  data(){
    return {
      user:{
        username:'',
        password:''
      }
    }
  },

  methods:{
    ...mapActions({
      "requestUser":"userActions"
    }),
    login(){
      // 发起登录请求
      //方式二:存储到vuex和sessionStorage
      requestLogin(this.user).then(res=>{
        if(res.data.code == 200){
          successAlert(res.data.msg)
          //将用户信息存入到store,
          this.requestUser(res.data.list)
          this.$router.push('/')
        }else{
          warningAlert(res.data.msg)
        }
      })














      // 方式一
      // requestLogin(this.user).then(res=>{
      //   if(res.data.code == 200){
      //     successAlert(res.data.msg)
      //     // 成了,将用户信息存入localStorage
      //     if(localStorage.getItem('user') !== null){
      //       localStorage.removeItem('user')
      //     }
      //     localStorage.setItem('user',JSON.stringify(res.data.list))
      //     this.$router.push('/')
      //   }else{
      //     warningAlert(res.data.msg)
      //   }
      // })



    }
  }
}
</script>

<style scoped>
.login{
  width:100vw;
  height: 100vh;
  background: linear-gradient(#553443,#2F3D60);
  position: fixed;
  left: 0;
  top:0;
}
.con{
  width:400px;
  height: 300px;
  background: white;
  border-radius: 10px;
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
}
h3{
  text-align: center;
  margin: 20px;
}
.el-input,.el-button{
  width:90%;
  margin:15px;
}
</style>
