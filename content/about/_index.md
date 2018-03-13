+++
date = "2015-06-20T14:02:37+02:00"
title = "About"
hidden = true
+++

<div style="display: flex;">
  <image src="../../images/avatar@2x.png" style="width: 50%" />
  <p style="display: inline-block;">
    <font color="white">彩蛋</font>博主名赵吉彤, 一个略显文艺但十分 Geek 的程序猿, 热爱开源, 目前主要从事前端开发领域, 同时对 Node.js, Golang 等也有广泛涉猎, 2015-2019 年本科就读于北京科技大学计算机科学与技术专业, 期间曾在多家公司/企业实习, 现就职于小米云平台 MiCloud 前端组
  </p>
</div>

This blog belongs to Jeason, he is a slightly literary and quite Geekful programmer who loves open source. He is currently mainly engaged in front-end development, and there is also a lot of interest in Node.js, Golang, etc. 2015-2019 Bachelor degree in computer science at University of Science and Technology Beijing, served as an intern in several companies during school, now working at XiaoMi MiCloud Front-end group.

---

### 为什么都二十多了还在折腾博客?

其实从写代码的第一天起, 我就没停下过自己的笔头, 从最初的 `WordPress`, `CSDN` 到后期的 `知乎专栏`, `简书`, `Hexo` 现在又转到了 `Hugo`;  
折腾的过程也是成长的过程, 采用静态博客有它的好处也有坏处; `Hexo` 还是 `Hugo` 我不做评价, 适合就好; 因为近期做 `Golang` 比较多, 就转向了后者;

知乎专栏或者其他专栏也是非常不错的, 你不需要关心也不需要花心思去维护, 而且还可以不断升级迭代; 但其实写专栏文章到头来自己是没有流量的, 流量都是平台的, 创造的价值被 `中间商` 赚了差价, 所以拥有一个自己维护的博客是必须的;

### 用 Hugo 重构后的 blog 有什么亮点?

1.  更漂亮的 `UX`

    技术博客就应该白底黑字, 少一些花花绿绿的雪花效果或二次元背景, 对代码高亮有更好的支持:

    ```js
    console.log('Hello, world!')
    ```

2.  支持 `Latex` 公式

    计算机科学难免会涉及到数学, 这时候如果写公式还在用插图那就实在太 LOW 了; 目前可以在 MarkDown 下方便的书写行内公式( $E=mc^2$ )和多行公式:

    $$
    \Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
    $$

3.  有高可控的评论系统

    大概一年前, 博客评论系统还是 `多说` 的天下, 但随着他的停止维护, 我不得不去找其他代替项目, 映入眼帘的是 `Gitment` 和 `Gitalk`, 对比之后感觉 `Gitalk` 更加成熟一些, 于是选了后者;

    二者都有存在局限性, 比如只支持 `Github` 登录, 不过考虑到博客的性质, 还可以接受;

4.  支持常见图表(`UML/flowchart/Graphviz`)

    ```sequence
    participant Andrew
    participant China
    Andrew-China: Says Hello
    Note right of China: China thinks\nabout it
    China--Andrew: How are you?
    Andrew-China: I am good thanks!
    ```

    ```dot
    digraph G {
      subgraph cluster_0 {
        style=filled;
        color=lightgrey;
        node [style=filled,color=white];
        a0 -> a1 -> a3;
        label = "process 1";
      }
      subgraph cluster_1 {
        node [style=filled];
        b0 -> b2 -> b3;
        label = "process 2";
        color=gray
      }
      start -> a0;
      start -> b0;
      a1 -> b3;
      b2 -> a3;
      a3 -> a0;
      a3 -> end;
      b3 -> end;
      start [shape=Mdiamond];
      end [shape=Msquare];
    }
    ```

