### git基础操作命令行

- git初始化 

  > git init

- git克隆仓库 

  > git clone 仓库地址

- git查看状态

  > git status 
  >
  > git status -s

- git将文件提交到远程仓库三步曲

  1. git add 文件名 | 文件路径 | .     将文件添加到暂存区
  2. git commit -m "message"  将暂存区的内容提交到本地仓库，生成一个本地提交记录
  3. git push 将本地提交记录推到远程仓库中，与远程仓库中的代码合并。

- git stash 暂存

  > 将本地的修改暂时存储，因为我们在执行git pull 拉取别人的代码时，会有可能发生冲突的情况，这时候git会提示
  >
  > ```go
  > error: Your local changes to the following files would be overwritten by merge:
  >         // 相对应的文件
  > Please commit your changes or stash them before you merge.
  > 
  > ```
  >
  > 所以我们需要将本地的修改存起来，使本地跟远程仓库的代码保持一致，然后执行git pull 拉取代码就会成功了，成功之后我们需要将我们存储的我们修改的代码从缓存中拿出来，命令是 `git stash pop `, 执行这个命令，如果文件没有发生冲突，git会自动合并该文件，并且暂存区中的记录会自动删除，如果出现冲突，暂存区中的记录不会被删除，如何解决冲突并删除记录呢？
  >
  > 1. 找到冲突文件，解决冲突；
  > 2. `git add 冲突文件 `或者是 `git reset HEAD 冲突文件`， 这都是让冲突文件跟其他文件编程一样的操作。
  > 3. 然后就是Git三步曲git add 、 git commit、 git push
  > 4. 删除stash记录  `git stash drop`

- git 忽略某个文件的修改，使git不在追踪该文件的修改（远程仓库中已有此文件，但是我们之后不想提交这个文件，因为这个文件可能在远程仓库是永恒不变的，我们只在开发时本地做修改，如果提交会导致组内其他成员合并代码冲突，这时候我们可以忽略这个文件的修改）

  > git update-index --assume-unchanged  文件名
  >
  > 这个命令的意思是 忽略git对此文件的追踪，但是不会次文件加入.gitignore，我们所做的修改只在本地起作用

  后面开发中我们突然又想追踪这个文件了，我们不得不在提交这个文件，怎么办？

  > git update-index --no-assume-unchanged 文件名
  >
  > 这个命令的意思是重新对某个文件做追踪，我们可以提交这个文件

- git reset 重置代码

  > git reset --soft <commitId>
  >
  > 将代码回退到某个版本，--soft 软重置，本地修改的代码仍然存在
  >
  > git reset --hard <commitId>
  >
  > 将代码回退到某个版本，--hard 强制重置，本地修改的代码会丢失。不到万不得已，最好不要使用。
  
- `git config --global core.quotepath false`    解决git中文文件名乱码的情况