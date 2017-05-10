/**
* Import DGT-NET RemoteProxy
**/
let RemoteProxy = require('dgt-net').server.RemoteProxy

/**
* Import packet and MongoDB
**/
let packet = require('./packet')
let mongodb = require('./mongodb')

/**
* Initialize or access pool
**/
let pool = require('./components/pool')

/**
* Client Class
**/
class Client extends RemoteProxy {

  /**
  * Call when client connect to server
  **/
  onConnected() {
    console.log("RemoteProxy There is a connection from " + this.getPeerName())
  }
  /**
  * Call when client disconnect from server
  **/
  onDisconnected() {
    console.log("RemoteProxy Disconnected from " + this.getPeerName())
  }

}

module.exports = Client
