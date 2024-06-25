<template>
  <div class="common">
    <a href="./about.html">测试首页</a>
  </div>
  <Loading v-show="loading"></Loading>
</template>

<script setup lang="ts">
  import { onMounted, onBeforeMount, ref, reactive, watch } from 'vue'
  import CONFIG from '@/config'
  import { autoFont } from '@/utils/rem'
  import { useStore } from '@/stores/loading'
  import { storeToRefs } from 'pinia'

  // 字体
  autoFont()
  window.onresize = async () => {
    await autoFont()
  }

  // 获取loading
  const mainStore = useStore()
  const { loading } = storeToRefs(mainStore)
</script>

<style scoped lang="less">
  .common {
    font-size: 50px;
  }
</style>
