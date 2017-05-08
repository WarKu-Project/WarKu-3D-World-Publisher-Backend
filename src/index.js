//import library
let server = require('dgt-net').server
let packet = require('./packet')
let RemoteProxy = require('./remote')

//Initialize MongoDB
let mongo = require('./mongodb')

//Initialize Log
let log = require('./util/log')

//Initialize Server
var PORT = process.argv[2]
process.PORT = PORT

server.setRemoteProxyClass(RemoteProxy)
server.setPacketObject(packet)
server.listen(PORT)
mongo.update('server',{ type:'world', port:PORT},{type:'world', port:PORT })
log.insert('world-server-'+PORT,'Initialize World Server')
