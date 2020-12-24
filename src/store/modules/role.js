import {requestRoleList} from '../../utils/request';
const state = {
  list:[]
}

const mutations = {
  changeList(state,arr){
    state.list = arr
  }
}

const actions = {
  listActions(context){
    // 发起获取角色列表请求
    requestRoleList().then(res=>{
      if(res.data.code = 200){
        context.commit('changeList',res.data.list)
      }
    })
  }
}

const getters ={
  list(state){
    return state.list
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true
}
