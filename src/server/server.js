/**
* Import DGT-NET and Component
**/
let server = require('dgt-net').server
let packet = require('./packet')
let RemoteProxy = require('./remote')

/**
* Import MongoDB
*/
let mongo = require('../mongodb')

/**
* Initialize Server
*/
server.init = (port)=>{
  server.setRemoteProxyClass(RemoteProxy)
  server.setPacketObject(packet)
  server.listen(port)
  mongo.update('server',{ type:'world-child',port:port},{status:'Running'},()=>{
    server.startProcessCounting()
  })
}
/**
* Start Update time to server
**/
server.startProcessCounting = ()=>{
  let time = 0
  setInterval(()=>{
    mongo.update('server',{type:'world-child',port:process.PORT},{time:++time,response:0})
  },1000)
}

module.exports = server
