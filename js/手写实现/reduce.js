Array.prototype.myReduce = function (fn, initialValue, index, array) {
    if (Object.prototype.toString.call(this) === '[object Array]' && typeof fn === 'function') {
        let startIndex = initialValue ? 0 : 1
        let prev = initialValue || this[0]
        for (;startIndex < this.length; startIndex++) {
            prev = fn(prev, this[startIndex], startIndex, this)
        }
        return prev
    } else {
        return []
    }
}

Array.prototype.myReduceRight = function (fn, initialValue, index, array) {
    if (Object.prototype.toString.call(this) === '[object Array]' && typeof fn === 'function') {
        let startIndex = initialValue ? this.length - 1 : this.length - 2
        let prev = initialValue || this[this.length - 1]
        for (;startIndex >= 0; startIndex--) {
            prev = fn(prev, this[startIndex], startIndex, this)
        }
        return prev
    } else {
        return []
    }
}