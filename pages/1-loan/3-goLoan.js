import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import cookie from 'cookie'
import { Toast } from 'antd-mobile'
import reduxPage from '@reduxPage'
import { getUser } from '@actions'
import { http } from '@utils'
import {
  ErrorFetch,
  Layout,
  SwitchList,
  ChangeList,
  Btn,
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
        const response = await http.get('user_info', { token })
        const response2 = await http.get('want_loans')
        const wantLoan = response2.data
        if (response.code === 200 && response.success) {
          store.dispatch(getUser(response.data.user))
        } else {
          if (res) {
            res.writeHead(301, {
              Location: '/login?href=/1-loan/3-goLoan&as=/loan/go',
            })
            res.end()
            res.finished = true
          }
          if (!res) {
            Router.replace({ pathname: '/3-me/2-login', query: { href: '/1-loan/3-goLoan', as: '/loan/go' } }, '/login')
          }
        }
        return { wantLoan }
      } catch (error) {
        const err = util.inspect(error)
        return { err }
      }
    } else {
      try {
        const response = await http.get('want_loans')
        const wantLoan = response.data
        return { wantLoan }
      } catch (error) {
        const err = util.inspect(error)
        return { err }
      }
    }
  }
  state = {
    purposeVal: 11,
    timelimitVal: 11,
  }

  componentDidMount() {
    const { wantLoan } = this.props
    if (wantLoan) {
      this.setMyState(wantLoan)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.wantLoan && nextProps.wantLoan) {
      this.setMyState(nextProps.wantLoan)
    }
  }

  onChange = (e, key) => {
    const v = e.target.value
    this.setState(() => ({ [key]: v }))
  }

  onSubmit = () => {
    const { purposeVal, timelimitVal } = this.state
    const { user } = this.props
    if (!this.loanSize.value) {
      Toast.fail('您的贷款金额为空或者不合法，请重新输入！')
      return
    }
    // if (!user.idNum || !user.name) {
    //   Toast.fail('您的资料不完整哦，请完善。', 2, () => {
    //     Router.replace({ pathname: '/3-me/7-myData', query: { href: '/1-loan/3-goLoan', as: '/loan/go' } }, '/me/data')
    //   })
    // }
    console.log(purposeVal, timelimitVal, this.loanSize.value)
  }

  setMyState = (prop) => {
    this.setState(() => ({ purposeVal: prop.purpose[0].id, timelimitVal: prop.timelimit[0].id }))
  }
  render() {
    const { purposeVal, timelimitVal } = this.state
    const { err, wantLoan } = this.props
    if (err) {
      return <ErrorFetch err={err} />
    }
    if (!wantLoan) return null
    return (
      <Layout title="我要贷">
        <div className="h82 plr25 flex ai-center bg-light-yellow font26 c-second">
          <i className="i-tip font28 c-second mr10" />根据您输入的贷款需求，我们将为您智能匹配适合您的产品
        </div>
        <div className="pl25 bg-white mb25">
          <div className="h80 border-bottom flex jc-between ai-center">
            <div className="font28 c666">贷款金额</div>
            <input
              type="number"
              placeholder="请输入您要贷款的金额"
              ref={ele => this.loanSize = ele}
              className="block equal reset text-right pl30 pr5 font28 c-main"
            />
            <div className="c-main font28 pr30">元</div>
          </div>
          <ChangeList title="贷款用途" types={wantLoan.purpose} stateVal={purposeVal} keyVal="purposeVal" onChange={this.onChange} />
          <ChangeList title="贷款期限" types={wantLoan.timelimit} stateVal={timelimitVal} keyVal="timelimitVal" onChange={this.onChange} />
        </div>
        <Btn
          hor
          btnClass="bg-main r8 h72 ml25 mr25 mb20"
          con={<span className="c-white font30">提交</span>}
          onClick={this.onSubmit}
        />
      </Layout>
    )
  }
}
