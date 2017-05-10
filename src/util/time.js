/**
* Convert Minute to Millisec
**/
let minute = (min) => {
  return 60000 * min
}
/**
* Convert Second to Millisec
**/
let second = (sec) => {
  return 1000 * sec
}
/**
* Convert Millisec to Second
**/
let toSecond = (ms) => {
  return ms/1000
}
/**
* Convert Millisec to Minute
**/
let toMinute = (ms)=>{
  return ms/60000
}

module.exports = {
  minute : minute,
  second : second,
  toSecond : toSecond,
  toMinute : toMinute
}
