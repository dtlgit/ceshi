// 判断是否移动端
const validPhone = () => {
  return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent)
}
// 判断是否是iOS
const validIos = (): boolean => {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
// 设置根标签
const autoFont = () => {
  let pageMaxWidth = 1920 // pc端设计稿大小
  let pageMinWidth = 1080 // 手机端设计稿大小
  let width = document.documentElement.clientWidth
  if (document.documentElement.clientWidth < 750) {
    document.documentElement.style.fontSize = 100 * width / pageMinWidth + 'px'
    return
  }

  document.documentElement.style.fontSize = 100 * width / pageMaxWidth + 'px'
}

export { autoFont, validPhone, validIos }