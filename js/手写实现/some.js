/*
* 功能： 数组中有任何一项符合回调函数中的条件就返回true， 都不符合就返回false
* @fn 回调函数
* @context 上下文对象 this 指向
*/

Array.prototype._some = function (fn, context) {
  for (var i = 0; i < this.length; i++) {
    if (fn.call(context, this[i], i, this)) {
      return true
    }
  }
  return false
}
