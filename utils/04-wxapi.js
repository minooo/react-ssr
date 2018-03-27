// 思考，把配置信息缓存
export const setConfig = (config) => {
  wx.config(config)
}
export const setShare = (config) => {
  const params = {
    title: config.title || '',
    desc: config.desc || '',
    imgUrl: config.imgUrl || 'http://public.duduapp.net/finance/static/logo.png',
    link: config.link || window.location.href,
  }
  wx.ready(() => {
    wx.onMenuShareAppMessage(params) // 分享给朋友
    wx.onMenuShareQQ(params) // 分享到QQ
    wx.onMenuShareWeibo(params) // 分享到腾讯微博
    wx.onMenuShareQZone(params) // 分享到QQ空间
    wx.onMenuShareTimeline(Object.assign({}, params, {
      title: `${params.title} ${params.desc}`,
    })) // 分享到朋友圈
  })
}
