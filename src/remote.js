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
    mongodb.find(this,'world',{attr:'time'},this.updateTime)
  }

  updateTime(self,time) {
    console.log(time)
  }

  //State
  onUpdateState() {
    mongodb.find(this,'world',{attr:'state'},this.updateState)
  }

  updateState(self,state){
    console.log(state);
  }
}

module.exports = Client
