<template>
<button class="rojay-switch" @click="toggle" :class="{'rojay-checked':value}"> <span></span> </button>
</template>

<script lang="ts">
import {
    ref
} from "vue"
export default {
    props: {
        value: Boolean
    },
    setup(props, context) {
        //默认false
        const toggle = () => {
            //toggle的作用是将当前值取反，通过input事件发送给外面
            context.emit("update:value", !props.value);
        }
        return {
            toggle
        };
    }
};
</script>

<!-- 必须保证选择器是稳定的，所以不能使用scoped-->

<style lang="scss">
$h:22px;
$h2:$h - 4px;

.rojay-switch {
    height: $h;
    width: $h*2;
    border: none;
    //默认状态为灰色
    background: #bfbfbf;
    border-radius: $h/2;
    position: relative;

    >span {
        position: absolute;
        top: 2px;
        //默认2像素，触发事件后切换
        left: 2px;
        height: $h2;
        width: $h2;
        background: white;
        border-radius: $h2 / 2;
        transition: all 250ms;
    }

    //如果button的状态是checked（被触发）则背景变为蓝色
    &.rojay-checked {
        background: #1890ff;

        //按钮切换的动画
        >span {
            //使用CSS的高级样式
            left: calc(100% - #{$h2} - 2px);
        }
    }

    //解决点击switch控件出现黑框的问题
    &:focus {
        outline: none;
    }

    &:active {
        >span {
            width: $h2 + 4px;
        }
    }

    &.rojay-checked:active {
        >span {
            width: $h2 + 4px;
            margin-left: -4px;
        }
    }
}
</style>
