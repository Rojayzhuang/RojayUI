<template>
<div class="rojay-tabs">
    <div class="rojay-tabs-nav">
        <div class="rojay-tabs-nav-item" v-for="(t,index) in titles" :key="index">{{t}}</div>
    </div>
    <div class="rojay-tabs-content">
        <!-- c表示一个组件,这是用component实现的一个插槽 -->
        <component class="rojay-tabs-content-item" v-for="(c,index) in defaults" :is="c" :key="index" />
    </div>

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

<style lang="scss">
$bule: #40a9ff;
$color: #333;
$border-color: #d9d9d9;

.rojay-tabs {
    &-nav {
        display: flex;
        color: $color;
        border-bottom: 1px solid $border-color;

        &-item {
            padding: 8px 0;
            margin: 0 16px;
            cursor: pointer;

            &:first-child {
                margin-left: 0;
            }

            &.selected {
                color: &blue;
            }
        }
    }

    &-content {
        padding: 8px 0;
    }
}
</style>
