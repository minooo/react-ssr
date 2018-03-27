import Head from 'next/head'
import React from 'react'
import { Toast } from 'antd-mobile'
import { setConfig, http, isIOS, isAndroid, setCookie, getCookie, delCookie } from '@utils'

export default class extends React.Component {
  componentDidMount() {
    if (isAndroid()) { this.setConfig() }
    if (isIOS() && !getCookie('isIOS')) {
      setCookie('isIOS', 1)
      this.setConfig()
    }
  }

  componentWillUnmount() {
    delCookie('isIOS')
  }

  setConfig = () => {
    http.get('wxconfig').then((response) => {
      if (response.code === 200 && response.success) {
        const { wxconfig } = response.data
        setConfig(wxconfig)
      } else {
        Toast.fail(response.msg ? response.msg : '获取异常，请稍后再试。')
      }
    }).catch(() => { Toast.offline('网络异常，请稍后再试！') })
  }
  render() {
    const { title, children } = this.props
    return (
      <div className="box bg-body h-full flex column overflow-y" style={{ touchAction: 'none' }}>
        <Head>
          <title>{ title }</title>
        </Head>
        { children }
      </div>
    )
  }
}

// export default ({ children, title = 'This is the default title' }) => (
//   <div className="box bg-body h-full flex column" style={{ touchAction: 'none' }}>
//     <Head>
//       <title>{ title }</title>
//     </Head>
//     { children }
//   </div>
// )
