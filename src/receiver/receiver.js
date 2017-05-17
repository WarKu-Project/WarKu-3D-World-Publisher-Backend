/**
* Import Receiver Component
**/
let packet = require('./packet')
let remote = require('./remote')
/**
* Initialize Receiver
**/
let receiver = require('dgt-net').client
receiver.setPacketObject(packet)
receiver.setRemoteClass(remote)
receiver.connect('localhost',9000)

module.exports = receiver
