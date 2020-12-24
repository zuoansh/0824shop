// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//1.引入重置的css样式
import './assets/css/reset.css'

//2.引入全局公共组件
import commonComponents from './components';
for(let i in commonComponents){
  Vue.component(i,commonComponents[i])
}

//3.引入全局过滤器
import filters from './filters';
for(let i in filters){
  Vue.filter(i,filters[i])
}

//4.请求数据

//5.引入store
import store from './store';

//6.引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.prototype.$preImg = 'http://localhost:3000'
// Vue.prototype.$preImg = '';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
