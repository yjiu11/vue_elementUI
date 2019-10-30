import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import '@/styles/main.scss' // global css
// 引入自定义指令 、、弹框拖拽
import './libs/draw';

import App from './App'
import router from './router'
import store from './store'

import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
import * as filters from './filters' // global filters

import apiAjax from './libs/api'
Vue.prototype.apiAjax = apiAjax;
Vue.prototype.HOST = "/api";

import jsonName from './libs/json'
Vue.prototype.jsonName = jsonName;

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer, {
  defaultOptions: {
    'inline': true, // 启用 inline 模式
    'button': true, // 显示右上角关闭按钮
    'navbar': false, // 显示缩略图导航
    'title': false, // 显示当前图片的标题
    // 'toolbar': true, // 显示工具栏
    'tooltip': true, // 显示缩放百分比
    'movable': true, // 图片是否可移动
    'zoomable': true, // 图片是否可缩放
    'rotatable': true, // 图片是否可旋转
    'scalable': false, // 图片是否可翻转
    'transition': true, // 使用 CSS3 过度
    'fullscreen': true, // 播放时是否全屏
    'keyboard': true, // 是否支持键盘
    'url': 'data-source', // 设置大图片的 url
    'initialViewIndex':0,
    'toolbar':{
      "zoomIn":{  show: true, size: "large"},
      "zoomOut":{  show: true, size: "large"},
      "reset":{  show: true, size: "large"},
      "prev":{  show: false, size: "large"},
      "next":{  show: false, size: "large"},
      "play":{  show: false, size: "large"},
      "rotateLeft":{  show: true, size: "large"},
      "rotateRight":{  show: true, size: "large"},
      "flipHorizontal":{  show: true, size: "large"},
      "flipVertical":{  show: true, size: "large"},
    }
    // 'backdrop':false,
  }
})


// 富文本编辑框
import '../static/uedit/ueditor.config.js'
import '../static/uedit/ueditor.all.min.js'
import '../static/uedit/lang/zh-cn/zh-cn.js'
import '../static/uedit/ueditor.parse.min.js'


// 权限指令
import hasPerm from '@/directive/permission/hasPerm'
import perm from '@/directive/permission/perm'
// 注册全局的权限判断方法和指令
Vue.prototype.$hasPerm = hasPerm
Vue.directive('perm', perm)

Vue.use(Element, {
  size: 'medium', // set element-ui default size
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
