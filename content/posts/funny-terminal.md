---
title: 让你的终端更有趣——一句话心情
date: 2017-01-08T21:59:23+08:00
draft: false
tags: [
  "原创"
]
---

这几天没事的时候我就在想，平时的学习生活中，脑子里总会时不时冒出一些奇奇怪怪的点子，或是几句感慨，几句抱怨，或是你那是有点奔放的小心情....

<!--more-->

我的Github:  https://github.com/jeasonstudio

获取我们应该找个法子把它记录下来。

于是我写了一个十几行的 shell 脚本，每当我打开终端的时候，它就像整点的闹钟如约而至。文章最后，我会分享几个我在 macOS 上踩到的坑。先看 DEMO：

![image](https://user-images.githubusercontent.com/17971291/31884920-651bfb2e-b7b4-11e7-9dd6-7314f17f2db3.png)

打开的时候是很弱智的提示语，然后你把你脑子里想的 SHIT 打上去，注意，oneLineFeeling只有一行的机会哦~

![image](https://user-images.githubusercontent.com/17971291/31884929-6e863c56-b7b4-11e7-9dac-ad1aed77333e.png)

然后他会自动把内容提交 GIT 仓库。十秒钟，完成。再看看 GitHub 仓库里。

![image](https://user-images.githubusercontent.com/17971291/31884938-74b754ca-b7b4-11e7-89d6-a37a421dc4ce.png)

这就是最终效果，积累到一定程度的时候就可以做一些数据分析了。接着看一下源码：

```
#! /bin/bash

cd ~/Documents/awesome-Jeason
    #找到你的仓库，从 GitHub clone 来的

echo Hi,Jeason.今天心情如何？
send=`date '+%Y年%m月%d日 %H:%M'`
    #获取系统时间
read feeling
    #读取用户输入

str="├────**"${feeling}"**"
    #拼接字符串

sed -i '.bak' '7 i\
<br />|
' oneLineFeeling.md
    #在指定位置插入字符串

sed -i '.bak' '7 i\     
<br />'"$str"'
' oneLineFeeling.md

sed -i '.bak' '7 i\     
<br />├──'"$send"'
' oneLineFeeling.md

git commit -am "$send push"
    #commit 代码
git push
    #提交代码

cd ~

```

代码很简单，看注释就可以懂得，有心的朋友可以沿着这个思路搞一搞。

下面说一下 MacOS 和 Linux 下 shell 命令的不同之处。

- sed 命令在 Linux 下备份是可选项，然而在 mac 下是必选项，不然会报错。比如我在用的时候：sed -i "s/需要匹配的字符串/替换的字符串/g" 在 Linux 下可行，在 mac 下需要写成：sed -i '' "s/需要匹配的字符串/替换的字符串/g" or sed -i '.bak' "s/需要匹配的字符串/替换的字符串/g"，也就是说必须要备份才可以。（可以选择留空）

- 在 Linux 下用 sed 匹配替换换行符或者制表符是没有问题的，但在 mac 下就不成功，需要一些办法来委婉的解决掉，比如<br />。（并不通用，视情况而定）
