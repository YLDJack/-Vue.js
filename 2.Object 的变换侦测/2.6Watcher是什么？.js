//把watcher实例添加到data.a.b.c属性的Dep中，当data.a.b.c值发生变化时，通知Watcher。接着Watcher再执行参数中的这个回调函数。
//keypath
vm.$watch('a.b.c', function (newVal, oldVal) {
        //做点什么
})


export default class Watcher {
        constructor(vm, expOrFn, cb) {
                this.vm = vm
                //执行this.getter(),就可以读取data.a.b.c
                this.getter = parsePath(expOrFn)
                this.cb = cb
                this.value = this.get()
        }
        get() {
                //把window.target 设置成了this，也就是当前watcher实例
                window.target = this
                //然后再读一下data.a.b.c的值，这肯定会触发getter
                //触发了getter，就会触发收集依赖的逻辑。从window.target中读取一个依赖并添加到Dep中
                //这就导致只要先在window.target赋予一个this,然后再读一个值，去触发getter，就可以把this主动添加到keypath的Dep中
                //依赖注入到Dep中，每当data.a.b.c值发生变化时，就会让依赖列表中所有的依赖循环触发update方法，也就是Watcher中的update方法，而update方法会执行参数中的回调函数，将value和oldValue传到参数中
                ///所以，其实不管是用户执行的vm.$watch('a.b.c',(newVal, oldVal)=>{}) 还是模板用到的data，都是通过Watcher来通知自己是否需要发生变化。
                let value = this.getter.call(this.vm, this.vm)
                window.target = undefined
                return value
        }

        update() {
                const oldVal = this.value
                this.value = this.get()
                this.cb.call(this.vm, this.value, oldVal)
        }
}


//parsePath是怎么读取一个字符串的keyPath的？
//解析简单路径
const bailRE = /[^\w.$]/
export function parsePath(path) {
        if (bailRE.test(path)) {
                return
        }
        const segments = path.split('.')
        return function (obj) {
                for (let i = 0; i < segments.length; i++) {
                        if (!obj) return
                        obj = obj[segments[i]]

                }
                return obj
        }
}