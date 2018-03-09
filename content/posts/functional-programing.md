---
title: 函数式编程
date: 2017-05-08T22:30:47+08:00
draft: false
tags: [
  "front-end",
  "原创"
]
---

Functional Programing

<!--more-->

```javascript
(function () {
    'use strict'

    /**
     * compose 之前的输出为之后的输入，返回最后函数的返回值，用于拆解逻辑性强的复杂函数
     * @param {Function} first 
     * @param {Function} last 
     */
    const compose = (first, ...last) => (...initArgs) => last.reduce((composed, func) => func(composed), first(...initArgs))

    let judgeLength = ({
        passwd
    }) => {
        if (passwd) {
            return {
                passwd: passwd
            }
        } else {
            throw new Error('Please input the right PASSWD!')
        }
    }

    let hashPasswd = ({
        passwd
    }) => {
        return ({
            username: "Jeason",
            passwd: "md5(" + passwd + ")"
        })
    }

    let checkUserInfo = ({
        username,
        passwd
    }) => {
        return {
            u: username + "-CheckedByJeason",
            p: passwd
        }
    }

    let loginAndRidect = ({
        u,
        p
    }) => {
        return {
            url: "http://github.com/jeasonstudio",
            token: "wqert123=="
        }
    }

    const enter = compose(judgeLength, hashPasswd, checkUserInfo, loginAndRidect)

    console.log(enter({
        passwd: "JeasonStudio"
    }))
    
    
    /*-------------------------------------------------------*/

    /**
     * 同样用于拆解逻辑多的复杂函数，逻辑之间无强关联
     * 每个函数参数相同，最终返回所有函数返回值数组
     * @param {Function} funcs 
     */
    const concat = (...funcs) => (...args) => funcs.reduce((returns, func) => [...returns, func(...args)], [])

    let beforeUpload = (...args) => {
        // console.log("This file is ok to upload.")
        return {
            text: "This file is ok to upload.",
            code: 1
        }
    }

    let cacheToLocal = (...args) => {
        // console.log("Success to cache.")
        return {
            text: "Success to cache.",
            code: 2
        }
    }

    const handle = concat(beforeUpload, cacheToLocal)

    console.log(...handle({
        fileName: "PickUpYourSoap.avi",
        fileSize: 1024
    }))

    /*-------------------------------------------------------*/
    
    /**
     * 根据传入参数选择执行的函数并返回该函数返回值
     * 拆解包含大量 if else switch case 的复杂函数
     * @param {any} map 
     */
    const switcher = map => (type, ...args) => {
        return map[type] !== undefined ? map[type](...args) : undefined
    }

    let clearMemory = (...args) => {
        console.log('clearMemory', ...args)
        return '内存清除完毕'
    }

    let clearCache = (...args) => {
        console.log('clearCache', ...args)
        return '缓存清除完毕'
    }

    const clear = switcher({
        memory: clearMemory,
        cache: clearCache
    })

    console.log(clear('memory', 1, 2, 3))
    
    /*-------------------------------------------------------*/


    /**
     * 用于拆解包含很多校验函数的复杂函数
     * 依次执行函数数组，直到有第一个返回值结束 or undefined
     * @param {any} funs 
     */
    const some = (...funs) => (...args) => funs.reduce((last, fun) => last === undefined ? fun(...args) : last, undefined)

    let validateNull = (obj) => {
        if (!obj) {
            return '年龄不能为空'
        }
    }

    let validateNumber = (obj) => {
        if (parseInt(obj, 10) !== obj) {
            return '年龄必须为自然数'
        }
    }

    let pass = () => {
        return '验证通过'
    }

    const judgeYear = some(validateNull, validateNumber, pass)

    console.log(judgeYear(18))
})()
```
