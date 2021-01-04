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

