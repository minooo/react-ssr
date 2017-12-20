import React from 'react'
import { ActiveLink } from '@components'

const config = [
  { ico: 'i-home', text: '首页' },
  { ico: 'i-loan', text: '贷款' },
  { ico: 'i-card', text: '信用卡' },
  { ico: 'i-user', text: '我的' },
]

export default () => (
  <div style={{ position: 'relative', zIndex: 5 }} className="flex h110 ai-stretch bg-white border-top-shadow">
    {
      config.map(item => ({

      }))
    }
  </div>
)
