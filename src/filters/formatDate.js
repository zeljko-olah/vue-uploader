export default (value) => {
  const date = new Date(value)
  // TOLOCALESTRING METHOD ON DATE OBJECT TO FORMAT DATE - LIMITED SUPPORT
  return date.toLocaleString(['en-US'], { month: 'short', day: '2-digit', year: 'numeric' })
}
