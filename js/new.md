## js中 new 的原理 及实现

new 做了几件事

- 创建一个空对象 Object.create(null) {}
- 将该对象的constructor指向另一个对象；
- 将该对象作为this的上下文；
- 如果该函数没有返回对象，则返回this该对象；



new Fun() 做的事情

- 一个继承自Fun.prototype的新对象被创建；
- 使用指定的参数调用Fun，并将this绑定到新创建的对象，new Fun等同于new Fun(),也就是没有指定参数列表，Fun不带任何参数调用的情况。
- 由构造函数返回的对象就是new 表达式的结果。如果构造函数没有显示的返回一个对象，则使用步骤1创建的对象。（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤）

实现一个简单的new

```js
function _new (fn) {
	let obj = Object.create(fn.prototype)
    fn.apply(obj, Array.prototype.slice.call(arguments, 1))
    return obj
}

function Person (name) {
    this.name = name
}

let person1 = _new(Person, '小明') // Person{name: '小明'}
```

