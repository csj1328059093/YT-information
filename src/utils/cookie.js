export const getCookie = (name) => {
  let result = document.cookie.match(
    '(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)'
  )
  return result ? result.pop() : ''
}
// 设置html页面cookie方法
export const setCookie = (name = '', value = '') => {
  document.cookie =
    name +
    '=' +
    value +
    ';expires=' +
    new Date(
      parseInt(new Date().getTime()) + 60 * 60 * 24 * 1000
    ).toUTCString()
}
