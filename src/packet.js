//import library
let pw = require('dgt-net').packet_writer

//define packet
let packet = {
  WORLD_UPDATE_TIME : 10000,
  WORLD_UPDATE_STATE : 10001
}

packet[packet.WORLD_UPDATE_TIME] = (remote)=>{
  remote.onUpdateTime()
}

packet[packet.WORLD_UPDATE_STATE] = (remote)=>{
  remote.onUpdateState()
}

module.exports = packet;
