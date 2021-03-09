/**
 * 配置参考:
 * https://cli.vuejs.org/zh/config/
 */

//const url = 'https://dev.madp.xyz'
// const url = 'http://172.22.67.60:9999'
//const mfs = 'https://www.madp.xyz'



// 最新环境
const url = 'http://111.229.70.199:9999'
const mfs = 'http://111.229.70.199:9999'

// 测试环境
// const url = 'http://47.98.150.81:9999'
// const mfs = 'http://47.98.150.81:9999'

// 李志强
// const url = 'http://172.17.1.136:9999'
// const mfs = 'http://172.17.1.136:9999'

// 刘玉杰
// const url = 'http://192.168.50.64:9999'
// const mfs = 'http://192.168.50.64:9999'

// 张继伟
// const url = 'http://172.17.1.130:9999'
// const mfs = 'http://172.17.1.130:9999'

// 赵鑫
// const url = 'http://172.17.1.40:9999'
// const mfs = 'http://172.17.1.40:9999'

// 刘松
// const url = 'http://172.17.20.185:9999'
// const mfs = 'http://172.17.20.185:9999'

// 蒋志刚
// const url = 'http://192.168.50.248:9999'
// const mfs = 'http://192.168.50.248:9999'

module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    chainWebpack: config => {
        // 忽略的打包文件
        config.externals({
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'element-ui': 'ELEMENT',
            'avue': 'Avue',
        })
        const entry = config.entry('app')
        entry
            .add('babel-polyfill')
            .end()
        entry
            .add('classlist-polyfill')
            .end()
    },
    // 配置转发代理
    devServer: {
        disableHostCheck: true,
        port: 8081,
        proxy: {
            // 文件服务器反向代理
            '/mfs': {
                target: mfs,
                ws: true,
                pathRewrite: {
                    '^/mfs': '/mfs'
                }
            },
            '/auth': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/auth': '/auth'
                }
            },
            '/admin': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/admin': '/admin'
                }
            },
            '/code': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/code': '/code'
                }
            },
            '/gen': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/gen': '/gen'
                }
            },
            '/actuator': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/actuator': '/actuator'
                }
            },
            '/monitor': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/monitor': '/monitor'
                }
            },
            '/mp': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/mp': '/mp'
                }
            },
            '/daemon': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/daemon': '/daemon'
                }
            },
            '/job': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/job': '/job'
                }
            },
            '/tx': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/tx': '/tx'
                }
            },
            '/act': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/act': '/act'
                }
            },
            '/mss': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/mss': '/mss'
                }
            },
            '/cms': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/cms': '/cms'
                }
            },
            '/rms': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/rms': '/rms'
                }
            },
            '/equity': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/equity': '/equity'
                }
            },
            '/cust': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/cust': '/cust'
                }
            },
            '/custmgr': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/custmgr': '/custmgr'
                }
            },
            '/mall': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/mall': '/mall'
                }
            },
            '/good': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/good': '/good'
                }
            },
            '/supplier': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/supplier': '/supplier'
                }
            },
            '/growth': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/growth': '/growth'
                }
            },
            '/points': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/points': '/points'
                }
            },
            '/costBreakdown': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/costBreakdown': '/costBreakdown'
                }
            }
        }
    }
}
