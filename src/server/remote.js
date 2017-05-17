/**
* Import DGT-NET RemoteProxy
**/
let RemoteProxy = require('dgt-net').server.RemoteProxy

/**
* Import packet and MongoDB
**/
let packet = require('./packet')
let mongodb = require('../mongodb')

/**
* Initialize or access pool
**/
let pool = require('../components/pool')

/**
* Client Class
**/
class Client extends RemoteProxy {

  /**
  * Call when client connect to server
  **/
  onConnected() {
    console.log("RemoteProxy There is a connection from " + this.getPeerName())
    pool.addClient(this)
  }
  /**
  * Call when client disconnect from server
  **/
  onDisconnected() {
    console.log("RemoteProxy Disconnected from " + this.getPeerName())
    pool.removeClient(this)
  }
  /**
  * Request Update Individual State
  **/
  requestUpdateIndividualState(){
    pool.notifyIndividualState(this)
  }
  /**
  * Notify State Change to Client
  **/
  notifyStateChange(state){
    this.send(packet.notifyStateChange(state))
  }
  /**
  * Update Time to client
  **/
  updateTime(time){
    this.send(packet.updateTime(time))
  }
}

module.exports = Client
