import { validIos, validPhone } from '@/utils/rem'

const isDev: boolean = process.env.NODE_ENV === 'development' // process.env.NODE_ENV === 'development'
const isIos: boolean = validIos()
const isPhone: boolean = validPhone()

interface CONFIG {
  isDev?: boolean
  baseUrl?: string
  isApiEncrypt?: boolean
  isIOS?: boolean
  isPhone?: boolean
  language?: string
  game_code?: string
  gcp_code?: string
}

const CONFIG: CONFIG = {
  isDev: isDev, // 是否开发环境

  baseUrl: isDev ? '//yhtestsdkapi.eyuangame.com' : '//yhsdkapi.eyuangame.com', // 接口域名

  isApiEncrypt: true, // 请求时是否加密参数

  isIOS: isIos, // 是否苹果

  isPhone: isPhone, //  是否移动端

  language: 'zn', // zn和vi

  game_code: '100001', // 包名  测试100001 正式100004

  gcp_code: 'Y010402', // 渠道名 测试Y010402 正式Y040407
}

export default CONFIG
