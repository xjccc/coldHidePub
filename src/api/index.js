import fetch from './ajax'

export const DEBUG = false // 是否为开发模式
const HTTP_DEV = 'https://56-api.kcimg.cn' // 测试地址
const HTTPS = 'https://56-api.kcimg.cn' // 正式地址
const URLS = DEBUG ? HTTP_DEV : HTTPS

class XHR {
  // 获取列表信息
  getList (json) {
    return fetch({
      url: `${URLS}/`,
      body: json,
      type: 'get'
    })
  }
}
export default new XHR()
