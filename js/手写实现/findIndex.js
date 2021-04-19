Array.prototype._findIndex = function (fn, context) {
    let len = this.length
    for (var i = 0; i < len; i++) {
        if (fn(this[i], i, this)) {
            return i
        }
    }
    return -1
}