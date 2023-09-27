import axios from 'axios'
import {AUTH_TOKEN, DJANGO_BASE_URL} from '../constants'
import process
  from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

const authProfilesAxios = axios.create({
  baseURL: DJANGO_BASE_URL + '/api/users/',
  timeout: 30000
})

const profilesAxios = axios.create({
  baseURL: DJANGO_BASE_URL + '/api/users/',
  timeout: 30000
})
authProfilesAxios.interceptors.request.use((config) => {

  if (process.env.NODE_ENV === 'development') {
    config.headers.Authorization = `Basic ${AUTH_TOKEN}`
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

export function postUserAPI (action, postData) {
  let url = ''
  switch (action) {
    case 'login':
      url = 'login/'; break
    case 'register':
      url = 'register/'; break
    case 'invite':
      url = 'invite/'; break
    case 'update-profile':
      url = 'update-profile/'; break
    case 'change-password':
      url = 'change-password/'; break
    case 'recover':
      url = 'recover/'; break
    default:
      url = '/'; break
  }
  if (!url) {
    throw new Error('URL không đúng!')
  }
  return profilesAxios.post(url, postData)
}

export function changePassword (data) {
  return profilesAxios.post('change-password/', data)
}

export function getMyProfileAPI (params) {
  return authProfilesAxios.get('profile/')
}

export function logout () {
  return authProfilesAxios.get('logout/')
}

export function uploadAvatarAPI (params) {
  const config = {
    timeout: 60000,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return authProfilesAxios.put('update-profile/', params, config)
}

export function getListSocialLogin () {
  return profilesAxios.get('get-list-social-login/')
}

export function getSocialLogin (params) {
  return profilesAxios.get('get-list-social-login/')
}

export function putUpdateInfo (data) {
  return authProfilesAxios.put('update-info-user/', data)
}

export function getLogout () {
  return authProfilesAxios.get('logout/')
}
