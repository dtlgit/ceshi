import { fileURLToPath, URL } from 'node:url'
import path, { join, resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import postcssPxToRem from 'postcss-pxtorem'
import { glob } from 'glob'

const env = process.env.node

// 动态搜索src/pages下的所有入口文件
const pageEntries = glob.sync( './**.html')

// 生成多页面的输入配置
const inputConfig = pageEntries.reduce((acc: any, url) => {
  const match: any = url.match(/([^\.]+)\.html$/)
  if (match && match[1]) {
    const key = match[1]
    acc[key] = resolve(__dirname, url)
  }
  return acc
}, {})

// https://vitejs.dev/config/
export default defineConfig({
  // base: './', // 多页面应用不能配置
  // 插件
  plugins: [
    vue(),
    vueJsx(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.filter',
        'es.array.for-each',
        'es.array.flat-map',
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all'
      ]
    }),
  ],
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: false
      }
    },
    rollupOptions: {
      input: inputConfig,
      output: {
        // 自定义 chunk 拆分
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        // 自定义输出文件名
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name].[hash][extname]'
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name].[hash][extname]'
          }
          return 'assets/[name].[hash][extname]'
        }
      }
    }
  },
  resolve: {
    // 文件别名
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 开发服务器
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'http://jsonplaceholder.typicode.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
    host: '0.0.0.0',
  },
  css: {
    postcss: {
      plugins: [
        postcssPxToRem({
          rootValue: 100, // 表示根元素字体大小或根据输入参数返回根元素字体大小
          unitPrecision: 5, // 精确到多少位。
          propList: ['*'], // 表示允许从px转换为rem的样式
          selectorBlackList: ['no-class'], // 表示这个类不允许把px转换为rem
          replace: true, // 是否替换
          mediaQuery: false, // 允许在媒体查询中转换px
          minPixelValue: 0, // 设置要替换的最小像素值
          exclude: /node_modules/i // 表示目录中的样式不参与转换
        })
      ]
    }
  }
})
