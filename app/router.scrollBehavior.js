export default function (to, from, savedPosition) {
  if (from.path.includes('/thought-leadership') && to.path.includes('/thought-leadership')) {
    return savedPosition
  }

  if (to.hash) {
    return {
      selector: to.hash,
      behavior: 'smooth'
    }
  }

  return { x: 0, y: 0 }
}
