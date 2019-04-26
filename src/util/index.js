export function _uuid () {
  return Math.random() * 1000
}
export function compare (property) {
  if (property === 'time') {
    return function (a, b) {
      var value1 = (a[property]).valueOf()
      var value2 = (b[property]).valueOf()
      return value1 - value2
    }
  }
  return function (a, b) {
    var value1 = a[property]
    var value2 = b[property]
    return value1 - value2
  }
}
export function getAverageNum (arr = []) {
  let sum = 0
  arr.forEach(v => {
    sum += v.data
  })
  return arr.length > 0 ? (sum / arr.length).toFixed(2) : 0
}
