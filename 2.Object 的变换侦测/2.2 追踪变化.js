//封装好之后，每当从data的key中读取数据时，get函数被触发；每当data的key中设置数据时，set函数被触发
function defineReactive(data, key, val) {
        Object.defineProperty(data, key, {
                enumerable: true,
                configurable: true,
                get: function () {
                        return val
                },
                set: function (newVal) {
                        if (val === newVal) {
                                return
                        }
                        val = newVal
                }
        })
}