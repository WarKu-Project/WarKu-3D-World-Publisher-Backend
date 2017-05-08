let mongodb = require('../mongodb')
let Time = require('../util/time')
class ClientPool {
  constructor(){
    this.remotes = []
  }

  assignWorld(remote){
    this.world = remote
  }

  addRemote(remote){
    if (this.world)
      this.remotes.push(remote)
    else
      this.assignWorld(remote)
  }

  kickRemote(remote){
    let remoteIndex = this.remotes.indexOf(remote)
    this.remotes.splice(remoteIndex,1)
  }

  updateClientTime(time){
    if (time[0].value>=0)
      this.remotes.forEach((client)=>{client.updateTime(time[0].value)})
  }
}

module.exports = new ClientPool()
