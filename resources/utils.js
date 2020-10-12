import axios from 'axios'
import { api } from './api'

export const setData = async (slug, customPostType = 'pages') => {
  try {
    const response = await axios.get(
      `${api}/wp/v2/${customPostType}?slug=${slug}`
    )

    const data = {
      aioseo_title: response.data[0]._aioseop_title,
      aioseo_description: response.data[0]._aioseop_description,
      aioseo_keywords: response.data[0]._aioseop_keywords,
      title: response.data[0].title.rendered,
      ...response.data[0].acf
    }
    return { ...data }
  } catch (e) {
    console.error(`${slug} page: ${e}`)
  }
}

export const setMeta = (meta) => {
  return {
    title: meta.aioseo_title ? meta.aioseo_title : meta.title,
    meta: [
      meta.aioseo_description && { hid: 'description', name: 'description', content: meta.aioseo_description },
      meta.aioseo_keywords && { hid: 'keywords', name: 'keywords', content: meta.aioseo_keywords }
    ]
  }
}
