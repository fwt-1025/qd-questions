Array.prototype._map = function (fn) {
  let result = Array(this.length)
  for (var i = 0; i < result.length; i++) {
    result[i] = fn.call(this, this[i], i, this)
  }
  return result
}
