import React, { Component } from 'react'
import { Toast } from 'antd-mobile'
import Router from 'next/router'
import cookie from 'cookie'
import { Layout, ErrorFetch, DetailFoot, NoDataIco } from '@components'
import { http, imgUrl, getUrlLastStr } from '@utils'

const util = require('util')

export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { req, asPath } = ctx
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
      const loanDetailFetch = await http.get(`card_detail/${getUrlLastStr(asPath)}`, (token ? { token } : null), !!req)
      const { success, code, msg } = loanDetailFetch
      const { favorited, detail } = loanDetailFetch.data
      return {
        favorited, detail, success, code, msg,
      }
    } catch (error) {
      const err = util.inspect(error)
      return { err }
    }
  }
  state = {
    favorited: false,
  }
  componentDidMount() {
    if (this.props.detail) {
      this.setMyState()
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.detail && nextProps.detail) {
      this.setMyState()
    }
  }
  // 收藏
  onLike = () => {
    const { detail } = this.props
    const allCookie = document.cookie
    const token = cookie.parse(String(allCookie)).userToken
    Toast.loading('处理中')
    http.put(
      'toggling_collect',
      { type: 2, type_id: detail.id, token },
    ).then((response) => {
      Toast.hide()
      if (response.code === 200 && response.success) {
        this.setState(pre => ({ favorited: !pre.favorited }))
      } else {
        Toast.info('当前操作需要登录哦，页面即将跳转', 2, () => {
          Router.replace({ pathname: '/3-me/2-login', query: { href: '/2-card/3-detail', as: `/card/${detail.id}` } }, '/login')
        })
      }
    }).catch(() => { Toast.offline('抱歉，网络错误，请稍后再试！') })
  }

  // 申请
  onApply = () => {
    const { detail } = this.props
    const allCookie = document.cookie
    const token = cookie.parse(String(allCookie)).userToken

    http.get('user_info', { token }).then((response) => {
      if (response.code === 200 && response.success) {
        // 记录申请的接口
        http.post(`apply/1/${detail.id}`).then(() => {
          Toast.hide()
          window.location.href = detail.external_links
        }).catch(() => { window.location.href = detail.external_links })
      } else {
        Toast.info('当前操作需要登录哦，页面即将跳转', 2, () => {
          Router.replace({ pathname: '/3-me/2-login', query: { href: '/1-loan/2-detail', as: `/loan/${detail.id}` } }, '/login')
        })
      }
    }).catch(() => { Toast.offline('抱歉，网络错误，请稍后再试！') })
  }
  setMyState = () => {
    const { favorited } = this.props
    this.setState(() => ({ favorited }))
  }

  render() {
    const { favorited } = this.state
    const {
      err, detail, success, code, msg,
    } = this.props
    if (err) return <ErrorFetch err={err} />
    if (!success || code !== 200) return <NoDataIco ico="i-search" text={msg || '数据获取失败'} />
    if (!detail) return null
    return (
      <Layout title={detail.name || '信用卡详情'}>
        <div className="equal overflow-y">
          <div
            style={{ height: '40vw', maxHeight: '4rem' }}
            className="card-detail-bg bg-white flex jc-center ai-center"
          >
            <div className="card-detail-top log-bg">
              <img src={imgUrl(detail.images)} className="h-100" alt="" />
            </div>
          </div>

          <div className="plr20 ptb15 bg-white">
            <div className="font30 bold c333 lh120 mb10">{detail.name || '标题'}</div>
            <div className="font24 c999 lh120">{detail.description || '描述'}</div>
          </div>
          <div className="h20" />

          <div className="pt25 pb10 bg-white">
            <div className="card-title font30 bold c333 pl20 h36">基本信息</div>
          </div>
          <div className="plr25 pb15 bg-white">
            {
              detail.organization &&
              <div className="flex ptb15">
                <div className="w130 font28 c999 equal-no">发卡组织:</div>
                <div className="font28 c333">{detail.organization}</div>
              </div>
            }
            <div className="flex ptb15">
              <div className="w130 font28 c999 equal-no">币<span className="c-white">彩蛋</span>种:</div>
              <div className="font28 c333">{detail.currency || '人民币'}</div>
            </div>
            {
              detail.level &&
              <div className="flex ptb15">
                <div className="w130 font28 c999 equal-no">等<span className="c-white">彩蛋</span>级:</div>
                <div className="font28 c333">{detail.level}</div>
              </div>
            }
            {
              detail.free_of_interest_period &&
              <div className="flex ptb15">
                <div className="w130 font28 c999 equal-no">免&nbsp;&nbsp;息&nbsp;&nbsp;期:</div>
                <div className="font28 c333">{detail.free_of_interest_period}</div>
              </div>
            }
          </div>
          <div className="h20" />

          <div className="pt25 pb20 bg-white">
            <div className="card-title font30 bold c333 pl20 h36">优惠特权</div>
          </div>
          <div className="plr25 pb25 bg-white font28 c333">
            {
              detail.privilege ?
                <div className="lh150" dangerouslySetInnerHTML={{ __html: detail.privilege }} />
                : '即将来袭，敬请期待！'
            }
          </div>
          <div className="h20" />

          <div className="pt25 pb10 bg-white">
            <div className="card-title font30 bold c333 pl20 h36">费用信息</div>
          </div>
          <div className="plr25 pb15 bg-white">
            {
              detail.yearFee &&
              <div className="flex ptb15">
                <div className="w160 font28 c999 equal-no">年<span className="c-white">大彩蛋</span>费:</div>
                <div className="font28 c333">{detail.yearFee}</div>
              </div>
            }
            {
              detail.cash_withdrawal_ratio &&
              <div className="flex pt15 pb10">
                <div className="w160 font28 c999 equal-no">提<span className="c-white">大彩蛋</span>现:</div>
                <div className="font28 c333">{detail.cash_withdrawal_ratio}%</div>
              </div>
            }
            {
              detail.repayment_staging &&
              <div className="flex pt15 pb10">
                <div className="w160 font28 c999 equal-no lh150">还款及分期:</div>
                <div className="font28 c333 lh150">{detail.repayment_staging}</div>
              </div>
            }
            <div className="flex ptb15">
              <div className="w160 font28 c999 equal-no lh150">积&nbsp;分&nbsp;规&nbsp;则:</div>
              <div className="font28 c333 lh150">{detail.integral_rule || '近期推出'}</div>
            </div>
          </div>
          <div className="h20" />

        </div>
        <DetailFoot isFavorite={favorited} onLike={this.onLike} onApply={this.onApply} />
      </Layout>
    )
  }
}
