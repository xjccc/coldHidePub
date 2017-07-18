import axios from 'axios'

const fetch = (url, body, type) => {
  return axios[type](url, {params: body})
}
export default fetch
