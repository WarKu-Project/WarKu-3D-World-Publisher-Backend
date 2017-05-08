//import library
let RemoteProxy = require('dgt-net').server.RemoteProxy

let packet = require('./packet')
let mongodb = require('./mongodb')
let log = require('./util/log')
let pool = require('./components/pool')

class Client extends RemoteProxy {

  onConnected() {
    console.log("RemoteProxy There is a connection from " + this.getPeerName())
    log.insert('world-server-'+process.PORT,this.getPeerName()+' connect to World Server at PORT'+process.PORT)
    pool.addRemote(this)
  }

  onDisconnected() {
    console.log("RemoteProxy Disconnected from " + this.getPeerName())
    log.insert('world-server-'+process.PORT,this.getPeerName()+' disconnect to World Server at PORT'+process.PORT)
    pool.kickRemote(this)
  }

  //Time
  onUpdateTime() {
    mongodb.find(this,'world',{attr:'time'},this.updateClientTime)
  }

  updateClientTime(self,time) {
    pool.updateClientTime(time)
  }

  updateTime(time){
    mongodb.update('server',{type:'world',port:process.PORT},{workRate:++process.workRate})
    this.send(packet.updateTime(time))
  }

  //State
  onUpdateState() {
    mongodb.find(this,'world',{attr:'state'},this.updateState)
  }

  updateState(self,state){
    pool.notifyNewState(state)
  }

  notifyNewState(state){
    mongodb.update('server',{type:'world',port:process.PORT},{workRate:++process.workRate})
    this.send(packet.updateNewState(state))
  }
}

module.exports = Client
