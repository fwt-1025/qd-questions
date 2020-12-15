### this到底是什么？ 如何理解？

this的绑定是在运行时绑定的不是在编写的时候，他的上下文取决于函数调用时的各种条件。与函数声明的位置以及函数的词法作用域无关。函数在调用时，会创建一个活动记录，这个记录中包含了函数在哪里被调用（调用栈），函数的调用方式，传的参数等，this就是这个记录中的一个属性， 会在函数执行的过程中用到。this既不指向函数本身也不指向函数的词法作用域。



### this绑定的规则

1. 默认绑定

   this默认绑定window对象

   ```js
   function Foo () {
       console.log(this.name)
   }
   var name = '123'
   Foo() // name   this => window
   ```

2. 隐式绑定

   this绑定是在运行时绑定的，不是在编写时，所以我们需要看函数在哪里调用的，它调用时的各种条件。如果函数调用时存在上下文对象，那么this会自动绑定到这个上下文对象上。

   ```js
   function Foo () {
       console.log(this.name)
   }
   var obj = {
       name: 'objFoo',
       Foo: Foo
   }
   obj.Foo() // objFoo 存在上下文对象obj 所以this => obj
   ```

   需要注意的是，对象属性引用链只有上一层或最后一层在调用位置中起作用。啥意思？

   ```js
   function Foo () {
       console.log(this.name)
   }
   var obj = {
       name: 'objFoo',
       Foo: Foo
   }
   var oob = {
       name: 'oobFoo',
       obj: obj
   }
   oob.obj.Foo() // objFoo 引用链的上一层或者最后一层，那就是obj这个对象层,所以 this => obj
   ```

   但是this绑定存在隐式丢失问题，啥叫隐式丢失？为什么会丢失呢？

   ```js
   function Foo() {
       console.log(this.name)
   }
   var obj = {
       name: 'objFoo',
       Foo: Foo
   }
   var name = 'windowFoo' // window作用域下的name属性
   var bar = obj.Foo // 函数别名
   
   bar() // 这里并不会输出objFoo, 而是输出windowFoo
   ```

   为什么会这样？

   ```js
   var bar = obj.Foo
   // 分析一下这句代码的执行，对象的引用，实际是都是引用的内存中存的对象的引用地址，所以这句代码应该是这样的
   var bar = obj.Foo = Foo
   ```

   所以执行bar()实际上就是直接执行Foo()，与obj没有任何关系了，现在Foo没有上下文对象，所以this选择了默认绑定window，所以输出windowFoo。

   隐式丢失 2  回调传参

   ```js
   function Foo () {
       console.log(this.name)
   }
   function callBack (fn) {
       fn()
   }
   var obj = {
       name: 'objFoo',
       Foo: Foo
   }
   var name = 'windowFoo'
   callBack(obj.Foo) // 输出的还是windowFoo 又是出乎意料的存在啊
   ```

   因为函数传参，其实就是参数赋值操作，这里代码应该这样理解

   ```js
   function callBack(fn = Obj.Foo = Foo) {
       fn() // 所以这里还是直接调用的Foo 与obj没有任何关系
   }
   ```

   隐世丢失3

   将函数传值给语言内置函数，同样会造成this隐世丢失

   ```js
   function Foo () {
       console.log(this.name)
   }
   var obj = {
       name: 'objFoo',
       Foo: Foo
   }
   var name = 'windowFoo'
   setTimeout(obj.Foo, 1100)
   ```

   setTimeout其实内部实现原理应该是这样子的，个人见解。

   ```js
   function setTimeout(fn,delay) {
   	fn.call(null, delay)
   }
   // 所以还是函数传参的形式
   ```

3. 显式绑定

   call ，apply， bind（硬绑定）

   ```js
   function Foo () {
       console.log(this.name)
   }
   var obj = {
       name: 'objFoo'
   }
   var demo = {
       name: 'demoFoo'
   }
   Foo.call(obj) // objFoo
   Foo.call(demo) // demoFoo
   Foo.apply(demo) // demoFoo
   Foo.apply(obj) // demoFoo
   ```

   然而call和apply还不能解决this隐世丢失的问题, 个人见解是call和apply会绑定this并立即调用函数。此时我们还可以更改this的指向。

   解决this隐世丢失的方法，bind

   ```js
   function Foo () {
       console.log(this.name)
   }
   var obj = {
       name: 'objFoo'
   }
   var demo = {
       name: 'demoFoo'
   }
   Foo.bind(obj)
   ```

   bind方法返回一个内部绑定好this的函数，以后无论在哪里调用this都不会变了，所以bind绑定又称为“硬绑定”

   

4. new绑定, 优先级最高

   ```js
   function Person () {
       console.log(this.name)
   }
   var obj = {
       name: 'person1'
   }
   var obj2 = {
       name: 'person2'
   }
   var p1 = new Person
   p1.name = 'person3'
   ```

### 优先级比较

new 绑定 >  显示绑定 （call、apply、bind） > 隐式绑定 （上下文对象） > 默认绑定 （window || null）



## 总结

找this绑定

1. 先找函数究竟在那里被调用；
2. 根据this的绑定规则寻找this绑定；
3. 如果有new 绑定就指向new 前面的实例对象；
4. 如果有显示绑定，就指向显示绑定的对象；
5. 如果有上下文对象，就指向上下文对象；
6. 都不存在，使用默认绑定，指向window，严格模式下，指向null；