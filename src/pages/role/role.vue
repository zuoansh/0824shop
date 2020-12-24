<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>

    <!-- 添加子组件 -->
    <v-add :info="info" ref="add"></v-add>
    <!-- 列表子组件 -->
    <v-list @edit="edit($event)"></v-list>
  </div>
</template>

<script>
import vAdd from './components/add.vue';
import vList from './components/list.vue';
import qs from 'qs';
export default {
  data(){
    return {
      info:{
        show:false,
        title:'',
        isAdd:true
      }
    }
  },
  methods:{
    add(){
      this.info.show = true;
      this.info.title = '添加角色';
      this.info.isAdd = true
    },
    // 通过子组件的自定义事件进行的触发的
    edit(id){
      this.info.show = true;
      this.info.title = '编辑角色';
      this.info.isAdd = false;
      this.$refs.add.getDetail(id)
    }
  },
  components:{
    vAdd,
    vList
  },

  mounted(){
    // 解释JSON和qs的区别
  //   var json = {
  //     user:'xiaowang',
  //     age:20,
  //     sex:'nv'
  //   }

  //   var a = JSON.stringify(json);
  //   var b =qs.stringify(json);
  //   console.log('a',a);
  //   console.log('b',b);
  }
}
</script>

<style>

</style>
