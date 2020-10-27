<template>
<div>
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
    <div class="features">
        <svg class="icon">
            <use xlink:href="#icon-vue"></use>
        </svg>
        <svg class="icon">
            <use xlink:href="#icon-ts"></use>
        </svg>
        <svg class="icon">
            <use xlink:href="#icon-dahuoji"></use>
        </svg>
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
    /*//使用border-radius做圆弧
    border-bottom-left-radius: 50% 40px;
    border-bottom-right-radius: 50% 40px;*/
    //clip-path做圆弧  google: mdn clip path
    //在网页代码检查中找到topnavAndBanner的样式，使用shift + ↑ 来调整数值
    clip-path: ellipse(80% 60% at 50% 40%);
}

.features {
    >svg {
        width: 64px;
        height: 64px;
    }
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
