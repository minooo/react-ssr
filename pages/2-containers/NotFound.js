import React from 'react'
import { WrapLink } from '@components'

export default () => (
  <div className="flex column jc-center ai-center" style={{ height: '100vh' }}>
    <span className="font-26">404!页面没有找到，请</span>
    <WrapLink path="/search" as="/" className="font-36 c-main">返回首页</WrapLink>
  </div>
)
