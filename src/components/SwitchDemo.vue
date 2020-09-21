<template>
<div>
    <!--需要监听Switch按钮的值，插入input事件，监听 -->
    <Switch :value="y" @input="y = $event" />
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
