// import lodash for throttle function
import _ from 'lodash'

export function positionUploadComponent () {
  // find footer height
  const footer = document.querySelector('#footer')
  let footerHeight = footer.getBoundingClientRect().height

  // find table component offset from top
  const tableComponentDOM = document.querySelector('#table')
  const tableTopOffset = tableComponentDOM.getBoundingClientRect().height

  // find upload component and set initial top offset
  const uploadComponentDOM = document.querySelector('#upload')
  let uploadCardComponent = uploadComponentDOM.childNodes[0].childNodes[0].childNodes[0]
  uploadCardComponent.style.top = window.innerHeight / 2 + 'px'

  // add scroll event listener to dinamically change upload component top offset
  window.addEventListener('scroll', _.throttle(function () {
    let bottomScroll = window.scrollY + window.innerHeight
    let distanceFromFooter = document.body.clientHeight - footerHeight
    if (bottomScroll >= distanceFromFooter) {
      uploadCardComponent.style.top = window.innerHeight / 8 + 'px'
    } else if (window.scrollY < tableTopOffset) {
      uploadCardComponent.style.top = window.innerHeight / 2 + 'px'
    }
  }, 500, { leading: true, trailing: true }))
}
