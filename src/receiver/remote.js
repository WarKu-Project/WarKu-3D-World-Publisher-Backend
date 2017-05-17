/**
* Import MongoDB RemoteProxy Pool
**/
let mongodb = require('../mongodb')
let Remote = require('dgt-net').client.Remote
let pool = require('../components/pool')
/**
* Class Receiver
**/
class Receiver extends Remote {
  /**
  * Call when client connect to server
  **/
  onConnected() {
    console.log("Receiver connect to " + this.getPeerName())
  }
  /**
  * Call when client disconnect from server
  **/
  onDisconnected() {
    console.log("Receiver disconnect from " + this.getPeerName())
  }
  /**
  * Notify Pool that State is Change
  **/
  notifyStateChange(){
    pool.notifyStateChange()
  }
}

module.exports = Receiver
