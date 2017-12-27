import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import cookie from 'cookie'
import { TextareaItem, Toast } from 'antd-mobile'
import reduxPage from '@reduxPage'
import { http } from '@utils'
import { getUser } from '@actions'
import {
  Layout,
  ErrorFetch,
  Btn,
} from '@components'

const util = require('util')
@reduxPage
@connect(({ user }) => ({ user }))

export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const {
      store, req, res,
    } = ctx

    if (req) {
      const reqCookie = req.headers.cookie
      const token = cookie.parse(String(reqCookie)).userToken
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
        res.writeHead(301, {
          Location: '/login',
        })
        res.end()
        res.finished = true
      }
    } else if (!req && !store.getState().user) {
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
        Router.replace({ pathname: '/3-me/2-login', query: { href: '/3-me/6-feedback', as: '/me/feedback' } }, '/login')
      }
    }
    return null
  }
  state = { disable: true }
  onChange = (v) => {
    const val = v.trim()
    this.setState(() => ({ disable: !val }))
  }

  onSubmit = () => {
    const { disable } = this.state
    const content = this.textarea.state.value.trim()
    const docCookie = document.cookie
    const token = cookie.parse(String(docCookie)).userToken
    if (disable) return
    Toast.loading('提交中...')
    http.post('feedback', { content, token }).then((response) => {
      if (response.code === 200 && response.success) {
        Toast.success('您的意见我们已收到!', 2, () => {
          Router.replace('/')
        })
      } else {
        Toast.fail(`抱歉，请求异常。${response.msg}`)
      }
    }).catch(() => { Toast.offline('抱歉，网络错误，请稍后再试。') })
  }
  render() {
    const { disable } = this.state
    const { err } = this.props
    if (err) {
      return <ErrorFetch err={err} />
    }
    return (
      <Layout title="意见反馈">
        <div className="plr20 pt15 pb30">
          <div className="r10 overflow-h">
            <TextareaItem
              ref={ele => this.textarea = ele}
              rows={5}
              count={100}
              onChange={this.onChange}
              placeholder="亲，请留下您的宝贵意见。"
            />
          </div>
        </div>
        <Btn
          ver
          btnClass={`r8 h72 mr25 ml25 ${!disable ? 'bg-main' : 'bg-ccc'}`}
          con={<span className="font30 c-white">提交</span>}
          onClick={this.onSubmit}
        />
      </Layout>
    )
  }
}
