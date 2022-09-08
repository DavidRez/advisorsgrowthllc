import axios from 'axios'
import { api, url } from '../resources/api'

export const siteMap = {
  path: '/sitemap.xml',
  hostname: url,
  gzip: true,
  lastmod: new Date(),
  sitemaps: [
    {
      path: '/sitemap-pages.xml',
      defaults: {
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date()
      },
      routes: [
        {
          url: '/',
          priority: 1
        }
      ]
    },
    // {
    //   path: '/sitemap-blog.xml',
    //   defaults: {
    //     changefreq: 'daily',
    //     priority: 0.1,
    //     lastmod: new Date()
    //   },
    //   exclude: ['/**'],
    //   routes: async () => {
    //     try {
    //       // Get All Blog Posts
    //       const response = await axios.get(`${api}/wp/v2/posts?per_page=100`)
    //       const dataPages = response.headers['x-wp-totalpages']
    //       let blogArray = response.data
    //       for (let i = 2; i <= dataPages; i++) {
    //         const nextPage = await axios.get(
    //           `${api}/wp/v2/posts?per_page=100&page=${i}`
    //         )
    //         blogArray = [...blogArray, ...nextPage.data]
    //       }
    //       return blogArray.map(blog => '/' + blog.slug)
    //     } catch (e) {
    //       console.error('SITEMAP AGS STUDIES API: ' + e)
    //     }
    //   }
    // },
    // {
    //   path: '/article-archives/sitemap-article-archives.xml',
    //   defaults: {
    //     changefreq: 'daily',
    //     priority: 0.1,
    //     lastmod: new Date()
    //   },
    //   exclude: ['/**'],
    //   routes: async () => {
    //     try {
    //       // Get All Archive Posts
    //       const response = await axios.get(`${api}/wp/v2/article-archives?per_page=100`)
    //       const dataPages = response.headers['x-wp-totalpages']
    //       let blogArray = response.data
    //       for (let i = 2; i <= dataPages; i++) {
    //         const nextPage = await axios.get(
    //           `${api}/wp/v2/article-archives?per_page=100&page=${i}`
    //         )
    //         blogArray = [...blogArray, ...nextPage.data]
    //       }
    //       return blogArray.map(blog => '/article-archives/' + blog.slug)
    //     } catch (e) {
    //       console.error('SITEMAP PRESS API: ' + e)
    //     }
    //   }
    // },
    {
      path: '/team/sitemap-team.xml',
      defaults: {
        changefreq: 'daily',
        priority: 0.1,
        lastmod: new Date()
      },
      exclude: ['/**'],
      routes: async () => {
        try {
          // Get All Blog Posts
          const response = await axios.get(`${api}/wp/v2/team?per_page=100`)
          const dataPages = response.headers['x-wp-totalpages']
          let blogArray = response.data
          for (let i = 2; i <= dataPages; i++) {
            const nextPage = await axios.get(
              `${api}/wp/v2/team?per_page=100&page=${i}`
            )
            blogArray = [...blogArray, ...nextPage.data]
          }
          return blogArray.map(blog => '/team/' + blog.slug)
        } catch (e) {
          console.error('SITEMAP TEAM API: ' + e)
        }
      }
    }
  ]
}

export const setRobots = {
  UserAgent: '*',
  Disallow: '',
  Sitemap: url + 'sitemap.xml'
}
