import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import Router from 'next/router'
import cookie from 'cookie'
import reduxPage from '@reduxPage'
import { getOut, getUser } from '@actions'
import { http, delCookie } from '@utils'
import {
  Layout,
  Nav,
  Btn,
  WrapLink,
  MultiColorIco,
  ErrorFetch,
} from '@components'

const util = require('util')
@reduxPage
@connect(({ user }) => ({ user }), { getUser, getOut })

export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const {
      store, req, res, isServer,
    } = ctx
    if (!store.getState().user) {
      try {
        let allCookie
        let token
        if (req) {
          allCookie = req.headers.cookie
          token = cookie.parse(String(allCookie)).userToken
        } else {
          allCookie = document.cookie
          token = cookie.parse(String(allCookie)).userToken
        }

        // 检测token是否有效
        const response = await http.get('user_info', { token }, isServer)
        if (response.code === 200 && response.success) {
          store.dispatch(getUser(response.data.user))
        } else {
          if (res) {
            res.writeHead(301, {
              Location: '/login',
            })
            res.end()
            res.finished = true
          }
          if (!res) {
            Router.replace('/3-me/2-login', '/login')
          }
        }
      } catch (error) {
        const err = util.inspect(error)
        return { err }
      }
    }
    return null
  }

  onLogout = () => {
    const { getOut } = this.props
    delCookie('userToken')
    getOut()
    Router.replace('/3-me/2-login', '/login')
  }

  render() {
    const { user, err } = this.props
    const list = [
      { ico: 'i-me c-main', text: ['个人资料', '修改完善'], href: '/3-me/7-myData', as: '/me/data' }, // eslint-disable-line
      { ico: 'i-my-like c-me-star', text: ['我的收藏', ''], href: '/3-me/3-favorite', as: '/me/favorite' }, // eslint-disable-line
      { ico: 'i-browsing-history c-second', text: ['浏览记录', ''], href: '/3-me/4-history', as: '/me/history' }, // eslint-disable-line
      // { ico: 'i-invite c-me-invite', text: ['邀请好友', ''], as: '/me' },
      { ico: 'i-about c-me-about', text: ['关于我们', ''], href: '/3-me/5-about', as: '/me/about' }, // eslint-disable-line
    ]
    if (err) {
      return <ErrorFetch err={err} />
    }
    if (!user) return null
    return (
      <Layout title="个人中心">
        <div className="equal bg-white">
          <div
            style={{ height: '2.46rem' }}
            className="relative flex column jc-center ai-center bg-main"
          >
            {/* <Btn
              style={{ position: 'absolute', top: '0.2rem', right: '0.35rem' }}
              path="/me/set"
              icoClass="i-set font38 c-white"
            /> */}
            <div className="w84 h84 circle overflow-h me-logo" />
            <div className="font28 bold c-white lh100 pt30">{user.name ? user.name : user.phone}</div>
          </div>

          <div className="pt10 pl25">
            {
              list.map(item => (
                <WrapLink
                  key={uuid()}
                  className="h92 flex ai-center jc-between border-bottom pr25"
                  href={item.href}
                  as={item.as}
                >
                  <div className="flex ai-center">
                    <i className={`${item.ico} font30 mr10`} />
                    <span className="font28 c333">{item.text[0]}</span>
                  </div>
                  <div className="flex ai-center">
                    <span className="font24 c999">{item.text[1]}</span>
                    <i className="i-right font18 ml10" />
                  </div>
                </WrapLink>
              ))
            }
            <WrapLink
              className="h92 flex ai-center jc-between border-bottom pr25"
              href="/3-me/6-feedback"
              as="/me/feedback"
            >
              <div className="flex ai-center">
                <MultiColorIco ico="i-feedback font30 mr10" num={3} />
                <span className="font28 c333">意见反馈</span>
              </div>
              <div className="flex ai-center">
                <i className="i-right font18 ml10" />
              </div>
            </WrapLink>
          </div>

          <div className="h20 bg-body" />
          <div className="pl25">
            <Btn
              ver
              btnClass="border-bottom-one h82"
              con={<span className="font24 c-main">退出登录</span>}
              onClick={this.onLogout}
            />
          </div>
        </div>
        <Nav />
      </Layout>
    )
  }
}
