<template>
<button> <span></span> </button>
</template>

<style lang="scss" scoped>
$h:22px;
$h2:$h - 4px;

button {
    height: $h;
    width: $h*2;
    border: none;
    background: blue;
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

//按钮切换的动画
button:hover>span {
    //使用CSS的高级样式
    left: calc(100% - #{$h2} - 2px);
}
</style>
