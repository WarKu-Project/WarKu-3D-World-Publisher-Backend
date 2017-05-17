/**
* Import MongoDB
**/
let mongodb = require('../mongodb')
/**
* Client Pool Class
**/
class ClientPool {

  constructor(){
    this.clients = []
    this.time = 60
    let self = this
    this.timer = setInterval(()=>{
      self.countDown()
    },1000)
  }
  /**
  * Add Client to server
  **/
  addClient(client){
    this.clients.push(client)
  }
  /**
  * Remove Client from Server
  **/
  removeClient(client){
    this.clients.splice(this.clients.indexOf(client),1)
  }
  /**
  * Notify client that state is change
  **/
  notifyStateChange(){
    let self = this
    mongodb.find('world',{attr:'state'},(result)=>{
      let state = result[0].value
      if (state == 'Waiting')
        self.setTime(30)
      else
        self.setTime(60)
      self.clients.forEach((client)=>{
        client.notifyStateChange(state)
      })
    })
  }
  /**
  * Update Individual State
  **/
  notifyIndividualState(client){
    mongodb.find('world',{attr:'state'},(result)=>{
      let state = result[0].value
      client.notifyStateChange(state)
    })
  }
  /**
  * Set timer
  **/
  setTime(time){
    this.time = time
  }
  /**
  * Count down
  **/
  countDown(){
    this.time--;
    let self = this
    this.clients.forEach((client)=>{
      client.updateTime(self.time)
    })
  }
}

module.exports = new ClientPool()
