<template>
  <footer class="footer">
    <div class="footer-logo">
      <div class="footer-logo__top"></div>
      <div class="footer-flex">
        <div class="footer-logo__bottom"></div>
        <div class="footer-logo__ph18"></div>
      </div>
    </div>
    <div>
      <p class="footer__pc" v-for="(item, index) in props.language.pcBottom" :key="index" v-html="item"></p>
      <p class="footer__ph" v-for="(item, index) in props.language.phBottom" :key="index" v-html="item"></p>
    </div>
    <div class="footer-logo__pc18"></div>
  </footer>
</template>

<script setup lang="ts">
  const props = defineProps(['language'])
</script>

<style scoped lang="less">
  @media (min-width: 750px) {
    .footer {
      display: flex;
      justify-content: center;
      width: 100%;
      align-items: center;
      padding: 20px 0;
      background-color: #212121;
      color: #82878a;
      &-logo {
        width: 360px;
        &__top {
          background-image: url('../assets/image/public/logo.png');
          background-size: 100%;
          background-repeat: no-repeat;
          width: 269px;
          height: 65px;
          margin: 0 auto;
        }
        &__bottom {
          background-image: url('../assets/image/public/travellet_vn.png');
          background-size: 100%;
          background-repeat: no-repeat;
          width: 299px;
          height: 44px;
          margin: 15px auto 0 auto;
        }
        &__pc18 {
          background-image: url('../assets/image/public/18limit.png');
          background-size: 100%;
          background-repeat: no-repeat;
          width: 187px;
          height: 60px;
          margin-left: 30px;
        }
      }
      &__pc {
        text-align: center;
      }
      p {
        font-size: 20px;
        line-height: 1.5;
        margin: 0;
        padding: 0;
      }
      &__ph {
        display: none;
      }
    }
  }

  @media (max-width: 749px) {
    .footer {
      width: 100%;
      padding: 20px 50px 80px 50px;
      background-color: #212121;
      color: #82878a;
      &-logo {
        margin: 0 auto;
        &__top {
          background-image: url('../assets/image/public/logo.png');
          background-size: 100%;
          background-repeat: no-repeat;
          width: 484px;
          height: 117px;
          margin: 0 auto;
        }
        &__bottom {
          background-image: url('../assets/image/public/travellet_vn.png');
          background-size: 100%;
          background-repeat: no-repeat;
          width: 508px;
          height: 75px;
        }
        &__ph18 {
          background-image: url('../assets/image/public/18limit.png');
          background-size: 100%;
          background-repeat: no-repeat;
          width: 318px;
          height: 102px;
          margin-left: 30px;
        }
      }
      &__pc {
        display: none;
      }
      &__ph {
        text-align: center;
      }
      p {
        font-size: 35px;
        line-height: 1.5;
        margin: 0;
        padding: 0;
      }
    }
    .footer-flex {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0;
    }
  }
</style>

<style lang="less">
  .footer {
    a {
      color: #6e8b9c;
    }
  }
</style>