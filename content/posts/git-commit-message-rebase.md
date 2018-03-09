---
title: 关于 Git Commit Message 和 git rebase
date: 2017-06-01
tags: [
  "git",
  "workflow"
]
---

关于 WorkFlow 的一些浅薄见解 :)

<!--more-->

## 1. Message 规范

参看了一些比较成熟的规范、和一些项目（VueJS, AngularJS, Webpack...）的commit massage。我觉得在尽量小的影响大家开发和以前习惯的基础上，可以体验下如下方式提交：

- 格式：`<type> (scope) subject` 
- Type 和 Subject 是必填，scope(本次提交影响范围)可以省略。
- subject 英文小写，首字母也不大写。完整清晰的描述本次 commit 的提交内容。

| type     | info                                    |
| -------- | --------------------------------------- |
| feat     | 增加新功能，开发新进展。                    |
| fix      | 修补 BUG，修补 issue 中的内容              |
| docs     | 添加文档有关内容（感觉用的不是很多            |
| style    | 修改代码格式（不是css）不影响代码运行         |
| refactor | 重构（即不是新增功能，也不是修改bug的代码变动）|
| test     | 增加测试有关内容                           |
| chore    | 构建过程或辅助工具的变动                    |

- 举个栗子： `git commit -m "<feat> finish user config page"`

## 2. 我对 GitFlow 的愚见

- 开发按理说是不能在 master 分支的，正常来讲主开发流程在 develop 分支，增加 feature 可以checkout 新分支。如果一个人开发则无所谓。
- commit应该是每完成一个小功能点一次（或者说Message能在一行内描述清楚），push应该是一次完整的片段更新，push 后 origin 的代码跑起来没问题。个人不太推荐每次 commit 之后都 push，因为 rebase。
- 上述规范可能会略微影响commit效率，但在以下方面提供了很大便利：
  - reset 的时候可以准确定位回退位置
  - 方便查看提交历史、项目进度，比如查看所有的 feature：`git log --pretty=format:"%h - %an, %ar : %s" --grep <feat>`
  - 如果项目做得比较出色或其他原因开源了，良好的 Commit Message 能极大的提升项目好感度。

## 3. 如何活用 rebase

rebase 我觉得主要有两个作用，一是减少了合并（merge）的数量，二是能显著的让commit Message变得清爽。

> 情形一：

基于 origin 分支，我们check出了newfeat 分支并有修改，同时别人在 origin 也做了有效修改，也就是“分叉了”。

- 方案一：你可以用"pull"命令把"origin"分支上的修改拉下来并且和你的修改合并，结果看起就是个新的commit after merge。
- 方案二： 你可以在你的分支上 `git rebase origin` 这会把你分支里的每个 commit 取消掉，并把它们临时保存为补丁(patch)然后把 newfeat 分支更新到最新的 origin 分支，最后把保存的这些 patch 应用到 newfeat分支上。

常见做法是方案一，但可以试试方案二。

> 情形二：

我们刚提交了一次 commit ，突然发现有一个文件里有一行注释拼错了，于是修改后又 commit 了一次，这样导致这两次 commit 完全没有意义。所以需要合并成一个：

`git rebase -i HEAD~2` 之后进入编辑模式，你会看到两次 commit ，前面的单词都是 pick ，你需要把第二次的 pick 改成 squash 。

- `pick` 的意思是要会执行这个 commit
- `squash` 的意思是这个 commit 会被合并到前一个commit

当然，你可以执行 `git rebase --abort`来撤销这次 rebase 。
