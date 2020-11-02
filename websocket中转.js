const WServer = require('ws').Server
const Websocket = require('ws')
const conf = require('../config/index')(process.env.NODE_ENV) // 根据环境获取不同的websocketURL
// config/index.js
//    export default {
//         dev: {
//              websocket: {
//                     faultServer: 'xx.xx.xx.xx:8080/server', // java端的websocket服务地址，真实的地址
//                     upgradeServer: 'xx.xx.xx.xx:8081/upserver'
//             }
//         },
//         prod: {
//              websocket: {
//                     faultServer: 'xx.xx.xx.xx:8080/server',
//                     upgradeServer: 'xx.xx.xx.xx:8081/upserver'
//             }
//         }
//     }
let wsClient = {} // 存储客户端websocket连接
let clientFront = {} // 存储node端的客户端websocket连接
function webSocketServer(server) {
    const wsServer = new WServer({ server })
    wsServer.on('connection', (conn, req) => {
//         浏览器端连接时需要在链接后面拼上对应的服务 ws://xx.xx.xx.xx:8080/10110?faultServer  // 连接的node 本地服务的地址， 基于express 与express服务共用一个端口。
        let url = req.url.split('?')
        if (wsClient[req.url]) {
            delete wsClient[req.url]
            delete clientFront[req.url]
        }
        wsClient[req.url] = conn // 浏览器
        wsClient[req.url].on('message', (mess) => {
        })
        wsClient[req.url].on('close', () => {
            clientFront[req.url].close() // when the browser client is closed, the node client also should be shut down, 解决内存泄漏， 不然接收到的数据无法被消费掉。
            delete clientFront[req.url]
            return false
        })
        // node Client
        clientFront[req.url] = new Websocket(`ws://${conf.websocket[url[1]]}${url[0]}`) // node client
        Object.keys(clientFront).forEach(item => {
            clientFront[item].onopen = function () {
                // console.log(new Date().toLocaleString() + ': ' + item + '连接成功')
            }
            clientFront[item].onmessage = function (e) {
                // console.log('收到消息来自' + item, e.data)
                // wsClient[item].send(e.data)
                wsClient[item].send(e.data)
            }
            clientFront[item].onclose = function () {
                // console.log(item + '连接关闭')
            }
        })
    })
}

module.exports = webSocketServer
