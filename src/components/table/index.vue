<template>
  <div class="table-c no-class__border-top no-class__border-right no-class__border-left no-class__bottom-before">
    <div ref="thead" style="overflow: hidden;">
      <table border="0" cellspacing="0" cellpadding="0" :style="{ width: `${getTableWidth}`, minWidth: '100%', tableLayout: 'fixed' }">
        <colgroup>
          <col v-for="(item, index) in props.column" :style="{ width: `${item.width ? item.width : 1}rem` }" :key="index">
        </colgroup>
        <thead class="orders-thead">
          <tr>
            <th class="orders-thead__th no-class__border-right no-class__border-bottom" :colstart="index" :colend="index" v-for="(item, index) in props.column" :key="item.key">
              {{ item.title }}
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div ref="tbody" style="overflow: auto hidden;">
      <table border="0" cellspacing="0" cellpadding="0" :style="{ width: `${getTableWidth}`, minWidth: '100%', tableLayout: 'fixed' }">
        <colgroup>
          <col v-for="(item, index) in props.column" :style="{ width: `${item.width ? item.width : 1}rem` }" :key="index">
        </colgroup>
        <tbody class="orders-tbody">
          <tr v-for="(row, index) in props.data" :key="index" class="">
            <td v-for="header in props.column" class="orders-tbody__td no-class__border-right no-class__border-bottom" :key="header.key">
              {{ row[header.key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div ref="noData" style="overflow: auto hidden;" v-if="props.data.length === 0">
      <table border="0" cellspacing="0" cellpadding="0" :style="{ width: `${getTableWidth}`, minWidth: '100%', tableLayout: 'fixed' }">
        <tbody>
          <tr><td :style="{ width: `${getTableWidth}` }" class="noData-tip"><span>{{ props.tableTip }}</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script setup lang="ts">
  import { onMounted, reactive, ref, computed } from 'vue'

  const props = defineProps(['tableTip', 'column', 'data'])

  const getTableWidth = computed(() => {
    let width = 0
    props.column.forEach(item => {
      width = width + (item.width ? item.width : 1)
    })
    return `${width}rem`
  })

  const tableData = reactive({
    data: [],
    column: []
  })

  const thead = ref<HTMLElement | null>(null)
  const tbody = ref<HTMLElement | null>(null)
  const noData = ref<HTMLElement | null>(null)

  const syncScroll = () => {
    tbody.value?.addEventListener('scroll', () => {
      if (thead.value && tbody.value) {
        thead.value.scrollLeft = tbody.value.scrollLeft
      }
    })
    noData.value?.addEventListener('scroll', () => {
      if (thead.value && noData.value) {
        thead.value.scrollLeft = noData.value.scrollLeft
      }
    })
  }
  onMounted(() => {
    syncScroll()
  })
</script>

<style scoped lang="less">
  .orders-tip {
    margin-top: 250px;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    background: -webkit-linear-gradient(0deg, #49241f, #ff4a0f);
    background: linear-gradient(0deg, #49241f, #ff4a0f);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }
  @media (min-width: 750px) {
    @fontSize750: 18px;
    @height750: 65px;
    .table-c {
      position: relative;
      margin-top: 50px;
    }
    .orders-thead {
      position: relative;
      width: inherit;
      height: 100%;
      max-width: 100%;
      overflow: hidden;
      color: #495060;
      font-size: @fontSize750;
      background-color: #fff;
      box-sizing: border-box;
      text-align: center;
      &__thead {
        overflow: hidden;
      }
      &__th {
        text-align: center;
        height: @height750;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
        background-color: #F7F7F7;
        &:last-child {
          border-right: none!important;
        }
      }
    }
    .orders-tbody {
      position: relative;
      width: inherit;
      height: 100%;
      max-width: 100%;
      overflow: hidden;
      font-size: @fontSize750;
      background-color: #fff;
      box-sizing: border-box;
      text-align: center;
      &__td {
        text-align: center;
        height: @height750;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
        &:last-child {
          border-right: none!important;
        }
      }
    }
    .noData-tip {
      font-size: 22px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #495060;
    }
  }
  @media (max-width: 749px) {
    @fontSize749: 38px;
    @height749: 85px;
    .table-c {
      position: relative;
      margin: 50px 50px 0 50px;
    }
    .orders-thead {
      position: relative;
      width: inherit;
      height: 100%;
      max-width: 100%;
      overflow: hidden;
      color: #495060;
      font-size: @fontSize749;
      background-color: #fff;
      box-sizing: border-box;
      text-align: center;
      &__thead {
        overflow: hidden;
      }
      &__th {
        text-align: center;
        height: @height749;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
        background-color: #F7F7F7;
        &:last-child {
          border-right: none!important;
        }
      }
    }
    .orders-tbody {
      position: relative;
      width: inherit;
      height: 100%;
      max-width: 100%;
      overflow: hidden;
      font-size: @fontSize749;
      background-color: #fff;
      box-sizing: border-box;
      text-align: center;
      &__td {
        text-align: center;
        height: @height749;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
        &:last-child {
          border-right: none!important;
        }
      }
    }
    .noData-tip {
      font-size: 35px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: #495060;
    }
  }
</style>