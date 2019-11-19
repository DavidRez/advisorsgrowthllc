export default {
  mode: 'universal',
  server: {
    port: 4949,
    host: '0.0.0.0',
  },
  /*
  ** Headers of the page
  */
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        path: '/',
        name: 'Home',
        meta: [ 'navigation', 'footer', 'dev', ],
        component: resolve(__dirname, 'pages/index.vue'),
      })
      routes.push({
        path: '/style-guide',
        name: 'Style Guide',
        meta: [ 'navigation', 'footer', 'dev', ],
        component: resolve(__dirname, 'pages/index.vue'),
      })
    },
  },
  head: {
    title: 'RG Media Nuxtjs Boilerplate',
    meta: [
      { charset: 'utf-8', },
      { name: 'viewport', content: 'width=device-width, initial-scale=1', },
      { hid: 'description', name: 'description', content: 'A magnificent Boilerplate, static sites ftw.', },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff', },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/resources/components',
    '~/resources/mixins',
    '~/resources/vendors.js',
    {
      src: '~/resources/vendors.client.js',
      mode: 'client',
    },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
  ],
  webfontloader: {
    google: {
      families: [ 'Lato:400,700', ],
    },
  },
  styleResources: {
    sass: [
      '~/styles/base/*.sass',
      '~/styles/utilities/*.sass',
      '~/styles/utilities/grid/*.sass',
      '~/styles/utilities/extensions/*.sass',
      '~/styles/utilities/mixins/*.sass',
    ],
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.module.rules
        .filter(moduleRules => moduleRules.test.toString().includes('svg'))
        .forEach((rule) => { rule.test = /\.(png|jpe?g|gif)$/ })
      // urlLoader.test = /\.(png|jpe?g|gif)$/
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        exclude: /node_modules/,
      })
    },
  },
}
