//Vue 通过 Object.defineProperty来将object的所有属性转换为getter/setter的形式
//但getter/setter只能追踪一个数据是否被修改，无法追踪新增属性和删除属性
//为了解决上述问题，Vue提供了两个API，vm.$set与vm.$delete

//新增一个属性
var vm = new Vue({
        el: '#el',
        template: '#demo-template',
        methods: {
                action() {
                        this.obj.name = 'berwin'
                }
        },
        data: {
                obj: {}
        }
})


//删除一个属性
var vm = new Vue({
        el: '#el',
        template: '#demo-template',
        methods: {
                action() {
                     delete   this.obj.name 
                }
        },
        data: {
                obj: {}
        }
})