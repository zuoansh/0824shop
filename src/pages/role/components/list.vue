<template>
  <div>
       <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{children: 'children'}">
    <el-table-column  prop="id" label="角色编号"  width="180"> </el-table-column>
    <el-table-column  prop="rolename" label="角色名称"  width="180"> </el-table-column>
    <el-table-column label="状态"  width="180">
       <template slot-scope="scope">
       <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
       <el-button type="danger" v-else>禁止</el-button>
       </template>
    </el-table-column>
    <el-table-column label="操作"  width="180">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
  </div>
</template>

<script>
import {mapGetters,mapActions} from  'vuex';
import {requestDelRole} from '../../../utils/request';
import {successAlert} from '../../../utils/alert';
export default {
  computed:{
    ...mapGetters({
      'list':'role/list'
    })
  },
  methods:{
    ...mapActions({
      "requestRoleList":"role/listActions"
    }),
    edit(id){
      // 自定事件传递给父组件
      this.$emit('edit',id);
    },
    del(id){
       this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          requestDelRole({id:id}).then(res=>{
            if(res.data.code == 200){
              successAlert(res.data.msg);
               this.requestRoleList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  },
  mounted(){
    this.requestRoleList()
  }
}
</script>

<style>

</style>
