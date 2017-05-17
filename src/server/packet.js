/**
* Import Packet Writer
**/
let PacketWriter = require('dgt-net').packet_writer

/**
* Initialize Packet
**/
let packet = {
  CLIENT_REQUEST_GAME_STATE : 10000,

  SERVER_NOTIFY_STATE_CHANGE : 21000,
  SERVER_UPDATE_TIME : 22000
}
/**
* Client request Game state
**/
packet[packet.CLIENT_REQUEST_GAME_STATE] = (remote,pr)=>{
  remote.requestUpdateIndividualState()
}
/**
* Notify State Change to Client
* @param state is state of game
**/
packet.notifyStateChange = (state)=>{
  let pw = new PacketWriter(packet.SERVER_NOTIFY_STATE_CHANGE)
  pw.append_string(state)
  pw.finish()
  return pw.buffer
}
/**
* Update time
* @param time is current time
**/
packet.updateTime = (time)=>{
  let pw = new PacketWriter(packet.SERVER_UPDATE_TIME)
  pw.append_uint16(time)
  pw.finish()
  return pw.buffer
}
module.exports = packet;
