<template>
<div>
    Tabs 组件
    <component :is="defaults[0]" />
    <component :is="defaults[1]" />

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
        return {
            defaults
        }
    }
}
</script>
