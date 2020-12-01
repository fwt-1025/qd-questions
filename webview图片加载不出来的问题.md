## webview 图片加载不出来的问题

#### 场景 h5的页面中调用后端接口，接口返回oss图片地址，网页上能正常显示，放在车机的webview盒子中，图片不显示？？？？

- 问题分析：由于前端项目部署在https的协议上，访问的图片是http协议的资源，android webview 从Lollipop(5.0)开始webview默认不允许混合模式，https当中不能加载http资源，所以需要webview设置开启允许混合模式访问。

- 解决方式有两种：我个人的解决方式

1. 后端将图片转为base64格式，返回给前端，前端拼接base64格式显示在页面上；

```js
  let imgUrl = ''
  axios.get('http://xxx.xxx:0000').then(res => {
    // 这里假设 res.data是后端处理好的base64字符串
    imgUrl = 'data:image/png,base64,' + res.data
  })
 
 ```
2. webview设置开启允许跨协议共享资源。
```js
  if (Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP) {
        mWebView.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
  }
  mWebView.getSettings().setBlockNetworkImage(false)
 ```
