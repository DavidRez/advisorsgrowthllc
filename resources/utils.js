export const setMeta = (props) => {
  return {
    title: props.meta_title ? props.meta_title : props.title,
    meta: [
      props.meta_description && { hid: 'description', name: 'description', content: props.meta_description },
      props.meta_keywords && { hid: 'keywords', name: 'keywords', content: props.meta_keywords }
    ]
  }
}
