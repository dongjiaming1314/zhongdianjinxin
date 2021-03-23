import 'babel-polyfill'
import 'classlist-polyfill'
import Vue from 'vue'

import App from './App'
import './permission' // 权限
import './error' // 日志
import router from './router/router'
import store from './store'
import { loadStyle, filterForm, vaildData } from './util/util'
import * as urls from '@/config/env'
import { iconfontUrl, iconfontVersion } from '@/config/env'
import * as filters from './filters' // 全局filter
import './styles/common.scss'
import basicContainer from './components/basic-container/main'
// 插件 json 展示
import vueJsonTreeView from 'vue-json-tree-view'
/* 引入常用常量 */
import * as baseContent from './util/base-content'
import commonDialog from './components/Dialog'

import axios from './router/axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
    // 引入AVue
import Avue from '@smallwei/avue'
Vue.use(Avue)
import '@smallwei/avue/lib/index.css'

// bpmn 相关依赖
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
// 左边工具栏以及编辑节点的样式
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'

// 引入Element
import ELEMENT from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ELEMENT)


import { validatenull } from '@/util/validate'

Vue.prototype.validatenull = validatenull
Vue.prototype.filterForm = filterForm
Vue.prototype.vaildData = vaildData

Vue.use(router)

Vue.use(vueJsonTreeView)



// 注册全局容器
Vue.component('basicContainer', basicContainer)
Vue.component('commonDialog', commonDialog)
    // 加载相关url地址
Object.keys(urls).forEach(key => {
    Vue.prototype[key] = urls[key]
})

//加载过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
    loadStyle(iconfontUrl.replace('$key', ele))
})

/* 注入常量 */
Object.keys(baseContent).forEach(key => {
    Vue.prototype[key] = baseContent[key]
})

Vue.config.productionTip = false

let a=new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
console.log(a)