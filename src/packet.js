//import library
let pw = require('dgt-net').packet_writer

//define packet
let packet = {
  WORLD_UPDATE_TIME : 10000
}

packet[packet.WORLD_UPDATE_TIME] = (remote)=>{
  remote.onUpdateTime()
}

module.exports = packet;
