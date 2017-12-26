// import lodash for throttle function
import _ from 'lodash'

export function positionUploadComponent () {
  // find footer height
  const footer = document.querySelector('#footer')
  let footerHeight = footer.getBoundingClientRect().height
  console.log(window.innerHeight)

  // find table component offset from top
  const tableComponentDOM = document.querySelector('#table')
  const tableTopOffset = tableComponentDOM.getBoundingClientRect().height
  console.log(tableTopOffset)

  // window ratio
  let ratio = window.innerHeight / window.innerWidth
  console.log(ratio)

  // find upload component and set initial top offset
  const uploadComponentDOM = document.querySelector('#upload')
  let uploadCardComponent = uploadComponentDOM.childNodes[0].childNodes[0].childNodes[0]

  // for ipad pro and similar devices where height is greater than width in potrait
  if (ratio > 0.8) {
    uploadCardComponent.style.top = (tableTopOffset + 130) + 'px'
  } else {
    window.addEventListener('scroll', _.throttle(function () {
      let bottomScroll = window.scrollY + window.innerHeight
      let distanceFromFooter = document.body.clientHeight - footerHeight
      if (bottomScroll >= distanceFromFooter && ratio < 0.8 && window.innerWidth < 1265) {
        uploadCardComponent.style.top = window.innerHeight / 10 + 'px'
        // uploadCardComponent.style.top = (window.innerHeight - footerHeight * 1.8) + 'px'
      } else if (window.scrollY < tableTopOffset && window.innerWidth > 1264) {
        uploadCardComponent.style.top = window.innerHeight / 2.5 + 'px'
      } else {
        uploadCardComponent.style.top = window.innerHeight / 5 + 'px'
      }
    }, 500, { leading: true, trailing: true }))
  }
  // add scroll event listener to dinamically change upload component top offset
}
