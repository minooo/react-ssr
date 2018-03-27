import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import cookie from 'cookie'
import { Toast } from 'antd-mobile'
import uuid from 'uuid/v4'
import reduxPage from '@reduxPage'
import { getUser } from '@actions'
import { http, setShare } from '@utils'
import {
  ErrorFetch,
  Layout,
  ChangeList,
  Btn,
  NoDataIco,
  ProductList,
  WrapLink,
} from '@components'

const util = require('util')
@reduxPage
@connect(({ user }) => ({ user }), { getUser })

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
      const response2 = await http.get('want_loans', null, isServer)
      const wantLoan = response2.data
      if (response.code === 200 && response.success) {
        store.dispatch(getUser(response.data.user))
      } else {
        res.writeHead(301, {
          Location: '/login?href=/1-loan/3-goLoan&as=/loan/go',
        })
        res.end()
        res.finished = true
      }
      return { wantLoan }
    } catch (error) {
      const err = util.inspect(error)
      return { err }
    }
  }

  state = {
    purposeVal: '',
    timelimitVal: '',
    results: null,
    isResult: false,
  }
  componentWillMount() {
    if (this.props.err) {
      Router.replace({ pathname: '/3-me/2-login', query: { href: '/1-loan/3-goLoan', as: '/loan/go' } }, '/login')
    }
  }
  componentDidMount() {
    const { wantLoan } = this.props
    setShare({
      title: '贷款申请',
      desc: '按需贷款，就是这么简单',
      imgUrl: 'http://public.duduapp.net/finance/static/logo_head.png',
    })
    if (wantLoan) {
      this.setMyState(wantLoan)
    }
    this.initState()
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

  onSwitch = () => {
    this.setState(pre => ({ isResult: !pre.isResult }))
  }
  onSubmit = () => {
    const { purposeVal, timelimitVal } = this.state
    const allCookie = document.cookie
    const token = cookie.parse(String(allCookie)).userToken
    const { user } = this.props
    if (!this.loanSize.value || this.loanSize.value.split('').length > 10) {
      Toast.fail('您的贷款金额为空或者不合法，请重新输入！')
      this.loanSize.value = ''
      return
    }
    // 注意，，，这里只是测试
    if (!user.idNum || !user.name) {
      Toast.fail('您的资料不完整哦，请完善。', 2, () => {
        Router.replace({
          pathname: '/3-me/7-myData',
          query: {
            href: '/1-loan/3-goLoan',
            as: '/loan/go',
            money: this.loanSize.value,
            purposeVal,
            timelimitVal,
          },
        }, '/me/data')
      })
      return
    }
    http.post(`want_loans?token=${token}`, {
      money: this.loanSize.value,
      purpose_id: purposeVal,
      timelimit_id: timelimitVal,
      source: 1,
    }).then((response) => {
      Toast.hide()
      if (response.code === 200 && response.success) {
        const { res } = response.data
        this.setState(pre => ({
          isResult: !pre.isResult,
          results: res,
        }))
      } else {
        Toast.fail(response.msg ? response.msg : '获取异常，请稍后再试。')
      }
    }).catch(() => { Toast.offline('网络异常，请稍后再试！') })
  }
  setMyState = (prop) => {
    this.setState(() => ({ purposeVal: prop.purpose[0].id, timelimitVal: prop.timelimit[0].id }))
  }
  initState = () => {
    const { url: { query } } = this.props
    if (query.money) {
      const { money, purposeVal, timelimitVal } = query
      if (this.loanSize) { this.loanSize.value = money }
      this.setState(() => ({ purposeVal, timelimitVal }))
    }
  }
  render() {
    const {
      purposeVal, timelimitVal, results, isResult,
    } = this.state
    const { err, wantLoan, user } = this.props
    if (err) {
      return <ErrorFetch err={err} />
    }
    if (!wantLoan) return null
    return (
      <Layout title="我要贷">
        {
          !isResult &&
          <div className="h82 plr25 flex ai-center bg-light-yellow font26 c-second">
            <i className="i-tip font28 c-second mr10" />根据您的贷款需求，我们将为您智能匹配适合的产品
          </div>
        }
        {
          !isResult &&
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
        }
        {
          !isResult &&
          <Btn
            hor
            btnClass="bg-main r8 h72 ml25 mr25 mb20"
            con={<span className="c-white font30">提交</span>}
            onClick={this.onSubmit}
          />
        }
        {
          !isResult &&
          <WrapLink
            className="text-center font28 c999 mt10"
            href={{ pathname: '/3-me/7-myData', query: { href: '/1-loan/3-goLoan', as: '/loan/go' } }}
            as="/me/data"
          >
            {(user.idNum && user.name) ? '修改' : '完善'}个人资料
          </WrapLink>
        }
        {
          isResult &&
          <div className="equal overflow-y">
            {
              (results && results.length > 0) ?
                results.map(item => <ProductList key={uuid()} border {...item} />) :
                <NoDataIco ico="i-search" text="抱歉，暂无匹配结果" />
            }
          </div>
        }
        {
          isResult &&
          <Btn
            hor
            btnClass="bg-main r8 h72 ml25 mr25 mb20 mt20"
            con={<span className="c-white font30">重新搜索</span>}
            onClick={this.onSwitch}
          />
        }
      </Layout>
    )
  }
}
