---
title: API 设计最佳实践(一) Restful
date: 2018-03-17T13:56:58+08:00
draft: false
tags: [
  "front-end",
  "原创"
]
---

`Web APIs` 的设计随着前后端的分离, 在近些年变得越来越重要. 对于 Restful API, 网上相关的介绍文章已经足够多了, 建议在阅读本文前对 `restful` 理念有一些了解.

<!--more-->

## 0x00 正确理解 Method 的语义

我们时常会发现某些系统的 api 设计非常难以理解, 比如全部都是 `post`. 这是非常不负责任的行为, 下面简单介绍下各个 method 的语义:

| Resource | GET | POST | PUT | PATCH | DELETE |
| -------- | --- | ---- | --- | ----- | ------ |
| `/cars`  | 列出所有 `cars` 资源(`URI`) | 新增一条 `car` 资源 | 批量更新 `car` 资源 | x | 删除全部 `car` 资源 |
| `/cars/:carId` | 获取 `carId` 资源的信息 | `405 Method not allowed` | 更新 `carId` 资源 | 部分更新 `carId` 资源 | 删除该资源 |

可以看到, 我们在设计接口的时候是围绕 `资源 URI` 来讲的, 而不是某个动作, 我们不应该在设计接口时用 `URL` 代替 `Method`, 保持 `URI` 的 `non-verb`, 不要设计成: `/getAllCars` `/createNewCar` `/deleteAllRedCars`  
Btw, URL 不应该对大小写有任何依赖

## 0x01 GET 方法或其参数不应有副作用

GET 方法不应该改变任何资源的状态, 也不能对资源有其他副作用, 下面的设计是违反 `Restful` 设计原则的:

* GET `/users/711?activate`
* GET `/users/711/activate`

## 0x02 URI 中尽量使用复数名词

最根本的原则是不能混用单数和复数名词, 不统一会给其他人带来很大的困惑, 所以为了简洁和语义的正确性, 要尽量使用复数名词. 

* 用 `/cars` 代替 `/car`
* 用 `/users` 代替 `/user`
* 用 `/products` 代替 `/product`
* 用 `/settings` 代替 `/setting`

## 0x03 要善于建立父子资源的关联

当资源之间有关联时, 要善于建立父子资源之间的关系, 这些关系最好在 `URI` 中表达而不是参数中, 简单关联都可以这样处理.

* GET `/cars/:carId/drivers/` 返回 :carId 下所有 driver 的 list
* GET `/cars/:carId/drivers/:driverId` 返回 :carId 下 :driverId 的信息

## 0x04 选择合适的 `Content-Type` 序列化请求

无论客户端还是服务端, 都应该对 `Content-Type` 的选择有个清醒的认识, 它存在于 `HTTP Header` 中, 本意是表达资源的文件格式, 但在 `API` 中也表达了请求的序列化方式, 这些是我们比较常见的:

* `application/x-www-form-urlencoded`
* `multipart/form-data`
* `application/json`

根据请求体(响应体)数据格式来选择合适的序列化方式, 并不是表单一定是 `x-www-form-urlencoded`, 也不是响应一定要 `application/json`, 从需求出发, 该返回 ID 就不要套一层 `json`

## 0x05 统一化资源的筛选或分页设计

### 过滤

对所有字段或查询使用统一的查询参数进行过滤:

* GET `/cars?color=red` 返回所有颜色为红色的车
* GET `/cars?seats<=2` 返回所有座位小于两个的车

### 排序

允许对多个字段, 或一个字段多个维度的排序

* GET `/cars?sort=-manufactorer,+model` 返回按制造商降序和型号升序排序的汽车列表

### 字段选择

(我想说, 这方面 `Restful` 还是太弱了, 下篇文章主要介绍下 `Graphql` 做对比)

有时候我们不想请求资源的全部信息, 返回资源信息由前端来确定, 这就需要有一个统一的设计作为约定, 比如:

* GET `/cars?fields=manufacturer,model,id,color`

### 长列表分页

分页设计也是一个老生常谈的话题, 目前主要分为两类, 如何选择既要考虑到你的业务场景, 也要考虑到数据量及实现的难易

1.  `limit` 和 `offset`

    `limit` 代表每页的条数, `offset` 代表偏移的条数, 一般需要和前端分页相结合, 适用于 `table` 分页, 而且前端需要知道总共的条数, 这能给用户以极大的安全感和使用体验

    * GET `/cars?limit=5&offset=10`

2.  `limit` 和 `lastIndex`

    `limit` 代表请求条数, `lastIndex` 代表上一条的索引, 这样设计适用于长列表的场景, 支持无限滚动, 但在 `table` 多页时却显得很鸡肋, 用户无法跳页, 这是难以被接受的

    * GET `/cars?limit=5&lastIndex=10`

如何返回总条数也值得我们讨论, 其中比较好的实现方式是放在响应头中: `X-Total-Count: 200`

## 0x06 在你的 RestfulAPI 中增加版本

因为你的产品肯定需要迭代重构的, 你的接口肯定会因为各种原因重写的, 为了避免麻烦, 还是加上版本吧: `/api/v1`

## 0x07 规范化错误请求

世界上并不是只有 `200`, `404` 和 `500` 这三个 `status code`, 对于简单的, 语义化的错误, 我们不需要单独的去约定一种错误返回格式, 这是非常中二的, 经常会看到有些人设计的 API 返回格式为 `{ code: -1, errMsg: 'not found' }`

首先, 要尽可能用 `http status code` 来表达错误信息, 一些常用的:

* 200 – OK – Eyerything is working
* 201 – OK – New resource has been created
* 204 – OK – The resource was successfully deleted
* 304 – Not Modified – The client can use cached data
* 400 – Bad Request – The request was invalid or cannot be served. The exact error should be explained in the error payload. E.g. „The JSON is not valid“
* 401 – Unauthorized – The request requires an user authentication
* 403 – Forbidden – The server understood the request, but is refusing it or the access is not allowed.
* 404 – Not found – There is no resource behind the URI.
* 422 – Unprocessable Entity – Should be used if the server cannot process the enitity, e.g. if an image cannot be formatted or mandatory fields are missing in the payload.
* 500 – Internal Server Error – API developers should avoid this error. If an error occurs in the global catch blog, the stracktrace should be logged and not returned as response.

业务逻辑层的错误, 需要约定返回错误格式, 举个栗子:

```json
{
  "errors": [
    {
      "userMessage": "Sorry, the requested resource does not exist",
      "internalMessage": "No car found in the database",
    }
  ]
}
```

## 参考链接

* https://en.wikipedia.org/wiki/Representational_state_transfer
* https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type