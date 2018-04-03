import React, { Component } from 'react'
import { setShare } from '@utils'
import { Layout } from '@components'

export default class extends Component {
  componentDidMount() {
    setShare({
      title: '嘟嘟e贷',
      desc: '关于我们',
    })
  }
  render() {
    return (
      <Layout title="关于我们">
        <div className="equal bg-white flex column ai-center relative">
          <div style={{ padding: '1.3rem 0 0.7rem' }} className="flex column ai-center">
            <div style={{ width: '1.8rem', height: '1.8rem' }} className="me-logo me-log-shadow mb20 r35" />
            <div style={{ width: '1.7rem' }} className="me-logo-text h36" />
          </div>
          <div className="relative flex jc-center w-100">
            <div className="about-line font30 c-white lh100">线</div>
            <div className="font30 c999 plr5 about-text bg-white relative z-index10 lh100">一站式专业贷款服务平台</div>
          </div>
        </div>
        <div className="bg-white text-center lh150 c333 font28">
          官方邮箱：xc@duduapp.net<br />
          商务合作：<a href="tel:13253595612">13253595612</a>
        </div>
        <div className="about-bg" />
      </Layout>
    )
  }
}
