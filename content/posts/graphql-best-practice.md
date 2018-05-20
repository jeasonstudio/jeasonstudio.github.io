---
title: API 设计最佳实践(二) GraphQL
date: 2018-05-20T22:12:01+08:00
draft: false
tags: [
  "原创",
  "front-end"
]
---

设计一个好的 「GraphQL API/Schema」 很有挑战，我们总是想在健壮性和便利性之间找到一个平衡，同时还要考虑 API 将来如何演变。

<!--more-->

## 0x00 命名

无论是 Restful 还是 GraphQL，一个统一且明确的命名风格将有助于项目的良性发展。不同于 Restful，后者弱化了 HTTP Method 在接口层中的作用，所以，用资源来设计 URI 的思路已经不适用，GraphQL 中每一个 Mutation 的行为需要被准确的指明。

- 遵循 GraphQL 中对 Mutation 和 Query 的约定是最基本的，如果你的请求会对后端持久层数据产生 「Side Effects」，那你需要把它放进 Mutation 中。
- Mutation 中的 API，应遵循「动词开头 (Verb First)」原则，后面接你要操作的「资源名」，「动词」的选择也不是任意的，除了「增删改」之外，前后端应当有统一且成文的约定。这种「面向资源对象」的命名设计会让你的接口看起来很清晰。
Query 中的 API 应当围绕资源的「关系」去设计，命名方面要尽量减少动词出现。

```graphql
type Query {
  users(): [UserInfo!]!
  user(): UserInfo!
}
type Mutation {
  createUser(name: String!): UserInfo!
  buyCars(uId: ID!): [CarsId!]!
}
```

## 0x01 惯用「图」的思维

无论 GraphQL 还是 Restful，本质上都可认为是 「数据库 schema」和「前端数据结构」之间做桥接的中间层数据结构，而二者的区别之一就是 GraphQL 强化了「图」的概念，能更方便的表达资源与资源的关系。

如果你平时习惯于 Restful API 的设计，在制定 GraphQL Schema 时常常会陷入误区：
* 思维仍然停留在「endpoint」的设计上，并且十分想把它带到 GraphQL 中
* 仍想尝试构建出「资源 => 操作」的模式
* 「公共资源类型」设计的不够好以至于不能复用
* 等等

```graphql
# [x] Restful like
{
  user {
    create（...） { ... }
  }
}
```

当我们尝试新增一个 GraphQL 资源对象时，应考虑 「客户端可能需要从该对象访问哪些其他数据或关系？」，如果有，考虑「如何建立对象之间的关系并做到最大化复用？」。

我认为这部分可以参考数据库 schema 的设计流程，先画「实体-关系图 (E-R Model, [what is ermodel](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Entity%25E2%2580%2593relationship_model))」，在ER图基础上调整。

![er](https://pic2.zhimg.com/80/v2-74d4e35439d9896545bc52ee77735c2d_hd.jpg)

可以看到，设计 GraphQL 接口更像是在建立资源与资源之间的关系，并最终得到一个单一内聚图的过程。在 Restful 大行其道的时代，GraphQL 给了我们一种基于「图」的设计思路，就像吃多了家常菜尝试下西餐牛排，可能家里人(传统后端开发)不太喜欢这种改变，但它的魅力还是吸引着年轻人(活跃前端开发) 不断尝试。

另外，我们应当尽量去减少「GraphQL 和 数据库 schema」，「Graphql 和 前端数据结构」之间的耦合，前端数据设计面向前端逻辑，数据库 schema 面向持久层数据设计，GraphQL 应当尽量去中和前后端数据的「结构性差异」。

所以我始终认为，接口设计应当「前端&后端」合作完成，现实是大部分情况下后端都占了主导地位，后果就是前端数据结构的设计会被接口制约，逻辑复杂后越来越难以维护。

## 0x02 类型系统

类型系统是 GraphQL 相较于 Restful 的优势吗？很多人都有这种主观的看法，但事实是 Restful OpenAPI Spec 中对类型的约规更加细致、全面（感谢 swagger 的贡献）。

GraphQL 中类型的设计上手难度很低，如果你有「强类型语言 or Flow/Typescript 的开发经验」，写起来可以说毫不费力，其中需要注意的是 GraphQL 本身是不支持 Map 类型的（因为这违背了它设计的理念），那么如何做到 GraphQL 接口返回一个不确定 key 值的 Object 呢：

```js
// https://github.com/graphql/graphql-js/issues/290
function parseLiteral(ast) {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value)
    case Kind.OBJECT: {
      const value = Object.create(null)
      ast.fields.forEach(field => {
        value[field.name.value] = parseLiteral(field.value)
      })
      return value
    }
    case Kind.LIST:
      return ast.values.map(parseLiteral)
    default:
      return null
  }
}
module.exports = {
  // https://stackoverflow.com/questions/41557536/custom-map-keys-in-graphql-response
  Row: new GraphQLScalarType({
    name: 'Row',
    description: 'This type bypasses type checking.',
    parseLiteral,
    parseValue (value) { return value },
    serialize (value) { return value },
  }),
}
```

## 0x03 GraphQL 版本控制

GraphQL 本质是用来描述数据结构的，对于接口版本没有任何明确的支持，但是你依然可以通过「endpoint」来区分接口版本（Restful like）。

> Why do most APIs version? When there’s limited control over the data that’s returned from an API endpoint, any change can be considered a breaking change, and breaking changes require a new version. If adding new features to an API requires a new version, then a tradeoff emerges between releasing often and having many incremental versions versus the understandability and maintainability of the API.

这段话是官方对此的说明，GraphQL 认为，由于仅返回明确的请求数据，所以设计良好的「GraphQL API」不存在「接口突变」的情况，这是从「版本化」到「无版本」的一个明确转变，而且是「GraphQL」的设计精髓。

## 0x04 避免无意义的查询

GraphQL 设计中有一个典型问题：差劲的 schema resolver 会带来大量不必要的数据库查询。

以关系型数据库举例，在请求嵌套对象时会用到 JOIN 查询，这部分我了解过很多最佳实践，都没能给出一个完美的解决方案，个人来讲有这么几个小 tip：

* 如果某个类型的某个关联值是可选的，且查询十分耗性能，那么在请求中增加一个参数来告诉后端到底要不要去执行这个耗时的查询操作
* 在缓存层做一些处理，比如我一个分页场景，需要每次都去统计总条数吗，显然，不做缓存可能会带来一些性能问题
* 将某些「耗性能且非必选的字段」设计成嵌套查询，因为如果前端调接口时不请求某个嵌套分支，其对应的 resolver 不会执行，就避免了无谓查询（本质上和第二点相同）

总之，凡事有利有弊，我们能做的只是将它的优点最大化。

## 0x05 总结

本文只是简单的介绍了一些技巧和常遇到的问题，希望能起到一个抛砖引玉的作用，欢迎讨论。

GraphQL 的出现拓宽了我们对于前端数据流的认知，而且就近些年来看，越来越多的公司或组织已经开始尝试使用 GraphQL 了。在用好 GraphQL 的同时，我们要保持思考，时刻迸发出新的、更好的解决思路，比如，我们对于数据流是否有更大的能力？我们如何将这种数据中间层的概念拓展出去？等等。