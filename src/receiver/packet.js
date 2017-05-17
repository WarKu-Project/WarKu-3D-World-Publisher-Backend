/**
* Import Packet Writer
**/
let PacketWriter = require('dgt-net').packet_writer
/**
* Initialize Packet
***/
let packet = {
  SERVER_NOTIFY_STATE_CHANGE : 10000
}

packet[packet.SERVER_NOTIFY_STATE_CHANGE] = (remote,pr)=>{
  remote.notifyStateChange()
}

module.exports = packet
