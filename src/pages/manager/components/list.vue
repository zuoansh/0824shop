<template>
  <div>
     <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{children: 'children'}">
    <el-table-column  prop="id" label="用户编号"  width="180"> </el-table-column>
    <el-table-column  prop="username" label="用户名称"  width="180"> </el-table-column>
    <el-table-column  prop="rolename" label="所属角色"  width="180"> </el-table-column>
    <el-table-column label="状态"  width="180">
       <template slot-scope="scope">
       <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
       <el-button type="danger" v-else>禁止</el-button>
       </template>
    </el-table-column>
    <el-table-column label="操作"  width="180">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 此处是分页 -->
  <el-pagination  background layout="prev, pager, next" :page-size="size" :total="count" @current-change="cPage">
</el-pagination>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import {requestDelManager} from '../../../utils/request';
import {successAlert} from '../../../utils/alert';
export default {
  computed:{
    ...mapGetters({
       "count":"manager/count",
      "list":'manager/list',
      // 每页显示的条数
      "size":"manager/size"

    })
  },
  methods:{
    ...mapActions({
      'requestCount':'manager/countActions',
      'requestManagerList':'manager/listActions',
      'requestPage':"manager/pageActions"
    }),
    // 获取当前页码数
    cPage(page){
      this.requestPage(page)
      this.requestManagerList()
    },
    edit(id){
      this.$emit('edit',id)
    },
    del(id){
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          requestDelManager({uid:id}).then(res=>{
            if(res.data.code == 200){
              successAlert(res.data.msg);
              this.requestCount()
               this.requestManagerList()
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
    this.requestCount()
    this.requestManagerList()
  }
}
</script>

<style>

</style>
