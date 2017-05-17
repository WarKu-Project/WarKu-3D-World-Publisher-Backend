/**
* Receive PORT from process
**/
process.PORT = process.argv[2]
if (!process.PORT)
  process.exit(1)
/**
* Initialize Server
**/
let server = require('./server/server')
server.init(process.PORT)
/**
* Initialize Receiver
**/
let receiver = require('./receiver/receiver')
/**
* Import MongoDB
**/
let mongodb = require('./mongodb')
/**
* Terminate Condition
**/
process.on ('uncaughtException', err => {
  mongodb.update('server',{ type:'world-child',port:process.PORT},{status:'Disconnected'},()=>{
    process.exit(1)
  })
})
process.on ('SIGINT', () => {
  mongodb.update('server',{ type:'world-child',port:process.PORT},{status:'Disconnected'},()=>{
    process.exit(0)
  })
})
process.on('exit',code=>{
  mongodb.update('server',{ type:'world-child',port:process.PORT},{status:'Disconnected'},()=>{
    process.exit(code)
  })
})
