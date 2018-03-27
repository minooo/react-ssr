import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import cookie from 'cookie'
import { TextareaItem, Toast } from 'antd-mobile'
import reduxPage from '@reduxPage'
import { http, setShare } from '@utils'
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
      store, req, res, isServer,
    } = ctx
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
        res.writeHead(301, {
          Location: '/login',
        })
        res.end()
        res.finished = true
      }
    } catch (error) {
      const err = util.inspect(error)
      return { err }
    }
    return null
  }
  state = { disable: true }
  componentWillMount() {
    if (this.props.err) {
      Router.replace({ pathname: '/3-me/2-login', query: { href: '/3-me/6-feedback', as: '/me/feedback' } }, '/login')
    }
  }
  componentDidMount() {
    setShare({
      title: '反馈',
      desc: '欢迎您的建议',
    })
  }
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
          Router.replace('/index', '/')
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
