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
      type: 'GET'
    })
  }
  // 获取随机用户列表 好像有好多人再发 给人一种错觉 可以的 --by 少爷
  getUsers (data) {
    return fetch({
      url: 'https://s.kcimg.cn/wap/font/gisopic/userInfo.json',
      body: data,
      type: 'GET'
    })
  }
  // 发货
  publishGoods (data) {
    return fetch({
      url: `${URLS}/?c=carrefrigerateapi&m=savecargo`,
      body: data,
      type: 'GET'
    })
  }
  // 获取所有货源
  getAllList (data) {
    return fetch({
      url: `${URLS}/?c=carcooladminapi&m=getlist`,
      body: data,
      type: 'GET'
    })
  }
  // 删除货源
  deleteSource (data) {
    return fetch({
      url: `${URLS}/?c=carcooladminapi&m=deletesource`,
      body: data,
      type: 'GET'
    })
  }
  // 获取用户列表
  getUserList (data) {
    return fetch({
      url: `${URLS}/?c=carcooladminapi&m=getuserlist`,
      body: data,
      type: 'GET'
    })
  }
  // 获取用户内容列表
  getUserContentList (data) {
    return fetch({
      url: `${URLS}/?c=carcooladminapi&m=getusercontentlist`,
      body: data,
      type: 'GET'
    })
  }
  // 将用户1,拉黑,2禁言三天,3解除限制
  updateUserStatus (data) {
    return fetch({
      url: `${URLS}/?c=carcooladminapi&m=updateuserstatus`,
      body: data,
      type: 'GET'
    })
  }
}
export default new XHR()
