export default function (to, from, savedPosition) {
  if (from.path.includes('/thought-leadership') && to.path.includes('/thought-leadership')) {
    return savedPosition
  }

  return { x: 0, y: 0 }
}
// export default function (to, from, savedPosition) {
//   // the navigation class needs to be adjusted per project based on the nav placement and height
//   const navOffset = document.querySelector('.navigation').offsetTop
//   let topDistance = 0

//   if (from.path.includes('/thought-leadership') && to.path.includes('/thought-leadership')) {
//     return savedPosition
//   }

//   // the following fires off when navigating to a hash on the same page
//   if (to.hash && document.querySelector(to.hash)) {
//     let elem = document.querySelector(to.hash)
//     // makes sure that the correct offsetTop is calculated
//     while (elem) {
//       topDistance += elem.offsetTop
//       elem = elem.offsetParent
//     }
//     topDistance = topDistance < 0 ? 0 : topDistance
//     return window.scrollTo({
//       top: topDistance - navOffset,
//       behavior: 'smooth'
//     })
//   }
//   // the following fires off when navigating to a different page
//   return new Promise((resolve) => {
//     this.app.$root.$once('triggerScroll', () => {
//       // the following fires off when navigating to a hash on a different page
//       if (to.hash && document.querySelector(to.hash)) {
//         let elem = document.querySelector(to.hash)
//         // makes sure that the correct offsetTop is calculated
//         while (elem) {
//           topDistance += elem.offsetTop
//           elem = elem.offsetParent
//         }
//         topDistance = topDistance < 0 ? 0 : topDistance
//         // can increase or decrease scroll delay as needed
//         setTimeout(() => {
//           window.scrollTo({
//             top: topDistance - navOffset - 50,
//             behavior: 'smooth'
//           })
//         }, 750)
//       }
//       resolve({ y: 0 })
//     })
//   })
// }
