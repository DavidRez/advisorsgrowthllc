export const setMeta = (props) => {
  return {
    title: props.aioseop_title ? props.aioseop_title : props.title,
    meta: [
      props.aioseop_description && { hid: 'description', name: 'description', content: props.aioseop_description },
      props.aioseop_keywords && { hid: 'keywords', name: 'keywords', content: props.aioseop_keywords }
    ]
  }
}
