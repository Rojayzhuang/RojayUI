<template>
<div>
    <!--需要监听Switch按钮的值，插入input事件，监听 -->
    <!-- Switch :value="y" @update:value="y = $event" / -->
    <!-- 将上述代码简化，使用v-model，将对update监听自动加上-->
    <Switch v-model:value="y" />
</div>
</template>

<script lang="ts">
import {
    ref
} from 'vue'
import Switch from '../lib/Switch.vue'
export default {
    components: {
        Switch
    },
    setup() {
        const y = ref(false)
        return {
            y
        }
    }
}
</script>
