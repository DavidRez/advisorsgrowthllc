import axios from 'axios'
import { api } from './api'

export const postFetchHelper = async (slug, customPostType = 'pages') => {
  try {
    const response = await axios.get(
      `${api}/wp/v2/${customPostType}?slug=${slug}`
    )

    const data = {
      _aioseo_title: response.data[0]._aioseop_title,
      description: response.data[0]._aioseop_description,
      keywords: response.data[0]._aioseop_keywords,
      title: response.data[0].title.rendered,
      ...response.data[0].acf
    }
    return { ...data }
  } catch (e) {
    console.error(`${slug} page: ${e}`)
  }
}

export const setMeta = (content) => {
  return {
    title: content._aioseo_title ? content._aioseo_title : content.title,
    meta: [
      content.description && {
        hid: 'description',
        name: 'description',
        content: content.description
      },
      content.keywords && {
        hid: 'keywords',
        name: 'keywords',
        content: content.keywords
      }
    ]
  }
}
