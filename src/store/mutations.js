export const state = {
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
  }
  export const mutations = {
    changeUser(state,arr){
      // 将用户信息存入到store的user中
      state.user = arr
      // 同时将用户存入到sessionStorage中
      if(arr){
        sessionStorage.setItem('user',JSON.stringify(arr))
      }else{
        sessionStorage.removeItem('user')
      }
    }
  }
  export const getters = {
    user(state){
      return state.user
    }
  }