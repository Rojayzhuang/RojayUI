<template>
<button @click="toggle" :class="{checked:value}"> <span></span> </button>
</template>

<script lang="ts">
import {
    ref
} from 'vue'
export default {
    props: {
        value: Boolean
    },
    setup(props, context) {
        //默认false
        const toggle = () => {
            //toggle的作用是将当前值取反，通过input事件发送给外面
            context.emit('update:value', !props.value)
        }
        return {
            toggle
        }
    }
}
</script>

<style lang="scss" scoped>
$h:22px;
$h2:$h - 4px;

button {
    height: $h;
    width: $h*2;
    border: none;
    //默认状态为灰色
    background: gray;
    border-radius: $h/2;
    position: relative;
}

span {
    position: absolute;
    top: 2px;
    //默认2像素，触发事件后切换
    left: 2px;
    height: $h2;
    width: $h2;
    background: white;
    border-radius: $h2 / 2;
    transition: left 250ms;
}

//如果button的状态是checked（被触发）则背景变为蓝色
button.checked {
    background: blue;
}

//按钮切换的动画
button.checked>span {
    //使用CSS的高级样式
    left: calc(100% - #{$h2} - 2px);
}

//解决点击switch控件出现黑框的问题
button:focus {
    outline: none;
}
</style>
