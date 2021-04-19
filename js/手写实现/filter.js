// 过滤符合条件的值，并组合成一个新的数组返回

Array.prototype._filter = function (fn, context) {
  let result = []
  for (var i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      result.push(this[i])
    }
  }
  return result
}
