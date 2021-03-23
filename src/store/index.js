import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import tags from './modules/tags'
import logs from './modules/logs'
import getters from './getters'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)

  // console.log(modulesFiles.keys()); 
     let arr={}
// 无需引入modules文件
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    // console.log(modules==arr)
    // console.log(modules,modulePath)
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    // console.log(moduleName)
    const value = modulesFiles(modulePath)
    // console.log(value)
    modules[moduleName] = value.default
    return modules
}, arr)

//  console.log(modules)
const store = new Vuex.Store({
    // modules: {
    //     user,
    //     common,
    //     logs,
    //     tags,
    // },
    modules: modules,
    getters
})

export default store