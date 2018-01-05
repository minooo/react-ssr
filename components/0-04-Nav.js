import { ActiveLink } from '@components'
import uuid from 'uuid/v4'

const config = [
  {
    ico: 'i-home', text: '首页', href: '/index', as: '/',
  },
  {
    ico: 'i-loan', text: '贷款', href: '/1-loan/1-home', as: '/loan',
  },
  {
    ico: 'i-card', text: '信用卡', href: '/2-card/1-home', as: '/card',
  },
  {
    ico: 'i-user', text: '我的', href: '/3-me/1-home', as: '/me',
  },
]

export default () => (
  <div style={{ position: 'relative', zIndex: 5 }} className="flex h110 ai-stretch bg-white border-top-shadow">
    {config.map(item => <ActiveLink key={uuid()} {...item} />)}
  </div>
)
