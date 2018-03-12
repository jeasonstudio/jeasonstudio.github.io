---
title: Ripples.wxss——微信小程序 css 库
date: 2016-04-08T22:05:44+08:00
draft: false
tags: [
  "原创"
]
---

1月9日，微信正式发布微信小程序，作为开发人员，除了关注技术方面的一些创新与壁垒，也要多用多看，分析这些小程序的优点与不足，有时候作为一个 web 前端，也十分需要 UI/UX 方面敏锐的嗅觉。

<!--more-->

今天我们来说说小程序的 UX (或者说：微交互)。团队的技术水平决定产品的下限，对微交互的极致追求决定了产品的上限。

举个简单的例子：我们在使用 wx,showModal(obj) 、并且交互层级分明的情况下，可以给底层加一个 「高斯模糊」，例如：

```html
<view class="page {{isBlur ? 'blur':''}}">
```

```css
.blur {filter: blur(6rpx);}
```

有时候几行简单的代码就能给一款产品带来高一个层次的体验。

下面说我们今天的重头戏，为微信小程序定制的 css3 动效库 [Ripples.wxss](http://link.zhihu.com/?target=https%3A//github.com/jeasonstudio/Ripples.wxss.git)

GitHub 地址：[jeasonstudio/Ripples.wxss](http://link.zhihu.com/?target=https%3A//github.com/jeasonstudio/Ripples.wxss.git)

希望大家不要吝惜自己的 star

> 声明：其中大部分动效来自 [Animate.css**](http://link.zhihu.com/?target=https%3A//github.com/daneden/animate.css.git)

## 安装

- 如果你的微信小程序项目基于 nodejs 开发，你可以使用 npm 安装，并拷贝到相关目录后 @import "path/ripples.min.wxss"

```
npm install ripples.wxss --save

```

- 或直接 clone \ download 仓库 [https://github.com/jeasonstudio/Ripples.wxss.git**](http://link.zhihu.com/?target=https%3A//github.com/jeasonstudio/Ripples.wxss.git)，拷贝 ripples.wxss 或 ripples.min.wxss到相关目录后 @import "path/ripples.min.wxss"。

## 使用

- 首先在你想引入 「Ripples.wxss」 动效的 「element」 上加 「ripple」 class。
- 如果你想让他循环不断播放，请添加 「infinite」 class。

```html
<view class="ripple infinite bounce">element</view>
```

- 接下来你需要再添加如下你需要的 class (例如上面例子中的 「bounce」)、相应 class 列表可参考 [这里**](http://link.zhihu.com/?target=https%3A//github.com/jeasonstudio/Ripples.wxss)，或者 [Animate.css**](http://link.zhihu.com/?target=http%3A//daneden.github.io/animate.css)

## 使用实例

- 你可以查看根目录下的 DEMO 项目，为所有 Ripples.wxss 的综合展示
- 也可以参考如下的例子：

```js
//imdex.js
Page({
  data: {
      bounceShow: false
  },
  showBounce: function () {
      let that = this
      that.setData({
          bounceShow: true
      })
      setTimeout(function() {
          that.setData({
              bounceShow: false
          }, 2000)
      })
}}
```

```js
/* imdex.wxss */
@import "ripples.wxss";
```

```html
<!--index.wxml-->
<view class="ripple {{bounceShow ? bounce:''}}">bounce</view>

```

- 不同场景下的使用逻辑还请自行斟酌

## 个性化引入

Ripple.wxss 使用 [gulp](http://link.zhihu.com/?target=http%3A//gulpjs.com/) 进行 wxss 的格式化和压缩，所以你也可以用它来个性化生成 「Ripples.min.wxss」 后引入，以避免代码冗余。

如下：

- 你需要安装 「gulp」 和其他依赖。

```bash
  $ cd path/to/Ripples.wxss/
  $ sudo npm install
```

- 你可以执行 「gulp」 命令，来生成 「ripples.wxss」和 「ripples.min.wxss」 文件，具体包含哪些请参见并修改根目录下的 「ripples-config.json」 文件。

```js
"bouncing_entrances": [
    "bounceIn",
    "bounceInDown",
    "bounceInLeft",
    "bounceInRight",
    "bounceInUp"
  ]

```

## 最后

文章如有不当，请各位批评指正。

欢迎大家关注我的专栏：[知乎专栏-代码小白的日常](https://zhuanlan.zhihu.com/Jeason)

照旧放上 GIthub 地址：[jeasonstudio/Ripples.wxss**](http://link.zhihu.com/?target=https%3A//github.com/jeasonstudio/Ripples.wxss)
