export default function (to, from, savedPosition) {
  if (from.path.includes('/thought-leadership') && to.path.includes('/thought-leadership')) {
    return savedPosition
  }
  return { x: 0, y: 0 }
}
