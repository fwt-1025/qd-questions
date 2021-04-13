Array.prototype._forEach = function (fn, context) {
  for (var i = 0; i < this.length; i++) {
    fn.call(context, this[i], i, this)
  }
  return this
}
