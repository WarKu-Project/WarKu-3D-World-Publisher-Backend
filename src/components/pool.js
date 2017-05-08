let mongodb = require('../mongodb')

class ClientPool {
  constructor(){
    this.remotes = []
  }

  addRemote(remote){
    this.remotes.push(remote)
  }

  kickRemote(remote){
    let remoteIndex = this.remotes.indexOf(remote)
    this.remotes.splice(remoteIndex,1)
  }
}

module.exports = new ClientPool()
