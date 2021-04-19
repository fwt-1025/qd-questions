String.prototype._indexOf = Array.prototype._indexOf = function (param) {
    let len = this.length
    if (Object.prototype.toString.call(this) === '[object String]') {
        param = String(param)
    }
    for (var i = 0; i < len; i++) {
        if (this[i] === param) {
            return i
        }
    }
    return -1
}

String.prototype._lastIndexOf = Array.prototype._lastIndexOf = function (param) {
    let len = this.length - 1
    if (Object.prototype.toString.call(this) === '[object String]') {
        param = String(param)
    }
    for (var i = len; i >= 0; i--) {
        if (this[i] === param) {
            return i
        }
    }
    return -1
}