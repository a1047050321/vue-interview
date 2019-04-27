export function _uuid () {
  return Math.random() * 1000
}
export function compare (payload) {
  let { name, type } = payload
  if (name === 'time') {
    return function (a, b) {
      var value1 = (a[name]).valueOf()
      var value2 = (b[name]).valueOf()
      if (type === 0 || type === -1) {
        return value1 - value2
      }
      return value2 - value1
    }
  }
  return function (a, b) {
    var value1 = a[name]
    var value2 = b[name]
    if (type === 0 || type === -1) {
      return value1 - value2
    }
    return value2 - value1
  }
}
export function getAverageNum (arr = []) {
  let sum = 0
  arr.forEach(v => {
    sum += v.data
  })
  return arr.length > 0 ? (sum / arr.length).toFixed(2) : 0
}
export function addZero (num = 0) {
  if (num < 10) {
    return '0' + num
  }
  return num
}

export function changeDate (date = new Date()) {
  let year = date.getFullYear()
  let month = addZero(date.getMonth() + 1)
  let day = addZero(date.getDate())
  let hours = addZero(date.getHours())
  let minutes = addZero(date.getMinutes())
  let seconds = addZero(date.getSeconds())
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
