export default (size) => {
  if (size) {
    size = parseInt(size)
    if (!isNaN(size) && size > 1024) {
      var suffix = ' KB'
      size = size / 1024
      if (size >= 1024) {
        size = size / 1024
        suffix = ' MB'
      }
      size = Math.round(size * 10) / 10
      return size + suffix
    } else {
      return ' 1kB'
    }
  }
  return ' 0kB'
}
