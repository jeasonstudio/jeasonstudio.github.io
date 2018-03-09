---
title: 浅谈 css 预处理器, Sass、Less 和 Stylus
date: 2017-03-09T22:01:51+08:00
draft: false
tags: [
  "原创",
  "front-end"
]
---

相信前端开发人员对与CSS（Cascading Style Sheet-级联样式表）这种「面向命名语言」，一定非常熟悉。你可能在某个舍友熟睡的深夜，还在电脑面前被 css 繁重、冗杂的样式，折磨的死去活来

<!--more-->

## css 预处理器的由来

我们曾经面对 css 很多令人发指的不友好特性，也因为 css 的低复用性而刀耕火种。

`css` 预处理器就是这样被创造出来，弥补了直接写 `css` 的一些缺憾：

- 语法不够强大，比如无法嵌套书写导致模块化开发中需要书写很多重复的选择器；
- 没有变量和合理的样式复用机制，使得逻辑上相关的属性值必须以字面量的形式重复输出，导致难以维护。

本文将主要介绍 `Sass` `Less` 和 `Stylus` 这三种 `css` 预处理器，将从各个角度比较它们的异同。

## 简介

> **Sass**：2007年诞生，最早也是最成熟的CSS预处理器，拥有ruby社区的支持和compass这一最强大的css框架，目前受LESS影响，已经进化到了全面兼容CSS的SCSS。[sass 中文文档**](http://link.zhihu.com/?target=http%3A//sass.bootcss.com/docs/sass-reference/)[Sass 参考手册**](http://link.zhihu.com/?target=http%3A//sass.bootcss.com/docs/sass-reference/)
>
> **Less**：2009年出现，受SASS的影响较大，但又使用CSS的语法，让大部分开发者和设计师更容易上手，在ruby社区之外支持者远超过SASS，其缺点是比起SASS来，可编程功能不够，不过优点是简单和兼容CSS，反过来也影响了SASS演变到了SCSS的时代，著名的Twitter Bootstrap就是采用LESS做底层语言的。[Less 中文文档**](http://link.zhihu.com/?target=http%3A//less.bootcss.com)
>
> **Stylus**：2010年产生，来自Node.js社区，主要用来给Node项目进行CSS预处理支持，在此社区之内有一定支持者，在广泛的意义上人气还完全不如SASS和LESS。[Stylus 中文文档**](http://link.zhihu.com/?target=http%3A//wiki.jikexueyuan.com/project/harp-doc/Stylus.html)

## Sass

`Sass` 有两种语法，分别以「 *.sass 」和「 *.scss 」为扩展名。这里你可以查看[Sass 和 Scss 的异同**](http://link.zhihu.com/?target=http%3A//sass.bootcss.com/docs/scss-for-sass-users/)。Sass 兼容 css ，你可以在 sass 文件里写 css，也可以严格按照 sass 的缩进方式省去「大括号」和「分号」，最终它们都会被编译成标准 css，比如：

```sass
/*style.sass*/
h1
  color: #666
  background-color: #666	
```

## Less

`Less` 受 `Sass` 的影响非常大，以「 *.less 」为扩展名，是 `sass` 之后的又一款优秀的 `css` 预处理器。其特点包括：

- 变量：就像写其他语言一样，免于多处修改。
- `混合：class` 之间的轻松引入和继承。
- 嵌套：选择器之间的嵌套使你的 `less` 非常简洁。
- 函数&运算：就像 js 一样，对 `less` 变量的操控更灵活。

比如这样的 `Less` （来自bootcss/less）

```less
@base: #f938ab;

.box-shadow(@style, @c) when (iscolor(@c)) {
  box-shadow:         @style @c;
  -webkit-box-shadow: @style @c;
  -moz-box-shadow:    @style @c;
}
.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
  .box-shadow(@style, rgba(0, 0, 0, @alpha));
}
.box { 
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  div { .box-shadow(0 0 5px, 30%) }
}

```

## Stylus

相比于 `sass` 的激进和 `less` `的常规，Stylus` 是一个高效、动态以及丰富的 `CSS` 预处理器。它同时支持缩进的和通俗的两种风格的 `CSS` 语法风格。

`Stylus` 扩展名为「 *.styl 」，跟另外两款 css 预处理器相比略显年轻，社区以及推广程度也不及 sass 和 less，但它的一些优秀特性同样令人着迷。

[Nib**](http://link.zhihu.com/?target=https%3A//tj.github.io/nib/)是 `Stylus` 的应用的类库。给你的「 *.styl 」添加 Nib 的最快方式是克隆 Nib 的 Git 版本库并引入，因为有了 Nib，`Stylus` 的高效性才更为突出。

除了包含 Less 的一些优点，`Stylus` 在容错性上的突出特性也十分吸引我，你可以在一个 `Stylus` 文件里这样写，且它们都会被编译成标准 css：

```styl
/*style.styl*/
/*类似于CSS标准语法*/
h1 {
  color: #963;
  background-color:#333;
}
/*省略大括号（｛｝）*/
h1 
  color: #963;
  background-color: #333;
/*省略大括号（｛｝）和分号（;）*/
h1
  color:#963
  background-color:#333

```

## 下面从特性上比较三者异同：

### 1 变量

- `Sass` 声明变量必须是『$』开头，后面紧跟变量名和变量值，而且变量名和变量值需要使用冒号：分隔开。
- `Less` 声明变量用『@』开头，其余等同 `Sass。`
- `Stylus` 中声明变量没有任何限定，结尾的分号可有可无，但变量名和变量值之间必须要有『等号』。但需要注意的是，如果用“@”符号来声明变量，Stylus会进行编译，但不会赋值给变量。就是说，`Stylus` 不要使用『@』声明变量。`Stylus` 调用变量的方法和 `Less` `Sass` 完全相同。

### 2 作用域

css 预编译器把变量赋予作用域，也就是存在生命周期。就像 js 一样，它会先从局部作用域查找变量，依次向上级作用域查找。

- Sass：三者最差，不存在全局变量的概念。也就是说在 Sass 中定义了相同名字的变量时你就要小心蛋疼了。
- Less：我认为跟 JS 一样，逐级查找，向上冒泡。
- Stylus：完全等同 Less。Stylus 和 Sass 则更倾向于指令式。

### 3 嵌套

十分真诚的说，三种 css 预编译器的「选择器嵌套」在使用上来说没有任何区别（也可能是我没发现）。Sass 除了常规的采用『&』替代父级选择器之外，还提供了「奇葩的属性嵌套」：

```sass
/*style.sass*/
.footer {
  font: {
    family:  微软雅黑;
    size: 5rem;
    weight: bolder;
  }
}
```

除了少打几个字，感觉没啥用啊。

### 4 继承

css 属性的继承是一个非常重要的特性，好消息是三种预编译器都对此做出了改善。

- Sass和Stylus的继承非常像，能把一个选择器的所有样式继承到另一个选择器上。使用『@extend』开始，后面接被继承的选择器。

```css
.shit {
  margin: 10px 5px;
  padding: 2px;
}
p {
  @extend .shit;/*继承.block*/
  border: 1px solid #aaa;
}
ul,li {
  @extend .shit; /*继承.block*/
  color: #aaa;
}

```

将被编译成标准 css：

```css
.shit,p,ul,ol {
  margin: 10px 5px;
  padding:2px;
}
p {
  border: 1px solid #aaa
}
ul,li {
  color:#aaa;
}
```

- Less 继承：与前两者继承方式有所区别，它不是在选择器上继承，而是将Mixins中的样式嵌套到每个选择器里面。然而这样会带来一个明显的缺点：每个选择器中会出现重复的样式。

### 5 导入@Import

CSS中，不建议用@import导入css，因为会增加http请求。但 CSS 预处理器中的导入和CSS的有hhe很大区别，它是将不同 css 是在语义上导入，最终编译结果会生成一个CSS文件。

值得注意的是，如果不同文件相互引入的时候，出现相同变量名时可能会引起错误。所以我的建议是单独有一个 var.sass/less/styl 文件来记录所有你定义的变量。

Less 为@Import 扩展了语法，而 Sass 和 Stylus 并没有。具体扩展的 import 语法请见：[Less 的 Import 扩展**](http://link.zhihu.com/?target=http%3A//less.bootcss.com/features/%23import-options)

## 总结

- Sass和Less语法严谨、Stylus相对自由。因为Less长得更像 css，所以它可能学习起来更容易。
- Sass 和 Compass、Stylus 和 Nib 都是好基友。
- Sass 和 Stylus 都具有类语言的逻辑方式处理：条件、循环等，而 Less 需要通过When等关键词模拟这些功能，这方面 Less 比不上 Sass 和 Stylus。
- Less 在丰富性以及特色上都不及 Sass 和 Stylus，若不是因为 Bootstrap 引入了 Less，可能它不会像现在这样被广泛应用（个人愚见）。
- 身边有几个朋友在 css 预编译器的选择上犹豫不决，其实我认为选择什么无所谓，关键在于你的熟练程度以及团队合作方面的有利性。
- 当然，在大致学习、使用和研究了这三种 css 预编译器之后，我想我会选择 Stylus，它的语法自由度很高，而且写出来的代码非常简洁，这点十分吸引我。

> 转载请联系作者：[Jeason-赵吉彤](https://www.zhihu.com/people/JeasonStudio)  
> 欢迎大家关注我的专栏：[代码小白的日常 - 知乎专栏](https://zhuanlan.zhihu.com/Jeason)  
> 欢迎在我的 Github 上提 issue：[jeasonstudio (赵吉彤) · GitHub**](http://link.zhihu.com/?target=https%3A//github.com/jeasonstudio/)  
