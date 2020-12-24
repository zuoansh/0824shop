import {requestMangerList,requestCount} from '../../utils/request';
const state = {
  list:[],
  // 每页显示是的条数
  size:2,
  // 当前页码数
  page:1,
  //总的记录条数
  count:0
}

const mutations = {
  changeList(state,arr){
    state.list = arr
  },
  changeCount(state,n){
    state.count = n
  },
  changePage(state,cPage){
    state.page = cPage
  }
}

const actions = {
  listActions(context){

    // 请求用户列表
    // params = {size:2,page:1}
    var params = {
      size:context.state.size,
      page:context.state.page
    }
    requestMangerList(params).then(res=>{
      if(res.data.code == 200){
        if((res.data.list == null || res.data.list.length==0)&& context.state.page > 1){
          var page = context.state.page - 1;
          context.commit('changePage',page);
          context.dispatch('listActions')
          return
        }
        context.commit('changeList',res.data.list)
      }
    })
  },
  countActions(context){
    // 发起
    requestCount().then(res=>{
      if(res.data.code == 200){
        context.commit('changeCount',res.data.list[0].total)
      }
    })

  },
  pageActions(context,cPage){
    context.commit('changePage',cPage)
  }
}


const getters = {
  list(state){
    return state.list
  },
  count(state){
    return state.count
  },
  size(state){
    return state.size
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true
}
