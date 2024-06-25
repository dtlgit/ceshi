<template>
  <div class="explain">
    <div class="explain__screen" @click="clickExplain('')"></div>
    <div class="explain__box">
      <div class="explain__title">
        {{ props.language[props.explain.show] }}
        <div class="explain__close" @click="clickExplain('')">
          <svg focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true" fill-rule="evenodd" viewBox="64 64 896 896">
            <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
          </svg>
        </div>
      </div>
      <p v-for="(item, index) in props.explain[explain.show]" :key="index" v-html="item"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps(['language', 'explain'])

  const emit = defineEmits<{
    (e: 'clickEvent', val: string): void
  }>()

  const clickExplain = (val: string) => {
    emit('clickEvent', val)
  }
</script>

<style scoped lang="less">
  @media (min-width: 750px) {
    .explain {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-color: rgba(0, 0, 0, .5);
      &__screen {
        height: 100vh;
        width: 100vw;
      }
      &__box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: auto;
        width: 800px;
        background-color: var(--color-background);
        border-radius: 5px;
        padding: 25px 25px;
        font-size: 26px;
        p {
          line-height: 1.5;
        }
      }
      &__title {
        position: relative;
        text-align: center;
        font-weight: bold;
        font-size: 38px;
        background: -webkit-linear-gradient(0deg, #49241f, #ff4a0f);
        background: linear-gradient(0deg, #49241f, #ff4a0f);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
      }
      &__close {
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 50px;
        cursor: pointer;
        color: #5e5e5e;
      }
    }
  }

  @media (max-width: 749px) {
    .explain {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-color: rgba(0, 0, 0, .5);
      &__screen {
        height: 100vh;
        width: 100vw;
      }
      &__box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: auto;
        width: 850px;
        background-color: var(--color-background);
        border-radius: 5px;
        padding: 25px 25px;
        font-size: 38px;
        p {
          line-height: 1.5;
        }
      }
      &__title {
        position: relative;
        text-align: center;
        font-weight: bold;
        margin-top: 20px;
        font-size: 50px;
        background: -webkit-linear-gradient(0deg, #49241f, #ff4a0f);
        background: linear-gradient(0deg, #49241f, #ff4a0f);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
      }
      &__close {
        position: absolute;
        top: -10px;
        right: 0;
        font-size: 70px;
        cursor: pointer;
        color: #5e5e5e;
      }
    }
  }
</style>


<style lang="less">
  .explain {
    span {
      color: var(--color-brown);
    }
  }
</style>