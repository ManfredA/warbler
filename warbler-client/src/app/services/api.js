import axios from 'axios'

// TODO: find a way to use the index signature and use types then
export function apiCall(method, url, data) {
  return new Promise((resolve, reject) => {
    return axios[method](url, data)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error.response.data.error))
  })
}

export function setTokenHeader(token) {
  if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  else {
    delete axios.defaults.headers.common['Authorization']
  }
}