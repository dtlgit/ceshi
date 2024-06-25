import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('loading',() => {
  // state
  const loading = ref(false)

  // getter
  const getterLoading = computed(() => {

  })

  // 同步action
  const actionLoading = (val: boolean) => {
    loading.value = val
  }

  // 异步action
  const getLoading = async () => {

  }

  return{
    loading,
    getterLoading,
    actionLoading,
    getLoading
  }
})