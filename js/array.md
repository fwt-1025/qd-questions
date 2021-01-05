### 数组排序方法

```js
function sortArray (arr) {
    let i = arr.length * 3 / 4 // 这里是找规律得出的
    while(i--) {
    	for (var index = arr.length - 1;index > 0; index--) {
            if (arr[index] < arr[index - 1]) {
                temp = arr[index]
                arr[index] = arr[index - 1]
                arr[index - 1] = temp
            }
        }   
    }
    return arr
}
console.time('ssss')
// 1, 33, 44, 2, 5, 10, 333, 444, 3, 11, 2, 55
sortArray([12,9,38,44,7,98,35,59,49,88,38])
console.timeEnd('ssss')



 function XRSort(arr){ // 希尔排序
     var interval = parseInt(arr.length / 2);  分组间隔设置
     while(interval > 0){
          debugger
         for(var i = 0 ; i < arr.length ; i ++){
             var n = i;
             while(arr[n] < arr[n - interval] && n > 0){
                 var temp = arr[n];
                 arr[n] = arr[n - interval];
                 arr[n - interval] = temp;
                 n = n - interval;
             }
         }
         interval = parseInt(interval / 2);
     }
     return arr;
 }

function mpSort (arr) { // 冒泡排序
    var temp;
    for(var i=0;i<arr.length-1;i++){
        for(var j=0;j<arr.length-1;j++){
            if(arr[j]>arr[j+1]){
                temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
        }
    }
    return arr
}
```

第一种排序是自己想的，感觉跟冒泡排序差不多， 性能跟冒泡排序差不多，希尔排序是最好的，性能是最佳的。

### 数组去重的方法

```js
function duplicateArray (arr) {
    let result = []
    arr.forEach((item, index) => {
        if (!result.includes(item)) {
            result.push(item)
        }
    })
    return result
}
duplicateArray(2, 3,4, 2, 6, 5]) // 对象不能去重


// 使用reduce + includes
function duplicateArray (arr) {
   return arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], [])
} // 对象不能去重


// ES6
[...new Set(arr)] // 引用类型以及基本类型都可以去重


// hasOwnProperty
function duplicateArray (arr) {
    let obj = {}
    return arr.filter((item, index) => {
        console.log(typeof item + item)
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : obj[typeof item + JSON.stringify(item)] = true
    })
}
duplicateArray([1,2,3,4,{name: '234'},{name:'123'}, {name: '123'}, {name: '234'}, 1, 2, 5, '1', '2', '3','1', 'a', 'b', 'c', 'c', 'e', 'd'])
```

