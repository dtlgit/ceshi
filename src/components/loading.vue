<template>
  <div class="loading-box">
    <div class="loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
  @-webkit-keyframes loading {
    0%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0); }
    40%, 60% {
      -webkit-transform: scale(1);
      transform: scale(1); } }
  @keyframes loading {
    0%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0); }
    40%, 60% {
      -webkit-transform: scale(1);
      transform: scale(1); } }

  .loading-box {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .5);
  }
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    height: 20px;
    grid-gap: 10px;
    grid-template-columns: repeat(5, 20px);
  }
  .loading div {
    -webkit-animation: loading 1s infinite ease backwards;
    animation: loading 1s infinite ease backwards;
    background: #ffffff;
    border-radius: 100%;
    height: 20px;
    width: 20px;
  }
  .loading div:nth-child(1) {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }
  .loading div:nth-child(2) {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  .loading div:nth-child(3) {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  .loading div:nth-child(4) {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }
  .loading div:nth-child(5) {
    -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s;
  }

</style>