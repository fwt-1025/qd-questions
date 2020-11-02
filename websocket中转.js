const WServer = require('ws').Server
const Websocket = require('ws')
const conf = require('../config/index')(process.env.NODE_ENV) // 根据环境获取不同的websocketURL
let wsClient = {} // 存储客户端websocket连接
let clientFront = {} // 存储node端的客户端websocket连接
function webSocketServer(server) {
    const wsServer = new WServer({ server })
    wsServer.on('connection', (conn, req) => {
        let url = req.url.split('?')
        if (wsClient[req.url]) {
            delete wsClient[req.url]
            delete clientFront[req.url]
        }
        wsClient[req.url] = conn // 浏览器
        wsClient[req.url].on('message', (mess) => {
        })
        wsClient[req.url].on('close', () => {
            clientFront[req.url].close() // when the browser client is closed, the node client should also be shut down
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
