/*
* 功能： 需要数组中的每一项都满足回调函数中的条件才返回true， 否则返回false
* @fn 回调函数
* @context 上下文对象， this指向
* return  boolean true | false
*/

Array.prototype._every = function (fn, context) {
  for (var i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      return false
    }
  }
  return true
}
