//import library
let RemoteProxy = require('dgt-net').server.RemoteProxy

let packet = require('./packet')
let mongodb = require('./mongodb')

class Client extends RemoteProxy {

  onConnected() {
    console.log("RemoteProxy There is a connection from " + this.getPeerName())
  }

  onDisconnected() {
    console.log("RemoteProxy Disconnected from " + this.getPeerName())
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
