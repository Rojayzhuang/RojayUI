<template>
<div :size="size">
    <button v-bind="rest">
        <slot />
    </button>
</div>
</template>

<script lang="ts">
export default {
    //继承属性改为false，这样div不会默认继承
    inheritAttrs: false,
    props: {

    },
    setup(props, context) {

        //多个属性，使用const{size, level, ...xxx}=context.attrs将属性分开
        const {
            size,
            ...rest
        } = context.attrs
        return {
            size,
            rest
        }
    }
};
</script>

<style lang="scss" scoped>
div {
    border: 1px solid red;
}
</style>
