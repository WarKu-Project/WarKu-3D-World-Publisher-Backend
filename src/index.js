/**
* Receive PORT from process
**/
process.PORT = process.argv[2]

/**
* Initialize Server
**/
let server = require('./server')
server.init(process.PORT)
