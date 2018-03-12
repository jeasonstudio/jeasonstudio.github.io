---
title: MacOS 上搭建基于 GitHub Page 和 Hexo 的博客
date: 2016-05-26
draft: false
tags: [
  "原创"
]
---

零投资并不是零投入，你需要有一颗爱鼓捣的心————By Jeason

<!--more-->

> 注意: 现在我的博客已经迁移到了 hugo, 此文仅限参考

## 首先我来解释一下，一个多月没更博客，博主跑哪优秀去了。。。

* 第一就是这个月事太多，各种虎头蛇尾的项目，以及我十分看好的钢镚儿。可能你觉得，这些是借口。
* 第二，这种静态博客发博文不像WordPress等等成熟的框架那样简单，这没有现成的编辑器，也没有即视化的操作，而且最关键的是，，换了台常用电脑后我就有点方。联想就像封建时代的第一胎丫头一样，有了小子就忘了他姐。
* 第三，惭愧惭愧，一直想把它移植到我现在常用的Mac上，但一直没配置成功（嘘。。。不要张扬）。

总之，拖了这么久，一个月零十二天，抱歉抱歉。（这话可能是说给自己听的）

这是一篇详细文章来讲述用Mac搭建Hexo博客于Github上的完整历程， 也是踩了无数的坑搭起来的,这篇文章很大部分内容由“[与佳期](gonghonglou.com)”完成，征得原文作者同意后发布。

如果你曾经或一直是一个 `“域名+服务器+WordPress”` 的使用者，那么。我建议你不仿看完全文。
如果你也想像我一样零投资搭建一个好看的博客，那你没啥说的，看完它。

## 环境配置

[Hexo官网](https://hexo.io/docs)上本就有对Hexo安装及使用的详细介绍，墙裂推荐。这里来讲述自己安装的亲身步骤，或有区别。

### Node.js

用来生成静态页面。移步[Node.js官网](https://nodejs.org/en/)，下载v5.5.0 Stable 一路安装即可。

### Git

用来将本地Hexo内容提交到Github上。Xcode自带Git，这里不再赘述。如果没有Xcode可以参考[Hexo官网](https://hexo.io/docs)上的安装方法。	

## 安装 Hexo

当 `Node.js` 和 `Git` 都安装好后就可以正式安装 `Hexo` 了，终端执行如下命令：

```
$ sudo npm install -g hexo
```

输入管理员密码（Mac登录密码）即开始安装 (`sudo`:linux系统管理指令  `-g`:全局安装)

> 注意坑一：[Hexo官网](https://hexo.io/docs)上的安装命令是`$ npm install -g hexo-cli`，安装时不要忘记前面加上`sudo`，否则会因为权限问题报错。

### 初始化

终端cd到一个你选定的目录，执行`hexo init`命令：
```bash
$ hexo init blog
```

`blog`是你建立的文件夹名称。cd到`blog`文件夹下，执行如下命令，安装npm：

```bash
$ npm install
```

执行如下命令，开启hexo服务器：

```bash
$ hexo s
```

此时，浏览器中打开网址[http://localhost:4000](http://0.0.0.0:4000)，能看到如下页面：
![image](https://user-images.githubusercontent.com/17971291/31884453-aa25ce54-b7b2-11e7-9f75-6f52d75ac89d.png)

本地设置好后，接下来开始关联 Github

## 关联 Github

### 添加ssh key到Github

#### 检查SSH keys是否存在Github

执行如下命令，检查SSH keys是否存在。如果有文件`id_rsa.pub`或`id_dsa.pub`，则直接进入步骤1.3将SSH key添加到Github中，否则进入下一步生成SSH key。

```bash
$ ls -al ~/.ssh
```

#### 生成新的ssh key

执行如下命令生成public/private rsa key pair，注意将`your_email@example.com`换成你自己注册Github的邮箱地址。

```bash
$ ssh-keygen -t rsa -C "your_email@example.com"
```

默认会在相应路径下（`~/.ssh/id_rsa.pub`）生成`id_rsa`和`id_rsa.pub`两个文件。

#### 将ssh key添加到Github中 

Find前往文件夹`~/.ssh/id_rsa.pub`打开id_rsa.pub文件，里面的信息即为SSH key，将这些信息复制到Github的Add SSH key页面即可。

进入 Github --> Settings --> SSH keys --> add SSH key:

Title 里任意添一个标题，将复制的内容粘贴到 Key 里，点击下方`Add key`绿色按钮即可。

### 创建仓库

登录你的 Github 帐号，新建仓库，名为`用户名.github.io`固定写法，如`jeasonstudio.github.io`,如下图所示：
![image](https://user-images.githubusercontent.com/17971291/31884475-bb04c662-b7b2-11e7-8545-9726c398eb2d.png)

本地的`blog`文件夹下内容为：

```
	_config.yml	
	db.json 
	node_modules 
	package.json
	scaffolds
	source
	themes
```

终端cd到`blog`文件夹下，`vim`打开`_config.yml`，命令如下：

```bash
$ vim _config.yml
```

打开后往下滑到最后，修改成下边的样子：

	deploy:
  	  type: git
  	  repository: https://github.com/jeasonstudio/jeasonstudio.github.io.git
 	  branch: master

你需要将`repository`后`jeasonstudio`换成你自己的用户名，地址在上图`2`位置获取。hexo 3.1.1版本后`type: `值为`git`。

> 注意坑二：在配置所有的`_config.yml`文件时（包括theme中的），在所有的冒号`:`后边都要加一个空格，否则执行hexo命令会报错，切记 切记

在`blog`文件夹目录下执行生成静态页面命令：

```bash
$ hexo generate		或者：hexo g  
```

此时若出现如下报错：

```
ERROR Local hexo not found in ~/blog
ERROR Try runing: 'npm install hexo --save'
```

则执行命令：

```bash
npm install hexo --save
```

若无报错，自行忽略此步骤。

再执行配置命令：

```bash
$ hexo deploy			或者：hexo d
```

> 注意坑三：若执行命令`hexo deploy`仍然报错：无法连接git，则执行如下命令来安装[hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)：
 
>		$ npm install hexo-developer-git --save

再次执行`hexo generate`和`hexo deploy`命令

此时，浏览器中打开网址[http://jeasonstudio.github.io](http://jeasonstudio.github.io)（将`jeasonstudio`换成你的用户名）能看到和打开`http://localhost:4000`时一样的页面。


### 发布文章 

终端cd到`blog`文件夹下，执行如下命令新建文章：

```bash
$ hexo new "postName"	
```

名为`postName.md`的文件会建在目录`/blog/source/_posts`下。你当然可以用vim来编辑文章。
>在此说明一下，我一直都在用微软的 VSCode编辑器来编写MarkDown，如果你有什么更好的建议，我会非常感激的。
另外MarkDown格式的语法教程，前面的博文里有，但我知道你懒，[传送门](http://jeasonstudio.github.io/2016/04/06/Markdown-%E8%AF%AD%E6%B3%95%E7%AE%80%E4%BB%8B/)。


文章编辑完成后，终端cd到`blog`文件夹下，执行如下命令来发布：

```bash
$ hexo generate 			//生成静态页面
$ hexo deploy			//将文章部署到Github</pre>
```

---

至此，Mac上搭建基于Github的Hexo博客就完成了。下面的内容是介绍安装theme，添加评论功能和绑定个人域名，如果有兴趣且还有耐心的话，请继续吧。

## 安装theme

你可以到[Hexo官网主题页](https://hexo.io/themes/)去搜寻自己喜欢的theme。这里以[hexo-theme-next](https://github.com/iissnan/hexo-theme-next)为例

终端cd到 `blog` 目录下执行如下命令：

```bash
$ git clone https://github.com/iissnan/hexo-theme-next themes/next
```

将`blog`目录下`_config.yml`里`theme`的名称`landscape`修改为`next`

终端cd到`blog`目录下执行如下命令(每次部署文章的步骤)：

```bash
$ hexo clean	 //清除缓存文件 (db.json) 和已生成的静态文件 (public)
$ hexo g			 //生成缓存和静态文件
$ hexo d			 //重新部署到服务器
```

至于更改theme内容，比如名称，描述，头像等去修改`blog/_config.yml`文件和`blog/themes/next/_config.yml`文件中对应的属性名称即可， 不要忘记冒号`:`后加空格。  [ NexT 使用文档](http://theme-next.iissnan.com/)里有极详细的介绍。

## 绑定个人域名

现在使用的域名是Github提供的二级域名，也可以绑定为自己的个性域名。购买域名，可以到[GoDaddy官网](https://sg.godaddy.com/zh/)，网友亲切称呼为：狗爹，也可以到[阿里万网](http://wanwang.aliyun.com/)购买。

### Github端

在`/blog/themes/landscape/source`目录下新建文件名为：`CNAME`文件，注意没有后缀名！直接将自己的域名如：`jeasonstudio.com`写入。

终端cd到`blog`目录下执行如下命令重新部署：

```bash
$ hexo clean
$ hexo g
$ hexo d
```

> 注意坑四：网上许多都是说在Github上直接新建`CNAME`文件，如果这样的话，在你下一次执行`hexo d`部署命令后`CNAME`文件就消失了，因为本地没有此文件嘛。

### 域名解析 

如果将域名指向一个域名，实现与被指向域名相同的访问效果，需要增加CNAME记录。

登录你注册域名的网站，比如万网，在你购买的域名后边点击：解析 --> 添加解析

记录类型：CNAME

主机记录：将域名解析为example.com（不带www），填写@或者不填写

记录值：jeasonstudio.github.io.	(不要忘记最后的`.`，`jeasonstudio`改为你自己的用户名)，点击保存即可。

此时，大功告成！


## 后记

参考[Hexo博客：Jeasonstudio](http://jeasonstudio.github.io)，希望对大家有所帮助，欢迎吐槽～

## 参考链接

* [Hexo官网](https://hexo.io/docs)
* [HEXO](http://leopardpan.github.io/2015/08/12/hexo/)
* [如何生成SSH key](http://www.jianshu.com/p/31cbbbc5f9fa/)
