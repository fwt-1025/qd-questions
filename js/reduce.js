// js实现 reduce


Array.prototype.createReduce = function (fn, initialValue) {
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

let arr = [1,2,3,4,5]

arr.createReduce((prev, cur) => prev + cur) // 15