<template>
<div class="rojay-tabs">
    <div class="rojay-tabs-nav" ref="container">
        <!-- 导航的选中，添加class,使用selected ;需要关联ref以获取宽度，复杂的需要加":"号-->
        <div class="rojay-tabs-nav-item" v-for="(t,index) in titles" :ref="el => {if(el) navItems[index] = el }" @click="select(t)" :class="{selected: t == selected}" :key="index">{{t}}</div>
        <!-- 会动的横线 需要关联ref以获取宽度，不复杂的不需要加":"号-->
        <div class="rojay-tabs-nav-indicator" ref="indicator"></div>
    </div>
    <div class="rojay-tabs-content">
        <component class="rojay-tabs-content-item" :class="{selected: c.props.title === selected }" v-for="c in defaults" :is="c" />
    </div>

</div>
</template>

<script lang="ts">
import Tab from './Tab.vue'
import {
    computed,
    onMounted,
    onUpdated,
    ref
} from 'vue'
export default {
    props: {
        selected: {
            type: String
        }
    },
    setup(props, context) {
        //在setup中声明，需要return才能使用
        //使用<>来传递TypeScript参数，这是TypeScript的泛型语法
        //该语句的意思是ref([])的数组是一个HTMLDiv元素的数组
        //需要与item关联
        const navItems = ref < HTMLDivElement[] > ([])
        //会动横线的ref，用以获取该组件的宽度，与横线关联
        const indicator = ref < HTMLDivElement > (null)
        //用以指定横线的滑动距离,需要与nav关联
        const container = ref < HTMLDivElement > (null)
        //优化代码
        const x = () => {
            /*console.log({
                            ...navItems.value
                        })*/
            //获取到所有导航的div
            const divs = navItems.value
            //获取到之后找到一个class为selected的div
            //将找到的结果命名为result
            //使用TypeScript泛型语法规定div的属性为HTMLDiv元素数组这样会提示classList
            //但是filter总是会返回一个数组（一个包含了被选中div的数组），
            //我们不需要这个数组，只需要元素，因此加[0]
            const result = divs.filter(div => div.classList.contains('selected'))[0]
            /*//上述的另一种写法,但find在一些古老的浏览器中不支持
            const result = divs.find(div => div.classList.
            contains('selected'))[0]*/
            //console.log(result)
            //得到组件的宽度
            const {
                width
            } = result.getBoundingClientRect()
            //将indicator的宽度赋值为获取到的组件宽度
            indicator.value.style.width = width + 'px'
            //得到container的left(左边的坐标)
            const {
                //对left进行重命名，因为两个都为left
                left: left1
            } = container.value.getBoundingClientRect()
            //得到div的left
            const {
                //对left进行重命名
                left: left2
            } = result.getBoundingClientRect()
            //横线移动的距离
            const left = left2 - left1
            indicator.value.style.left = left + 'px'
        }
        //onMounted只在第一次渲染执行（即用户切换后不会执行）
        onMounted(x)
        //与onMounted不同，该代码页面发生变化时就会渲染
        onUpdated(x)

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
            if (tag.type !== Tab) {
                throw new Error('Tabs 子标签必须是 Tab')
            }
        })
        const current = computed(() => {
            //console.log('重新 return')
            return defaults.filter((tag) => {
                return tag.props.title === props.selected
            })[0]
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
        const select = (title: string) => {
            context.emit('update:selected', title)
        }
        return {
            defaults,
            titles,
            current,
            select,
            navItems,
            indicator,
            container
        }
    }
}
</script>

<style lang="scss">
$blue: #40a9ff;
$color: #333;
$border-color: #d9d9d9;

.rojay-tabs {
    &-nav {
        display: flex;
        color: $color;
        border-bottom: 1px solid $border-color;
        position: relative;

        &-item {
            padding: 8px 0;
            margin: 0 16px;
            cursor: pointer;

            &:first-child {
                margin-left: 0;
            }

            &.selected {
                color: $blue;
            }
        }

        &-indicator {
            position: absolute;
            height: 3px;
            background: $blue;
            left: 0;
            bottom: -1px;
            width: 100px;
            //横线切换的柔和动画,250ms是动画展示一个较为舒服的时间
            transition: all 250ms;
        }
    }

    &-content {
        padding: 8px 0;

        &-item {
            display: none;

            &.selected {
                display: block;
            }
        }
    }
}
</style>
