<template>
    <el-dialog :title="info.title" :visible.sync="info.show">
  <el-form :model="form">
     <el-form-item label="角色名称" :label-width="formLabelWidth">
      <el-select v-model="form.roleid">
        <el-option label="--请选择--" value="" disabled></el-option>
        <!-- 动态数据获取 -->
        <el-option v-for="item in roleList" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>
     <el-form-item label="管理员状态" :label-width="formLabelWidth">
       <el-switch
            v-model="form.status"
            active-color="blue"
            inactive-color="grey" :active-value="1" :inactive-value="2">
          </el-switch>
    </el-form-item>


  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="confirm" v-if="info.isAdd">确 定</el-button>
    <el-button type="primary" @click="update" v-else>修 改</el-button>
  </div>
</el-dialog>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import {requestAddManager,requestManagerOne,requestUpdateManager} from '../../../utils/request'
import { successAlert, warningAlert } from '../../../utils/alert';
export default {
  props:['info'],
  computed:{
    ...mapGetters({
      'roleList':'role/list'
    })
  },
  data(){
    return {
       form: {
          roleid:'',
          username:'',
          password:'',
          status:1
        },
        formLabelWidth:'100px'
    }
  },
  methods:{
    ...mapActions({
      "requestRoleList":'role/listActions',
      "requestCount":"manager/countActions",
      "requestManagerList":"manager/listActions"
    }),
    cancel(){
      this.info.show = false;
      this.form = {
          roleid:'',
          username:'',
          password:'',
          status:1
      }
    },
    confirm(){
      // 发起添加管理员请求
      requestAddManager(this.form).then(res=>{
        if(res.data.code == 200){
          successAlert(res.data.msg);
          this.cancel()
          this.requestCount()
          this.requestManagerList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    },
    getDetail(id){
      // 获取管理员详情
      requestManagerOne({uid:id}).then(res=>{
        if(res.data.code == 200){
          this.form = res.data.list;
          this.form.uid = id;
          this.form.password = '';
        }
      })
    },
    update(){
      console.log(this.form);
      requestUpdateManager(this.form).then(res=>{
        if(res.data.code == 200){
          successAlert(res.data.msg);
          this.cancel()
          this.requestCount()
           this.requestManagerList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted(){
    this.requestRoleList()
  }

}
</script>

<style>

</style>
