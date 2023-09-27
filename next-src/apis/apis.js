import axios from 'axios'

import { AUTH_TOKEN, DJANGO_BASE_URL } from '../constants'
import {buildFullUrlAPI} from "@/utils/utils";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

const query = axios.create({
  baseURL: DJANGO_BASE_URL + '/api/',
  timeout: 30000
})

// Interceptor to update token before each request
query.interceptors.request.use((config) => {
  if (process.env.NODE_ENV === 'development') {
    config.headers.Authorization = `Basic ${AUTH_TOKEN}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export function getCateogry (categorySlug) {
  return query.get(`categories/detail/?category_slug=${categorySlug}`)
}

export function getAllCategories () {
  return query.get('categories/list/')
}

export function getCategories () {
  return query.get('categories/')
}

export function getSubcategories (categorySlug) {
  return query.get(`categories/detail/?category_slug=${categorySlug}`)
}

export function getTopic (topicSlug) {
  return query.get(`topics/${topicSlug}/`)
}

export function getTopics (subcategory) {
  return query.get(`topics/?category_slug=${subcategory}`)
}

export function getAllTopic (topic) {
  return query.get('categories/list-topic/')
}

export function getArticlesLastUpload (page, filter) {
  const fullUrl = buildFullUrlAPI('articles/last-upload/', {
    page: page,
    filter: filter
  })
  return query.get(fullUrl)
}

export function getThreadsLastUpload (page, filter) {
  const fullUrl = buildFullUrlAPI('threads/last-upload/', {
    page: page,
    filter: filter
  })
  return query.get(fullUrl)
}

export function getArticles (topic, page, filter) {
  const fullUrl = buildFullUrlAPI(`articles/topic/${topic}/`, {
    page: page,
    filter: filter
  })
  // const params = page ? `?page=${page}` : ''
  return query.get(fullUrl)
}

export function getArticle (article) {
  return query.get(`articles/${article}/`)
}

export function postArtilceLike (data) {
  return query.post('articles/like/', data)
}

export function postNewArticle (data) {
  return query.post('articles/create/', data)
}

export function getArticleComments (param) {
  // const
  return query.get(`comments/?${param}`)
}

export function postComment (data) {
  return query.post('comments/add-comment/', data)
}

export function getThread (thread) {
  return query.get(`threads/${thread}/`)
}

export function getThreads (topic, page, filter) {
  const fullUrl = buildFullUrlAPI(`threads/topic/${topic}/`, {
    page: page,
    filter: filter
  })
  // const params = page ? `?page=${page}` : ''
  return query.get(fullUrl)
}

export function getThreadsListViewApi () {
  return query.get('threads/list-all/')
}

export function postThread (data) {
  return query.post('threads/create/', data)
}

export function postThreadLike (data) {
  return query.post('threads/like/', data)
}

export function putApproveThread (thread) {
  return query.put(`threads/approve/${thread}/`)
}

export function adminGetAllThreads (page) {
  return query.get('threads/all/')
}

export function adminUpdateThread (id, data) {
  return query.put(`threads/update/${id}/`, data)
}

export function getReplies (thread) {
  return query.get(`replies/${thread}/`)
}

export function postReplies (data) {
  return query.post('replies/add-reply/', data)
}

export function getTags () {
  return query.get('tags/')
}

export function getHotTags (tag) {
  return query.get('tags/hot/get-top-tags/')
}

export function getTagData (tag) {
  return query.get(`tags/${tag}/`)
}

export function getAboutUser (id) {
  return query.get(`users/about-user/${id}/`)
}

export function getActivity (type, id, page) {
  const params = page ? `&page=${page}` : ''
  return query.get(`users/all-activity-${type}/?user_id=${id}${params}`)
}

export function userFilterArticles (type, id, filter) {
  return query.get(`users/user-filter-${type}/?user_id=${id}&filter=${filter}`)
}

export function postView (data) {
  return query.post('users/post-view/', data)
}

export function postReplySolved (data) {
  return query.post('replies/solve-reply/', data)
}

export function postReplyVote (data) {
  return query.post('replies/vote-reply/', data)
}

export function getFilterChoices (id, filter, next) {
  if (next) {
    return query.get(next)
  } else {
    return query.get(`users/filter-choice-list-view/?user_id=${id}&filter=${filter}`)
  }
}

export function getNotifications (user) {
  return query.get('notifications/get-all/')
}

export function putReadNotification (id) {
  return query.put(`notifications/put-read/${id}/`)
}

export function addNotifications (data) {
  return query.post('notifications/add-notification/', data)
}

export function getFilterTopics (id) {
  return query.get(`users/filter-choice/?filter=topics&user_id=${id}`)
}
