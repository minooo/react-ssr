const setItem = (key, v, overtime = 30 * 24 * 60 * 60 * 1000) => {
  const val = {
    value: v,
    overtime: Date.now() + overtime,
  }
  localStorage.setItem(key, JSON.stringify(val))
  console.info(`已经设置缓存字段：${key}，值为：${val.value}`)
}

const getItem = (key) => {
  if (localStorage.getItem(key) && JSON.parse(localStorage.getItem(key)).overtime > Date.now()) {
    return JSON.parse(localStorage.getItem(key)).value
  }
  return null
}

const removeItem = (key) => {
  localStorage.removeItem(key)
  console.info(`已经删除缓存字段：${key}`)
}

export default {
  setItem,
  getItem,
  removeItem,
}
