export default {
  mode: 'universal',
  server: {
    port: 4949,
    host: '0.0.0.0',
  },
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
  loading: { color: '#fff', },
  plugins: [
    '~/resources/components',
    '~/resources/mixins',
    '~/resources/vendors.js',
    {
      src: '~/resources/vendors.client.js',
      mode: 'client',
    },
  ],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
  ],
  css: [
    { src: '~/styles/static/buttons.sass', lang: 'sass', },
    { src: '~/styles/static/global-styles.sass', lang: 'sass', },
    { src: '~/styles/static/normalize.sass', lang: 'sass', },
    { src: '~/styles/static/transitions.sass', lang: 'sass', },
  ],
  styleResources: {
    sass: [
      '~/styles/*.sass',
      '~/styles/utilities/*.sass',
      '~/styles/utilities/grid/*.sass',
      '~/styles/utilities/mixins/*.sass',
    ],
  },
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
  ],
  stylelint: {
    files: [
      'styles/*.sass',
      'styles/**/*.sass',
      'styles/**/*.sass',
      'components/**/*.sass',
      'components/**/**/*.sass',
    ],
  },
  webfontloader: {
    google: {
      families: [ 'Raleway:400,500,600,700', ],
    },
  },
  axios: {
  },
  build: {
    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-url': {},
        'autoprefixer': {},
      },
    },
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
