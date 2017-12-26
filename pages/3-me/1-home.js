import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import Router from 'next/router'
import cookie from 'cookie'
import reduxPage from '@reduxPage'
import { getOut, getUser } from '@actions'
import { http } from '@utils'
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
@connect(({ user }) => ({ user }), { getUser })

export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const {
      store, req, res,
    } = ctx

    if (req) {
      const reqCookie = req.headers.cookie
      const token = cookie.parse(String(reqCookie)).userToken
      if (!token) {
        try {
          const userFetch = await http.get('user_info', { token })
          if (userFetch.data && userFetch.data.user) {
            store.dispatch(getUser(userFetch.data.user))
            return { res: util.inspect(ctx) }
          }
        } catch (error) {
          const err = util.inspect(error)
          return { err }
        }
      } else {
        return { redirect: true }
      }
    } else {
      const docCookie = document.cookie
      const token = cookie.parse(String(docCookie)).userToken
      if (token) {
        try {
          const userFetch = await http.get('user_info', { token })
          if (userFetch.data && userFetch.data.user) {
            store.dispatch(getUser(userFetch.data.user))
          }
        } catch (error) {
          const err = util.inspect(error)
          return { err }
        }
      } else {
        Router.replace({ pathname: '/3-me/2-login', query: { href: '/3-me/1-home', as: '/me' } }, '/login')
      }
    }
  }

  componentDidMount() {
    if (this.props.redirect) {
      Router.replace({ pathname: '/3-me/2-login', query: { href: '/3-me/1-home', as: '/me' } }, '/login')
    }
  }

  render() {
    const { user, err } = this.props
    const list = [
      // { ico: 'i-me c-main', text: ['个人资料', '修改完善'], path: '/me' },
      { ico: 'i-my-like c-me-star', text: ['我的收藏', ''], path: '/me/favorite' },
      { ico: 'i-browsing-history c-second', text: ['浏览记录', ''], path: '/me/history' },
      // { ico: 'i-invite c-me-invite', text: ['邀请好友', ''], path: '/me' },
      { ico: 'i-about c-me-about', text: ['关于我们', ''], path: '/me/about' },
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
            <div className="w84 h84 circle overflow-h log-bg">
              <img src={user.avatar ? user.avatar : 'https://public.duduapp.net/finance/static/img/login.gif'} className="h-100" alt="" />
            </div>
            <div className="font28 bold c-white lh100 pt30">{user.name ? user.name : user.phone}</div>
          </div>

          <div className="pt10 pl25">
            {
              list.map(item => (
                <WrapLink
                  key={uuid()}
                  className="h92 flex ai-center jc-between border-bottom pr25"
                  path={item.path}
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
              path="/me/feedback"
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
