<template>
<button @click="toggle" :class="{checked}"> <span></span> </button>
</template>

<script lang="ts">
import {
    ref
} from 'vue'
export default {
    setup() {
        //默认false
        const checked = ref(false);
        const toggle = () => {
            checked.value = !checked.value
        }
        return {
            checked,
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
</style>
