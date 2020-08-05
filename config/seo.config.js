import axios from 'axios'
import api from '../resources/api'

const url = 'https://nuxt-api.roostertest3.com'

export const siteMap = {
  hostname: url,
  gzip: true,
  routes: () =>
    axios
      .get(`${api}/wp/v2/posts`)
      .then(res => res.data.map(post => `/blog/${post.slug}`))
}

export const setRobots = {
  UserAgent: '*',
  Disallow: '',
  Sitemap: url
}
