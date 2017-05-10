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
  /**
  * Do handshaking and save client username
  **/
  handshake(username){
    this.username = username
    let self = this
    this.assignPlayerPosition((pX,pY)=>{
      self.fetchCastleInfo((cX,cY,cR,cH,cC)=>{
        self.responseAcceptHandShake(pX,pY,cX,cY,cR,cH,cC)
      })
    })
  }
  /**
  * Response Success handshaking to user
  **/
  responseAcceptHandShake(pX,pY,cX,cY,cR,cH,cC){
    this.send(packet.responseAcceptHandShake(pX,pY,cX,cY,cR,cH,cC))
  }
  /**
  * Assign Position for player
  **/
  assignPlayerPosition(cb){
    let direction = Math.floor(Math.random()*4)
    let pX = 0
    let pY = 0
    if (direction == 0){
      pY = Math.random()*50+50
      pX = Math.random()*400+50
    }else if (direction == 1){
      pX = Math.random()*50+50
      pY = Math.random()*400+50
    }else if (direction == 2){
      pY = Math.random()*400+50
      pX = Math.random()*50+400
    }else if (direction == 3){
      pY = Math.random()*50+400
      pX = Math.random()*400+50
    }
    cb(pX,pY)
  }
  /**
  * fetch infomation of castle
  **/
  fetchCastleInfo(cb){
    mongodb.find('world',{attr:'castle'},(result)=>{
      let cX = result[0].value.position.x
      let cY = result[0].value.position.y
      let cR = result[0].value.rotation
      let cH = result[0].value.progress
      let cC = result[0].value.conqueror
      cb(cX,cY,cR,cH,cC)
    })
  }
}

module.exports = Client
