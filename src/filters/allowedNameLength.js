export default (name, allowedLength = 30) => {
  let allowedName = name.split('').slice(0, allowedLength).join('')

  return allowedName.length >= allowedLength ? allowedName + '...' : allowedName
}
