export const CALL_API = Symbol('Call API')

export const serializeParams = params => Object.entries(params).map(n => `${n[0]}=${n[1]}`).join('&')

export const isMobile = (mobile) => {
  if (!mobile) {
    return false
  }
  const m = mobile.replace(/ /g, '')
  return /^1[3|4|5|7|8]\d{9}$/.test(m) ? m : false
}

export const isIOS = () => /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)

export const isAndroid = () => /(Android)/i.test(navigator.userAgent)

export const setTitle = (title) => {
  document.title = title
  if (isIOS() && !window.__wxjs_is_wkwebview) { // eslint-disable-line
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = () => {
      setTimeout(() => {
        i.remove()
      }, 0)
    }
    document.body.appendChild(i)
  }
}

// 对价格的去0处理
export const clipPrice = (item) => {
  const re = /^\d+.?\d*$/
  const num = +item
  const str = num.toFixed(2)

  if (!re.test(item)) { throw new Error('传入的参数为非法数字，请检查！') }

  if (str.substr(-1) !== '0') {
    return str
  } else if (str.substr(-2) === '00') {
    return num.toFixed(0)
  }
  return num.toFixed(1)
}

// 大额数字转万 / 亿
export const clipBigNum = (item) => {
  const num = +item
  if (num >= 100000000) {
    const n1 = num / 100000000
    const n2 = parseInt(n1, 0)
    const s2 = (parseInt(num / 10000000, 0) / 10).toFixed(1)
    if (n1 === n2 || +s2 === n2) {
      return `${n2}亿`
    }
    return `${s2}亿`
  }
  if (num >= 10000) {
    const n1 = num / 10000
    const n2 = parseInt(n1, 0)
    const s2 = (parseInt(num / 1000, 0) / 10).toFixed(1)
    if (n1 === n2 || +s2 === n2) {
      return `${n2}万`
    }
    return `${s2}万`
  }
  return item
}

// 从数组中随机取出若干不同的元素
export const getSomeFromArr = (arr, num) => {
  if (!arr) return null
  if (arr.length <= num) { return arr }
  const oldArr = [...arr]
  const newArr = []
  function gg(array) {
    newArr.push(array.splice(Math.floor(Math.random() * array.length), 1)[0])
  }
  for (let i = 0; i < num; i += 1) { gg(oldArr) }
  return newArr
}


// search 转为 obj
export const searchToObj = () => {
  const { search } = window.location
  const obj = {}
  if (!search || search.length < 1) return null
  const arr = search.slice(1).split('&')
  arr.forEach((item) => {
    const itemArr = item.split('=')
    const key = itemArr[0]
    const val = itemArr[1]
    obj[key] = val
  })
  return obj
}

export const addDefault = (fromArr, toArr) => {
  toArr.forEach((item) => {
    const o1 = fromArr.find(x => x.key === item.key)
    item.list.unshift(o1)
  })
  return toArr
}

export const imgUrl = (str) => {
  if (!str) return ''
  if (str.indexOf('http') !== -1) {
    return str
  }
  return `http://jr.duduapp.net${str}`
}
