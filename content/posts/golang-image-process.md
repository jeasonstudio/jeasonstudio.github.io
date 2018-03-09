---
title: Golang 图像处理上的一些实践
date: 2017-02-08T22:08:25+08:00
draft: false
tags: [
  "原创",
  "Golang"
]
---

时至今日，openCV 已经出到了3.2版本，且其社区也足够庞大，其全面性已无需赘述。但我们用 Golang 这样一门待火不火的语言来造一些相关的轮子，也蛮有趣

<!--more-->

> 声明：本文以及图片为原创，转载请联系作者。

下面我分享一下用 Golang 实现一些图像处理过程中的收获。

> 高斯模糊效果

高斯模糊是一种比较常见的模糊效果，我们在各类图像处理软件或库、框架等地方会经常见到。首先看一下效果：

![image](https://user-images.githubusercontent.com/17971291/31923170-d7ada950-b83e-11e7-9f41-d9b4ef072b06.png)

```
(左边为原图，右边为 Sigma=10 ，10 像素模糊后)
```

高斯模糊（英语：Gaussian Blur），也叫高斯平滑。简单点说，是将『二位正态分布』应用于图像处理，从算法的角度来说，十分的简单易懂。参考了阮一峰老师的文章：[高斯模糊算法**](http://link.zhihu.com/?target=http%3A//www.ruanyifeng.com/blog/2012/11/gaussian_blur.html)后，我来班门弄斧，谈一下实现过程中的感悟。

一副图像，这里指非矢量图，一般由许多像素点构成，像素点内包含色值数据，一般为 RGBA 形式。为了将一副图片模糊处理，也就是说将某一点像素的 RGBA 值向周围像素「靠拢」，即受周围影响，从而达到模糊目的。

最简单的平均值方法如下图左，均等分配。但这样明显会对图片造成较大失真，所以我们又想到了如下图右的均值分法：

![image](https://user-images.githubusercontent.com/17971291/31923178-df63a1cc-b83e-11e7-9ec9-d93c499ef48f.png)

这种处理方式会使图像失去原来的性质，所以高斯模糊是一种不可逆处理。

在权重的分配上，我们采用了高斯的二维正态分布函数，这也是『高斯模糊』名字由来，下面咳咳（敲黑板，记笔记），我们来复习一维高斯函数：

![image](https://user-images.githubusercontent.com/17971291/31923182-e57a6cd0-b83e-11e7-99b0-f40c9c433f16.png)

其中，μ是x的均值，σ是x的方差。因为计算平均值的时候，中心点就是原点，所以μ等于0。由一维高斯函数可推导得二维高斯函数(可理解为沿 x=μ 旋转)。见下图。

![image](https://user-images.githubusercontent.com/17971291/31923192-f0fbd530-b83e-11e7-9787-2b54b7cba731.png)

Sigma 越大，图形越矮胖，越小越高瘦。下面是 Golang 的二维高斯模糊公式实现：

```
// GaussFunc 二维高斯函数
func GaussFunc(x, y int, Sigma float64) float64 {
	return (1.0 / (2.0 * math.Pi * Sigma * Sigma)) * math.Pow(math.E, ((-1.0)*(float64(x*x+y*y)/(2.0*Sigma*Sigma))))
}

```

由此设定 Sigema 的值后，可计算 x=y=n 像素，x*y 像素块内每个点的概率值，且所有值相加应等于1，如下图所示3X3像素块所示：

![image](https://user-images.githubusercontent.com/17971291/31923198-f83c9190-b83e-11e7-999b-8215d68c3249.png)

```
由于每次都进行概率运算效率较低，若固定像素固定 Sigma 处理模糊，可提前将概率矩阵算好打表使用，将提高处理速度。

```

接下来，将矩阵内像素的 RGBA 值分别乘对应的权重值相加，所得结果就是中心像素的 RGBA 值，我们只需将该像素填充到正确的位置。

处理完所有像素点，就能得到对应参数的高斯模糊效果图。如下：

![image](https://user-images.githubusercontent.com/17971291/31923211-0107aaa8-b83f-11e7-9d44-40d0cc708032.png)

> 这时我们应该考虑一个问题，那就是边缘处理，四个边缘的像素点无法向外计算。

目前有两种办法解决，一种是把已有的点拷贝到另一面的对应位置，模拟出完整的矩阵、或者将超出边界的点按边界点 RGBA 值处理。

如果出现边缘单色化，可采取切除相应像素边缘的方式优化。

如果你不关心这些，也可以直接使用该图形库：

```
go get github.com/jeasonstudio/GaussianBlur

```

```
// GaussianBlur 高斯模糊处理
// sourceImg \ tagImg 处理前 \ 后图片相对路径地址
// num 高斯模糊像素，单位 px，注意，此项过高将直接影响时间
// Sigma 塞个马，周围像素权重
func GaussianBlur(sourceImg, tagImg string, num int, Sigma float64)

```

留图不留种，菊花万人捅：[GitHub: GaussianBlur/jeasonstudio**](http://link.zhihu.com/?target=https%3A//github.com/jeasonstudio/GaussianBlur.git)

欢迎大家关注我的专栏：[知乎专栏-代码小白的日常](https://zhuanlan.zhihu.com/Jeason)

下一篇系列预告：Golang 图像处理实践之边缘检测算法
