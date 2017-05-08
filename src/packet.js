//import library
let PacketWriter = require('dgt-net').packet_writer

//define packet
let packet = {
  WORLD_UPDATE_TIME : 10000,
  WORLD_UPDATE_STATE : 10001,
  CLIENT_UPDATE_TIME : 20000,
  CLIENT_UPDATE_STATE : 20001
}

packet[packet.WORLD_UPDATE_TIME] = (remote)=>{
  remote.onUpdateTime()
}

packet[packet.WORLD_UPDATE_STATE] = (remote)=>{
  remote.onUpdateState()
}

packet.updateTime = (time)=>{
  let pw = new PacketWriter(packet.CLIENT_UPDATE_TIME)
  pw.append_uint16(time)
  pw.finish()
  return pw.buffer
}
module.exports = packet;
