<template>
  <ul :class="wrapClasses" :style="styles" >
    <li :title="language.pageTip[0]" :class="prevClasses" @click.stop="prev">
      <div class="c-prev"></div>
    </li>
    <li title="1" :class="firstPageClasses" @click.stop="changePage(1)"><a>1</a></li>
    <li :title="language.pageTip[2]" v-if="currentPage > 5" :class="[prefixCls + '-item-jump-prev']" @click.stop="fastPrev">
      <div class="c-omit"></div>
    </li>
    <li :title="currentPage - 3" v-if="currentPage === 5" :class="[prefixCls + '-item']" @click.stop="changePage(currentPage - 3)"><a>{{ currentPage - 3 }}</a></li>
    <li :title="currentPage - 2" v-if="currentPage - 2 > 1" :class="[prefixCls + '-item']" @click.stop="changePage(currentPage - 2)"><a>{{ currentPage - 2 }}</a></li>
    <li :title="currentPage - 1" v-if="currentPage - 1 > 1" :class="[prefixCls + '-item']" @click.stop="changePage(currentPage - 1)"><a>{{ currentPage - 1 }}</a></li>
    <li :title="currentPage" v-if="currentPage != 1 && currentPage != allPages" :class="[prefixCls + '-item',prefixCls + '-item-active']"><a>{{ currentPage }}</a></li>
    <li :title="currentPage + 1" v-if="currentPage + 1 < allPages" :class="[prefixCls + '-item']" @click.stop="changePage(currentPage + 1)"><a>{{ currentPage + 1 }}</a></li>
    <li :title="currentPage + 2" v-if="currentPage + 2 < allPages" :class="[prefixCls + '-item']" @click.stop="changePage(currentPage + 2)"><a>{{ currentPage + 2 }}</a></li>
    <li :title="currentPage + 3" v-if="allPages - currentPage === 4" :class="[prefixCls + '-item']" @click.stop="changePage(currentPage + 3)"><a>{{ currentPage + 3 }}</a></li>
    <li :title="language.pageTip[3]" v-if="allPages - currentPage >= 5" :class="[prefixCls + '-item-jump-next']" @click.stop="fastNext">
      <div class="c-omit"></div>
    </li>
    <li :title="allPages" v-if="allPages > 1" :class="lastPageClasses" @click.stop="changePage(allPages)"><a>{{ allPages }}</a></li>
    <li :title="language.pageTip[1]" :class="nextClasses" @click.stop="next">
      <div class="c-next"></div>
    </li>
  </ul>
</template>
<script>
  const prefixCls = 'c-page';
  const oneOf = (value, validList) => {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true;
      }
    }
    return false;
  }
  export default {
    name: 'Page',
    props: {
      current: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        default: 0
      },
      pageSize: {
        type: Number,
        default: 10
      },
      pageSizeOpts: {
        type: Array,
        default () {
          return [10, 20, 30, 40];
        }
      },
      placement: {
        validator (value) {
          return oneOf(value, ['top', 'bottom']);
        },
        default: 'bottom'
      },
      size: {
        validator (value) {
          return oneOf(value, ['small']);
        }
      },
      className: {
        type: String
      },
      styles: {
        type: Object
      },
      language: {
        type: Object
      }
    },
    data () {
      return {
        prefixCls: prefixCls,
        currentPage: this.current,
        currentPageSize: this.pageSize
      };
    },
    watch: {
      total (val) {
        let maxPage = Math.ceil(val / this.currentPageSize);
        if (maxPage < this.currentPage ) {
          this.currentPage = (maxPage === 0 ? 1 : maxPage);
        }
      },
      current (val) {
        this.currentPage = val;
      },
      pageSize (val) {
        this.currentPageSize = val;
      }
    },
    computed: {
      allPages () {
        const allPage = Math.ceil(this.total / this.currentPageSize);
        return (allPage === 0) ? 1 : allPage;
      },
      wrapClasses () {
        return [`${prefixCls}`];
      },
      prevClasses () {
        return [
          `${prefixCls}-prev`,
          {
            [`${prefixCls}-disabled`]: this.currentPage === 1,
          }
        ];
      },
      nextClasses () {
        return [
          `${prefixCls}-next`,
          {
            [`${prefixCls}-disabled`]: this.currentPage === this.allPages
          }
        ];
      },
      firstPageClasses () {
        return [
          `${prefixCls}-item`,
          {
            [`${prefixCls}-item-active`]: this.currentPage === 1
          }
        ];
      },
      lastPageClasses () {
        return [
          `${prefixCls}-item`,
          {
            [`${prefixCls}-item-active`]: this.currentPage === this.allPages
          }
        ];
      }
    },
    methods: {
      changePage (page) {
        if (this.currentPage != page) {
          this.currentPage = page;
          this.$emit('update:current', page);
          this.$emit('on-change', page);
        }
      },
      prev () {
        const current = this.currentPage;
        if (current <= 1) {
          return false;
        }
        this.changePage(current - 1);
      },
      next () {
        const current = this.currentPage;
        if (current >= this.allPages) {
          return false;
        }
        this.changePage(current + 1);
      },
      fastPrev () {
        const page = this.currentPage - 5;
        if (page > 0) {
          this.changePage(page);
        } else {
          this.changePage(1);
        }
      },
      fastNext () {
        const page = this.currentPage + 5;
        if (page > this.allPages) {
          this.changePage(this.allPages);
        } else {
          this.changePage(page);
        }
      }
    }
  };
</script>
<style scoped lang="less">

  @media (min-width: 750px) {
    .c-page {
      float: right;
      font-size: 20px;
    }
    li {
      list-style-type: none;
    }
    .c-prev {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-image: url("../../assets/image/public/left.png");
      background-repeat: no-repeat;
      background-size: 100%;
      height: 16px;
      width: 16px;
    }
    .c-next {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-image: url("../../assets/image/public/right.png");
      background-repeat: no-repeat;
      background-size: 100%;
      height: 16px;
      width: 16px;
    }
    .c-omit {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-image: url("../../assets/image/public/omit.png");
      background-repeat: no-repeat;
      background-size: 100%;
      height: 16px;
      width: 16px;
    }
    .c-page-prev {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      min-width: var(--page-40);
      height: var(--page-40);
      line-height: var(--page-40);
      list-style: none;
      text-align: center;
      cursor: pointer;
      color: #666;
      font-family: Arial;
      border: 1px solid #dddee1;
      border-radius: 4px;
      transition: all .2s ease-in-out;
      background-color: #fff;
      margin-right: 8px;
    }
    .c-page-next {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      min-width: var(--page-40);
      height: var(--page-40);
      line-height: var(--page-40);
      list-style: none;
      text-align: center;
      cursor: pointer;
      color: #666;
      font-family: Arial;
      border: 1px solid #dddee1;
      border-radius: 4px;
      transition: all .2s ease-in-out;
      background-color: #fff;
      margin-left: 4px;
    }
    .c-page-item {
      display: inline-block;
      vertical-align: middle;
      min-width: var(--page-40);
      height: var(--page-40);
      line-height: var(--page-40);
      margin-right: 4px;
      text-align: center;
      list-style: none;
      background-color: #fff;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;
      font-family: Arial;
      border: 1px solid #dddee1;
      border-radius: 4px;
      transition: border .2s ease-in-out,color .2s ease-in-out;
    }
    .c-page-item-jump-next {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      min-width: var(--page-40);
      height: var(--page-40);
      line-height: var(--page-40);
      list-style: none;
      text-align: center;
      cursor: pointer;
      color: #666;
      font-family: Arial;
      border: 1px solid #dddee1;
      border-radius: 4px;
      transition: all .2s ease-in-out;
      margin-right: 4px;
    }
    .c-page-item-jump-prev {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      min-width: var(--page-40);
      height: var(--page-40);
      line-height: var(--page-40);
      list-style: none;
      text-align: center;
      cursor: pointer;
      color: #666;
      font-family: Arial;
      border: 1px solid #dddee1;
      border-radius: 4px;
      transition: all .2s ease-in-out;
      margin-right: 4px;
    }
    .c-page-item-active {
      background-color: #2d8cf0;
      border-color: #2d8cf0;
      color: #ffffff;
    }
    .c-page-disabled {
      cursor: not-allowed;
    }
  }

  @media (max-width: 749px) {
    @imgWidth: 20px;
    .c-page {
      float: right;
      margin-right: 50px;
      font-size: 24px;
    }
    li {
      list-style-type: none;
    }
    .c-prev {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-image: url("../../assets/image/public/left.png");
      background-repeat: no-repeat;
      background-size: 100%;
      height: @imgWidth;
      width: @imgWidth;
    }
    .c-next {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-image: url("../../assets/image/public/right.png");
      background-repeat: no-repeat;
      background-size: 100%;
      height: @imgWidth;
      width: @imgWidth;
    }
    .c-omit {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-image: url("../../assets/image/public/omit.png");
      background-repeat: no-repeat;
      background-size: 100%;
      height: @imgWidth;
      width: @imgWidth;
    }
    .c-page-prev {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      min-width: var(--page-55);
      height: var(--page-55);
      line-height: var(--page-55);
      list-style: none;
      text-align: center;
      cursor: pointer;
      color: #666;
      font-family: Arial;
      border: 1px solid #dddee1;
      border-radius: 4px;
      transition: all .2s ease-in-out;
      background-color: #fff;
      margin-right: 8px;
    }
    .c-page-next {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      min-width: var(--page-55);
      height: var(--page-55);
      line-height: var(--page-55);
      list-style: none;
      text-align: center;
      cursor: pointer;
      color: #666;
      font-family: Arial;
      border: 1px solid #dddee1;
      border-radius: 4px;
      transition: all .2s ease-in-out;
      background-color: #fff;
      margin-left: 4px;
    }
    .c-page-item {
      display: inline-block;
      vertical-align: middle;
      min-width: var(--page-55);
      height: var(--page-55);
      line-height: var(--page-55);
      margin-right: 4px;
      text-align: center;
      list-style: none;
      background-color: #fff;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;
      font-family: Arial;
      border: 1px solid #dddee1;
      border-radius: 4px;
      transition: border .2s ease-in-out,color .2s ease-in-out;
    }
    .c-page-item-jump-next {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      min-width: var(--page-55);
      height: var(--page-55);
      line-height: var(--page-55);
      list-style: none;
      text-align: center;
      cursor: pointer;
      color: #666;
      font-family: Arial;
      border: 1px solid #dddee1;
      border-radius: 4px;
      transition: all .2s ease-in-out;
      margin-right: 4px;
    }
    .c-page-item-jump-prev {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      min-width: var(--page-55);
      height: var(--page-55);
      line-height: var(--page-55);
      list-style: none;
      text-align: center;
      cursor: pointer;
      color: #666;
      font-family: Arial;
      border: 1px solid #dddee1;
      border-radius: 4px;
      transition: all .2s ease-in-out;
      margin-right: 4px;
    }
    .c-page-item-active {
      background-color: #2d8cf0;
      border-color: #2d8cf0;
      color: #ffffff;
    }
    .c-page-disabled {
      cursor: not-allowed;
    }
  }
</style>