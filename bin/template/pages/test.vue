<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ResServe } from '../components/fetch'
// http://localhost:3000/test?name=hello
onMounted(() => {
    const {
        query: { name }
    } = useRoute()
    ResServe('/api/test', {
        name
    }).then(ret => {
        data.value = ret
        console.log('测试接口', ret)
    })
})
const data = ref('')
</script>

<template>
    <div class="user">
        <div class="user-c">
            <div class="ever font">
                {{ data }}
            </div>
        </div>
    </div>
</template>

<style>
@import '@/public/css/test.css';
</style>
