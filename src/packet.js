/**
* Import Packet Writer
**/
let PacketWriter = require('dgt-net').packet_writer

/**
* Initialize Packet
**/
let packet = {
  CLIENT_REQUEST_HANDSHAKE : 10000,

  SERVER_RESPONSE_ACCEPT_HANDSHAKE : 20000
}

/**
* Receive handshake request from client
**/
packet[packet.CLIENT_REQUEST_HANDSHAKE] = (remote,pr)=>{
  let username = pr.read_string()
  remote.handshake(username)
}

/**
* Response Acceptance handshking to Client
* @param pX is x-axis position of user
* @param pY is y-axis position of user
* @param cX is x-axis position of castle
* @param cY is y-axis position of castle
* @param cR is rotate of castle
* @param cH is health point of castle
* @param cC is conqueror of castle
**/
packet.responseAcceptHandShake = (pX,pY,cX,cY,cR,cH,cC)=>{
  let pw = new PacketWriter(packet.SERVER_RESPONSE_ACCEPT_HANDSHAKE)
  pw.append_float(pX)
  pw.append_float(pY)
  pw.append_float(cX)
  pw.append_float(cY)
  pw.append_float(cR)
  pw.append_float(cH)
  pw.append_string(cC)
  pw.finish()
  return pw.buffer
}

module.exports = packet;
