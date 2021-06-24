function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1) // 把第一个参数去掉， 因为第一个参数是函数。
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments)
        var finalArgs = args.concat(innerArgs)
        return fn.apply(null, finalArgs)
        // return fn.call(null, ...finalArgs)
    }
}

function add (num1, num2) {
    return num1 + num2
}

var currAdd = curry(add, 4)

currAdd(3)