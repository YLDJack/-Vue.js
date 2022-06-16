//封装好之后，每当从data的key中读取数据时，get函数被触发；每当data的key中设置数据时，set函数被触发
function defineReactive(data, key, val) {
        let dep = [] //新增
        Object.defineProperty(data, key, {
                enumerable: true,
                configurable: true,
                get: function () {
                        dep.push(window.target)  //新增 用来存储被收集的依赖
                        return val
                },
                set: function (newVal) {
                        if (val === newVal) {
                                return
                        }
                        //新增， 在set被触发时，循环dep 以触发收集到的依赖
                        for (let i = 0; i < array.length; i++) {
                                dep[i](newVal, val)
                        }
                        val = newVal
                }
        })
}


//这样写有点耦合，我们把依赖收集的代码封装成一个Dep类，它专门帮助我们管理依赖
export default class Dep {
        constructor() {
                this.subs = []
        }
        addSub(sub) {
                this.subs.push(sub)
        }
        removeSub(sub) {
                this.remove(this.subs, sub)
        }
        depend() {
                if (window.target) {
                        this.addSub(window.target)
                }
        }
        notify() {
                const subs = this.subs.slice()
                for (let i = 0, l = subs.length; i < l; i++) {
                        subs[i].update()

                }
        }


}

function remove(arr, item) {
        if (arr.length) {
                const index = arr.indexOf(item)
                if (index > -1) {
                        return arr.splice(index, 1)
                }
        }
}


//改造一下defineReactive
function defineReactive(data, key, val) {
        let dep = new Dep() //修改
        Object.defineProperty(data, key, {
                enumerable: true,
                configurable: true,
                get: function () {
                        dep.depend() // 修改,依赖收集到Dep中
                        return val
                },
                set: function (newVal) {
                        if (val === newVal) {
                                return
                        }
                        val = newVal
                        dep.notify() //新增
                }
        })
}