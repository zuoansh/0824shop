<template>
    <el-dialog :title="info.title" :visible.sync="info.show">
  <el-form :model="form">
    <el-form-item label="角色名称" :label-width="formLabelWidth">
      <el-input v-model="form.rolename"></el-input>
    </el-form-item>
    <el-form-item label="角色权限" :label-width="formLabelWidth">
        <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-checked-keys="defaultKey"
            :props="defaultProps" ref="tree">
          </el-tree>
    </el-form-item>
     <el-form-item label="角色状态" :label-width="formLabelWidth">
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
import {requestAddRole,requestRoleOne,requestUpdateRole} from '../../../utils/request';
import { successAlert, warningAlert } from '../../../utils/alert';
export default {
  props:['info'],
  computed:{
    ...mapGetters({
      "data":"menu/list"
    })
  },
  data(){
    return {
      form:{
          rolename:'',
          menus:'',
          status:1
         },
      // data: [],
      defaultProps: {
          children: 'children',
          label: 'title'
        },
      defaultKey:[],
      formLabelWidth:'80px'
    }
  },
  methods:{
    ...mapActions({
      "requestMenuList":"menu/listActions",
      "requestRoleList":"role/listActions",
    }),
    // 取消弹框,form置空
    cancel(){
      this.info.show = false;
      this.form = {
          rolename:'',
          menus:'',
          status:1
      },
      // 将树形结构的defaultKey为空
      this.defaultKey = this.$refs.tree.setCheckedKeys([]);
    },
    confirm(){
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      // 发送添加角色请求
      requestAddRole(this.form).then(res=>{
        if(res.data.code == 200){
          successAlert(res.data.msg)
          this.cancel()
          this.requestRoleList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    },
    // 根据id获取角色的详细信息
    getDetail(id){
      requestRoleOne({id:id}).then(res=>{
        if(res.data.code == 200){
          console.log(JSON.parse(res.data.list.menus));
          this.form = res.data.list;
          this.form.id = id;
          this.defaultKey = JSON.parse(res.data.list.menus)
        }
      })
    },
    update(id){
       this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
       console.log(this.form);
      requestUpdateRole(this.form).then(res=>{
        if(res.data.code == 200){
          successAlert(res.data.msg)
          this.cancel()
          this.requestRoleList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted(){
    //自定义的函数名
    this.requestMenuList()
  }
}
</script>

<style>

</style>
