
function miniStr(str, num) {
  var miniString = str
  if (str.length >= num) {
    miniString = str.substr(0, num - 1) + "..."
  }
  if (str.length <= 10) {
    miniString = "暂无收录相关信息"
  }
  return miniString
}


module.exports = {
  miniStr: miniStr,
}
