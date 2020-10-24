<template>
<div class="topnavAndBanner">
    <Topnav />
    <div class="banner">
        <h1>RojayUI</h1>
        <h2>Rojay自造的 UI 框架</h2>
        <p class="actions">
            <a href="https://github.com/Rojayzhuang">GitHub</a>
            <router-link to="/doc">开始</router-link>
        </p>
    </div>
</div>
</template>

<script lang="ts">
import Topnav from "../components/Topnav.vue";
export default {
    components: {
        Topnav
    },
};
</script>

<style lang="scss" scoped>
//声明一种绿色
$green:#02bcb0;
//按钮圆角
$border-radius: 4px;
//字体颜色
$color:#007974;

.topnavAndBanner {
    background: linear-gradient(145deg, rgba(2, 0, 36, 1) 0%, rgba(227, 255, 253, 1) 0%, rgba(183, 233, 230, 1) 100%);
}

.banner {
    color: $color;
    padding: 100px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    >.actions {
        padding: 8px 0;

        a {
            margin: 0 8px;
            background: $green;
            //字的颜色
            color: white;
            display: inline-block;
            padding: 8px 24px;
            border-radius: $border-radius;

            &:hover {
                text-decoration: none;
            }
        }
    }
}
</style>
