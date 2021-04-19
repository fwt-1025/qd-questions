Array.prototype._find = function (fn, context) {
  let key
  for (var i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      key = i
    }
  }
  return key ? this[key] : undefined
}
