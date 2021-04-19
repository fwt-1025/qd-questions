Array.prototype._includes = function (para) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] !== para) {
            continue
        } else {
            return true
        }
    }
    return false
}