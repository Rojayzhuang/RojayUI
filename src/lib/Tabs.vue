<template>
<div>
    <div v-for="(t,index) in titles" :key="index">{{t}}</div>
    <!-- c表示一个组件,这是用component实现的一个插槽 -->
    <component v-for="(c,index) in defaults" :is="c" :key="index" />

</div>
</template>

<script lang="ts">
import Tab from './Tab.vue'
export default {
    setup(props, context) {
        /*console.log({
            //0是第一个tab
            ...context.slots.default()[0]
        })
        console.log({
            //1是第二个tab
            ...context.slots.default()[1]
        })*/
        const defaults = context.slots.default()
        //console.log(defaults[0].type == Tab)
        defaults.forEach((tag) => {
            if (tag.type != Tab) {
                throw new Error('Tabs 子标签必须是 Tab')
            }
        })
        /*//对每一个defaults进行一个遍历,在Tabs中获取到title
        defaults.forEach((tag) => {
            //将遍历到的每一个tag打印出来，可以发现props中包含
            //所需要的title属性
            console.log(
                ...tag.props.title
            )
        })*/
        //使用上述的方式获取到了title，接下来优化代码
        //将这两个东西存储起来
        const titles = defaults.map((tag) => {
            return tag.props.title
        })
        return {
            defaults,
            titles
        }
    }
}
</script>
