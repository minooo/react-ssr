import React, { Component } from 'react'
import Chart from 'chart.js'
import uuid from 'uuid/v4'
import Router from 'next/router'
import cookie from 'cookie'
import { Toast, InputItem, Picker } from 'antd-mobile'
import { imgUrl, http, clipPrice, clipBigNum, getUrlLastStr } from '@utils'
import { Layout, ErrorFetch, DetailFoot, Btn, MultiColorIco, NoDataIco } from '@components'

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
      const loanDetailFetch = await http.get(`loans_detail/${getUrlLastStr(asPath)}`, (token ? { token } : null), !!req)
      const { success, code, msg } = loanDetailFetch
      const { favorited, detail, apply_flowpath } = loanDetailFetch.data // eslint-disable-line
      return {
        favorited, detail, apply_flowpath, success, code, msg, asPath,
      }
    } catch (error) {
      const err = util.inspect(error)
      return { err }
    }
  }
  state = {
    favorited: false,
    applyFlowpath: null,
    selectVal: '',
    minMoney: 0,
    maxMoney: 0,
    money: 0,
    finalMoney: 0,
    rate: 0,
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
      { type: 1, type_id: detail.id, token },
    ).then((response) => {
      Toast.hide()
      if (response.code === 200 && response.success) {
        this.setState(pre => ({ favorited: !pre.favorited }))
      } else {
        Toast.info('当前操作需要登录哦，页面即将跳转', 2, () => {
          Router.replace({ pathname: '/3-me/2-login', query: { href: '/1-loan/2-detail', as: `/loan/${detail.id}` } }, '/login')
        })
      }
    }).catch(() => { Toast.offline('抱歉，网络错误，请稍后再试！') })
  }

  // 申请
  onApply = () => {
    const { detail, asPath } = this.props
    const allCookie = document.cookie
    const token = cookie.parse(String(allCookie)).userToken
    Toast.loading('处理中')
    http.get('user_info', { token }).then((response) => {
      if (response.code === 200 && response.success) {
        http.put(
          `loans_detail/${getUrlLastStr(asPath)}`,
          { token, apply: 1 },
        ).then(() => {
          Toast.hide()
          window.location.href = detail.external_links
        }).catch(() => {
          window.location.href = detail.external_links
        })
      } else {
        Toast.info('当前操作需要登录哦，页面即将跳转', 2, () => {
          Router.replace({ pathname: '/3-me/2-login', query: { href: '/1-loan/2-detail', as: `/loan/${detail.id}` } }, '/login')
        })
      }
    })
  }

  // 只是单纯的改变 input value
  onMoneyChange = (v) => {
    this.setState(() => ({ money: v }))
  }

  // 选择借款周期
  onSelectVal = (v) => {
    this.setState(() => ({ selectVal: v[0] }), () => {
      this.updateChart()
    })
  }

  onBlur = (v) => {
    const { minMoney, maxMoney } = this.state
    let finalMoney
    if (v > maxMoney) {
      finalMoney = maxMoney
    } else if (v < minMoney) {
      finalMoney = minMoney
    } else {
      finalMoney = v
    }
    // 由于目前利率和贷款量没有关系，所以利息到到账金额比例不会变，
    // 故没有必要执行 updateChart 函数
    this.setState(() => ({ money: finalMoney, finalMoney }))
  }

  // 一些状态需要设置
  setMyState = () => {
    const { favorited, detail, apply_flowpath } = this.props // eslint-disable-line

    // 转化timelimit 为 picker 适用的数据格式
    let cycleList = null
    if (detail.timelimit && detail.timelimit.length > 0) {
      cycleList = detail.timelimit.map(item => (
        {
          value: item.num + (item.type === 'd' ? '天' : '月'),
          label: item.num + (item.type === 'd' ? '天' : '月'),
        }
      ))
    }
    this.setState(() => ({
      favorited,
      detail,
      applyFlowpath: apply_flowpath,
      cycleList,
      selectVal: cycleList[0].value,
      rate: detail.interest_rate / 100,
      money: detail.sum_start,
      finalMoney: detail.sum_start,
      minMoney: detail.sum_start,
      maxMoney: detail.sum_end,
    }), () => {
      this.initChart()
      // 更新图表
      this.updateChart()
    })
  }
  config = {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [10, 90],
        backgroundColor: [
          '#ff764c', '#7eaeff',
        ],
        borderWidth: [4, 4],
      }],
    },
    options: {
      cutoutPercentage: 66,
      tooltips: { enabled: false },
    },
  }

  // 图表
  myChart = null
  initChart = () => {
    // http://www.chartjs.org/docs/latest/charts/doughnut.html
    const ctx = document.getElementById('myChart')
    ctx.style.width = '.7rem'
    ctx.style.height = '.7rem'
    this.myChart = new Chart(ctx, this.config)
  }
  // 更新图表
  updateChart = () => {
    // 初始化图表
    const { finalMoney, rate, selectVal } = this.state
    const M = +finalMoney
    const F = M * rate * this.monthNum(selectVal)
    const B = Math.round((F / (M + F)) * 100)
    this.config.data.datasets[0].data = [B, 100 - B]
    this.myChart.update()
  }
  monthNum = (str) => {
    const { selectVal } = this.state
    return str.split('').findIndex(item => item === '月') !== -1 ? parseInt(selectVal, 0) : 1
  }
  render() {
    const {
      favorited, applyFlowpath, selectVal, money, finalMoney, cycleList, rate,
    } = this.state
    const {
      err, detail, success, code, msg,
    } = this.props
    if (err) return <ErrorFetch err={err} />
    if (!success || code !== 200) return <NoDataIco ico="i-search" text={msg || '数据获取失败'} />
    if (!detail) return null
    // 转换周期
    let cycleRangeText = null
    if (detail.timelimit && detail.timelimit.length > 0) {
      const first = detail.timelimit[0].num + (detail.timelimit[0].type === 'd' ? '天' : '月')
      const lastIndex = detail.timelimit.length - 1
      const last = detail.timelimit[lastIndex].num + (detail.timelimit[lastIndex].type === 'd' ? '天' : '月')
      if (detail.timelimit.length > 1) {
        cycleRangeText = `${first}-${last}`
      } else {
        cycleRangeText = first
      }
    }

    return (
      <Layout title={detail.name || '贷款详情'}>
        <div className="equal overflow-y">
          <div className="loan-detail-top flex ai-center plr25">
            <div className="loan-detail-top-box equal r10 flex column jc-center overflow-h">
              <div className="flex overflow-h mb25">
                <div className="equal flex overflow-h">
                  <div className="w78 h78 log-bg mr10 r4 overflow-h">
                    <img src={imgUrl(detail.thumb)} className="h-100" alt="" />
                  </div>
                  <div className="equal flex column jc-between c-white overflow-h">
                    <div className="font28 bold lh100 text-overflow-one">{detail.name}</div>
                    <div className="font24 lh100 text-overflow-one">{detail.description}</div>
                  </div>
                </div>
                <div
                  className="equal-no plr20 loan-detail-top-tag font20 c-main"
                >
                  {detail.apply_num}人申请
                </div>
              </div>
              {
                detail.apply_material_name && detail.apply_material_name.length > 0 &&
                <div style={{ maxHeight: '0.86rem', marginBottom: '-0.1rem' }} className="flex wrap overflow-y">
                  {detail.apply_material_name.map(item => <div key={uuid()} className="plr15 c-main font24 r4 mr15 mb10 loan-detail-top-tip">{item}</div>)}
                </div>
              }
            </div>
          </div>

          <div className="flex h120 ai-center bg-white border-bottom-one overflow-x">
            <div className="equal-auto h50 text-center flex column jc-center border-right plr10">
              <div className="font28 bold lh100 mb15 c333">{detail.cycle}</div>
              <div className="font24 lh100 c999">办理周期</div>
            </div>
            <div className="equal-auto h50 text-center flex column jc-center border-right plr10">
              <div className="font28 bold lh100 mb15 c333">{detail.payment_method}</div>
              <div className="font24 lh100 c999">还款方式</div>
            </div>
            <div className="equal-auto h50 text-center flex column jc-center plr10">
              <div className="font28 bold lh100 mb15 c-second">{detail.interest_rate}%</div>
              <div className="font24 lh100 c999">参考{detail.interest_rate_method}利率</div>
            </div>
          </div>

          <div className="ptb30 bg-white">
            <div className="flex plr25">
              <div className="equal change-input mr25">
                <InputItem
                  className="loan-set-input-right"
                  type="number"
                  extra="元"
                  labelNumber={2}
                  ref={ele => this.money = ele}
                  value={money}
                  onChange={this.onMoneyChange}
                  onBlur={this.onBlur}
                >
                  贷款
                </InputItem>
                <div className="ptb20 font20 c999 text-center">
                  金额范围 {clipBigNum(detail.sum_start)}-{clipBigNum(detail.sum_end)}
                </div>
              </div>
              <div className="equal">
                <Picker
                  data={cycleList}
                  cols={1}
                  onOk={this.onSelectVal}
                >
                  <div className="flex h50 bg-body jc-between relative">
                    <div className="font28 c999 pl20" style={{ lineHeight: '0.5rem' }}>期限</div>
                    <Btn
                      btnClass="equal flex jc-start ai-center row-reverse pr15"
                      icoClass="font12 i-down c666 ml10"
                      con={<span>{selectVal}</span>}
                    />
                  </div>
                </Picker>
                <div className="ptb20 font20 c999 text-center">
                  贷款期限 {cycleRangeText}
                </div>
              </div>
            </div>
            <div className="flex jc-center ai-center pt20">

              <div className="relative" style={{ width: '2.56rem', height: '2.56rem' }}>
                <div
                  style={{
                    position: 'absolute', width: '100%', height: '100%', zIndex: 10,
                  }}
                  className="flex column jc-center ai-center"
                >
                  <div className="f28 bold c666">{clipPrice(+finalMoney + (finalMoney * rate * this.monthNum(selectVal)))}</div>
                  <div className="f24 c666">总还款</div>
                </div>
                <canvas id="myChart">你的浏览器不支持 canvas</canvas>
              </div>

              <div style={{ marginLeft: '0.38rem' }}>
                <div className="font24 c333 flex ai-center mb50">
                  <i className="i-circle font16 c-main mr10" />
                  <span>到账金额：{finalMoney}</span>
                </div>
                <div className="font24 c333 flex ai-center mb50">
                  <i className="i-circle font16 c-second mr10" />
                  <span>
                    利息和费用：
                    {
                      clipPrice(finalMoney * rate * this.monthNum(selectVal))
                    }
                  </span>
                </div>
                <div className="font24 c333 flex ai-center">
                  <i className="i-circle font16 c-ccc mr10" />
                  <span>
                    月还款：{
                      clipPrice((+finalMoney + (finalMoney * rate * this.monthNum(selectVal))) / this.monthNum(selectVal))
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="h20" />
          <div className="ptb25 bg-white">
            <div className="card-title font30 bold c333 pl20 h36">申请流程</div>
          </div>
          <div className="pr25 bg-white overflow-x flex">
            {
              applyFlowpath && applyFlowpath.length > 0 && applyFlowpath.map((item, index) => (
                <div key={uuid()} className="equal-no flex h120">
                  <div className="flex column jc-center ai-center plr25">
                    <div className="w50 h50">
                      <img src={item.icon} className="h-100" alt="" />
                    </div>
                    <div className="font24 c666 lh100 mt20">{item.step_name}</div>
                  </div>
                  {index !== applyFlowpath.length - 1 && <i className="i-right font18 c-ddd mt25" />}
                </div>
              ))
            }
          </div>
          <div className="pt25 pb20 bg-white">
            <div className="card-title font30 bold c333 pl20 h36">申请条件</div>
          </div>
          <div className="font28 c666 bg-white plr25 pb25 lh150">
            { detail.application_requirements ? detail.application_requirements : '小编上传中' }
          </div>
          {
            detail.customer_tel &&
            <div className="h70 plr25 flex ai-center">
              <MultiColorIco ico="i-phone font26 mr10" num={2} />
              <span className="font24 bold c999 lh100">客服电话：</span>
              <a className="font24 bold c-second lh100" href={`tel:${detail.customer_tel}`}>{detail.customer_tel}</a>
            </div>
          }
          <div className="h20" />
        </div>
        <DetailFoot isFavorite={favorited} onLike={this.onLike} onApply={this.onApply} />
      </Layout>
    )
  }
}
