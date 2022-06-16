//我们希望把数据中的所有属性（包括子属性）都侦测到，所以要封装一个Observer类。
//Observer 会将object的所有属性转换为getter/setter的形式
//这个类的作用是将一个数据内的所有属性（包括子属性）都转换成getter/setter的形式，然后去追踪它们的变化：

export class Observer {
        constructor(value) {
                this.value = value
                if (!Array.isArray(value)) {
                        this.walk(value)
                }
        }
        //walk 会将每一个属性都转换成getter/setter的形式，然后去追踪它们的变化
        //这个方法只有在数据类型为Object时被调用
        walk(obj) {
                const keys = Object.keys(obj)
                for (let i = 0; i < keys.length; i++) {
                        defineReactive(obj, key[i], obj[keys[i]])

                }
        }
}



//改造一下defineReactive
function defineReactive(data, key, val) {
        //新增,递归子属性
        if (typeof val === 'object') {
                //新增 new Observer(val)来递归子属性，所有属性（包括子属性）都转换成getter/setter的形式，然后去追踪它们的变化：
                //只要我们将一个object传到Observer中，那么这个object就会编程响应式的object
                new Observer(val)
        }

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