#### node 连接oracledb 数据库

1. 配置，不加此配置会报错，

   安装oracledb的 Instant Client Package - Basic、 Instant Client Package - SDK

   windows7需要下载oracle19版本一下的，19版本的windows不能运行，不支持。

   安装地址： https://www.oracle.com/cn/database/technologies/instant-client/winx64-64-downloads.html

   ![image-20210226135358817](.\image\image-20210226135358817.png)

2. 安装完成之后的系统环境变量的配置

   下载下来的两个zip文件，解压到一个文件夹中

   ![image-20210226135502589](.\image\image-20210226135502589.png)

   ​							![image-20210226135639599](.\image\image-20210226135620810.png)

   ​			

   打开我的电脑 => 属性 => 高级系统设置 => 环境变量

   系统环境变量的Path中添加 , oracle的安装绝对路径      D:\workspace\oracle\instantclient_19_10;

   新建系统环境变量， 变量名： OCI_LIB_DIR 变量值：   D:\workspace\oracle\instantclient_19_10\sdk\lib\msvc

   ​									变量名：OCI_INC_DIR 变量值：  D:\workspace\oracle\instantclient_19_10\sdk\include

   为了确保配置生效，需要重启电脑；

3.  node中使用oracledb

   安装oracledb  npm i oracledb -S

   ```js
   const oracledb = require('oracledb')
   
   oracledb.autoCommit = true
   
   let connection
   async function run () {
       try {
           connection = await oracledb.getConnection({
               user: 'oracle用户名',
               password: '密码',
               connectString: 'ip:port/数据库名'
           })
           console.log('oracledb 数据库连接成功')
       } catch (err) {
           if (err) {
               console.log('oracledb 数据库连接失败', err.message)
           }
       } finally {
           try {
               if (connection) {
                   await connection.close()
               }
           } catch (err) {
               console.log(err.message)
           }
       }
   }
   run()
   
   ```

   