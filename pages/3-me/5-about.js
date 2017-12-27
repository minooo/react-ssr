import React, { Component } from 'react'
import { Layout } from '@components'

export default class extends Component {
  state = { about: null }
  render() {
    const { about } = this.state
    return (
      <Layout title="关于我们">
        <div className="plr25 ptb30 bg-white">
          {about || '嘟嘟钱包是一家集贷款/信用卡办理平台。。。。。嘟嘟钱包是一家集贷款/信用卡办理平台。。。。。'}
        </div>
      </Layout>
    )
  }
}
