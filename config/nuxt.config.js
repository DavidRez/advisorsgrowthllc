import axios from 'axios'
import { setData } from '../resources/utils'
import { api } from '../resources/api'
import webFonts from '../resources/fonts.js'
import buildConfig from './build.config.js'
import { siteHead } from './head.config.js'
import { siteMap, setRobots } from './seo.config'

export default async () => {
  const meta = await setData('home')
  return {
    server: {
      port: 8080,
      host: '0.0.0.0'
    },
    target: 'static',
    generate: {
      async routes () {
        try {
          // // Get All AGS Studies
          // const response = await axios.get(`${api}/wp/v2/posts?per_page=100`)
          // const dataPages = response.headers['x-wp-totalpages']
          // let blogArray = response.data
          // for (let i = 2; i <= dataPages; i++) {
          //   const nextPage = await axios.get(
          //     `${api}/wp/v2/posts?per_page=100&page=${i}`
          //   )
          //   blogArray = [...blogArray, ...nextPage.data]
          // }
          // const blogs = blogArray.map(blog => '/' + blog.slug)

          // // Get All Article Archive Posts
          // const articlesResponse = await axios.get(`${api}/wp/v2/article-archives?per_page=100`)
          // const articlesPages = articlesResponse.headers['x-wp-totalpages']
          // let articlesArray = articlesResponse.data
          // for (let i = 2; i <= articlesPages; i++) {
          //   const nextPage = await axios.get(
          //     `${api}/wp/v2/article-archives?per_page=100&page=${i}`
          //   )
          //   articlesArray = [...articlesArray, ...nextPage.data]
          // }
          // const articles = articlesArray.map(article => '/article-archives/' + article.slug)

          // Get All Team Posts
          const teamResponse = await axios.get(`${api}/wp/v2/team?per_page=100`)
          const teamPages = teamResponse.headers['x-wp-totalpages']
          let teamArray = teamResponse.data
          for (let i = 2; i <= teamPages; i++) {
            const nextPage = await axios.get(
              `${api}/wp/v2/team?per_page=100&page=${i}`
            )
            teamArray = [...teamArray, ...nextPage.data]
          }
          const team = teamArray.map(member => '/team/' + member.slug)

          // Get All Career Posts
          const careersResponse = await axios.get(`${api}/wp/v2/careers?per_page=100`)
          const careersPages = careersResponse.headers['x-wp-totalpages']
          let careersArray = careersResponse.data
          for (let i = 2; i <= careersPages; i++) {
            const nextPage = await axios.get(
              `${api}/wp/v2/careers?per_page=100&page=${i}`
            )
            careersArray = [...careersArray, ...nextPage.data]
          }
          const careers = careersArray.map(member => '/careers/' + member.slug)

          return [...team, ...careers]
        } catch (e) {
          console.error('GENERATE ROUTES API: ' + e)
        }
      }
    },
    head: siteHead(meta),
    globalName: 'globalContent',
    loading: { color: '#fff' },
    components: {
      dirs: [
        '~/components',
        '~/components/custom',
        '~/components/block',
        '~/components/hero'
      ]
    },
    polyfill: {
      features: [
        {
          require: 'intersection-observer',
          detect: () => 'IntersectionObserver' in window
        }
      ]
    },
    plugins: [
      '~/resources/components',
      '~/resources/mixins',
      '~/resources/vendors.js',
      '~/resources/amplify.js',
      {
        src: '~/resources/vendors.client.js',
        mode: 'client'
      }
    ],
    modules: [
      '@nuxtjs/axios',
      '@nuxtjs/style-resources',
      'nuxt-webfontloader',
      '@nuxtjs/robots',
      '@nuxtjs/sitemap',
      'nuxt-polyfill',
      '@nuxtjs/gtm'
    ],
    robots: setRobots,
    sitemap: siteMap,
    css: [
      { src: '~/styles/static/normalize.sass', lang: 'sass' },
      { src: '~/styles/index.sass', lang: 'sass' }
    ],
    styleResources: {
      sass: [
        '~/styles/base/*.sass',
        '~/styles/utilities/*.sass',
        '~/styles/grid/*.sass'
      ]
    },
    stylelint: {
      files: [
        'styles/*.sass',
        'styles/**/*.sass',
        'components/**/*.sass',
        'components/**/**/*.sass'
      ]
    },
    webfontloader: webFonts,
    buildModules: [
      '@nuxtjs/eslint-module',
      '@nuxtjs/stylelint-module',
      'nuxt-gsap-module'
    ],
    gsap: {
      extraPlugins: {
        scrollTo: true,
        scrollTrigger: true
      },
      clubPlugins: {
        customEase: true
      },
      extraEases: {
        customEase: true
      }
    },
    vue: {
      config: {
        productionTip: false
      }
    },
    build: buildConfig
  }
}
