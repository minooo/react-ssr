import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import cookie from 'cookie'
import { Steps, Toast } from 'antd-mobile'
import uuid from 'uuid/v4'
import reduxPage from '@reduxPage'
import { http, isIDNumber, isName } from '@utils'
import { getUser } from '@actions'
import {
  Layout,
  ErrorFetch,
  Btn,
  SwitchList,
  ChangeList,
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
      // 第一步 基础信息
      const response2 = await http.get('base_edit', { token }, isServer)
      const base = response2.data
      // 第二步 信息
      const response3 = await http.get('identity_edit', { token }, isServer)
      const base2 = response3.data
      // 第三步 信息
      const response4 = await http.get('asset_edit', { token }, isServer)
      const base3 = response4.data
      if (response.code === 200 && response.success) {
        const { user } = response.data
        store.dispatch(getUser(user))
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
      return {
        base, base2, base3,
      }
    } catch (error) {
      const err = util.inspect(error)
      return { err }
    }
  }
  state = {
    focus: 0,
    // 第一步
    isMan: 1,
    provinceVal: '',
    cities: '',
    cityVal: '',
    marryVal: '',
    // 第二步
    jobTypesVal: '',
    payTypesVal: '',
    isSocial: 0,
    isFund: 0,
    // 第三步
    isCard: 0,
    isAccount: 0,
    isInsure: 0,
    isAuth: 0,
    isHouse: 0,
    isCar: 0,
    creditVal: '',
    sesameCreditVal: '',
  }
  componentDidMount() {
    const { base, base2, base3 } = this.props
    if (base && base2 && base3) {
      this.setMyState(base, base2, base3)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.base && (nextProps.base && nextProps.base2 && nextProps.base3)) {
      this.setMyState(nextProps.base, nextProps.base2, nextProps.base3)
    }
  }
  onSwitch = (key) => {
    this.setState(pre => ({ [key]: pre[key] === 1 ? 0 : 1 }))
  }
  onChange = (e, key) => {
    const v = e.target.value
    if (key === 'provinceVal') {
      Toast.loading('获取城市数据')
      http.get(`city/${v}`).then((response) => {
        Toast.hide()
        if (response.code === 200 && response.success) {
          const cities = response.data.city
          const cityVal = (cities && cities.length > 0) ? cities[0].id : null
          this.setState(() => ({ cities, cityVal }))
        } else {
          Toast.fail(response.msg ? response.msg : '获取异常，请稍后再试。')
        }
      }).catch(() => { Toast.offline('网络异常，请稍后再试！') })
    }
    this.setState(() => ({ [key]: v }))
  }
  onNext = () => {
    const allCookie = document.cookie
    const token = cookie.parse(String(allCookie)).userToken
    const {
      focus,
      isMan, provinceVal, cityVal, marryVal,
      jobTypesVal, payTypesVal, isSocial, isFund,
      isCard, isAccount, isInsure, isAuth, isHouse, isCar, creditVal, sesameCreditVal,
    } = this.state
    const { base2, url: { query } } = this.props
    if (focus === 0) {
      const trueName = this.trueName.value.trim()
      const IDNumber = this.IDNumber.value.trim()
      if (!isName(trueName)) { Toast.fail('请填写您的真实姓名，2-4字'); return }
      if (!isIDNumber(IDNumber)) { Toast.fail('请填写正确的身份证号'); return }
      Toast.loading('处理中...')
      http.post('base_edit', {
        name: trueName,
        sex: isMan,
        idNum: IDNumber,
        province_id: provinceVal,
        city_id: cityVal,
        marital_status: marryVal,
        token,
      }).then((response) => {
        Toast.hide()
        if (response.code === 200 && response.success) {
          this.setState(() => ({ focus: 1 }), () => {
            // 初始化月收入
            if (this.payMonth) {
              this.payMonth.value = base2 && base2.info ? (base2.info.monthly_income || base2.info.monthly_turnover || '') : ''
            }
          })
        } else {
          Toast.fail(response.msg ? response.msg : '获取异常，请稍后再试。')
        }
      }).catch(() => { Toast.offline('网络异常，请稍后再试！') })
      return
    }
    if (focus === 1) {
      if (parseInt(jobTypesVal, 0) !== 3) {
        const payMonthVal = this.payMonth.value
        if (!payMonthVal || payMonthVal.split('').lenght > 10) {
          Toast.fail(`您填写的${parseInt(jobTypesVal, 0) === 2 ? '月经营流水' : '月收入'}为空，或者不合法，请重新输入！`)
          this.payMonth.value = ''
          return
        }
      }
      Toast.loading('处理中...')
      http.post('identity_edit', {
        identity_status: jobTypesVal,
        ...(parseInt(jobTypesVal, 0) === 1 && { income_mode: payTypesVal }),
        ...(parseInt(jobTypesVal, 0) !== 3 && { [parseInt(jobTypesVal, 0) === 2 ? 'monthly_turnover' : 'monthly_income']: this.payMonth.value }),
        is_pay_six_months_social_security: isSocial,
        is_pay_six_months_accumulation_fund: isFund,
        token,
      }).then((response) => {
        Toast.hide()
        if (response.code === 200 && response.success) {
          this.setState(() => ({ focus: 2 }))
        } else {
          Toast.fail(response.msg ? response.msg : '获取异常，请稍后再试。')
        }
      }).catch(() => { Toast.offline('网络异常，请稍后再试！') })
      return
    }
    if (focus === 2) {
      Toast.loading('处理中...')
      http.post('asset_edit', {
        has_credit_card: isCard,
        has_net_shopping_account: isAccount,
        has_commercial_insurance: isInsure,
        phone_real_name_authentication: isAuth,
        house_property: isHouse,
        has_car: isCar,
        credit_condition: creditVal,
        zhima_score: sesameCreditVal,
        token,
      }).then((response) => {
        Toast.hide()
        if (response.code === 200 && response.success) {
          if (query.href) {
            Router.replace({
              pathname: query.href,
              query,
            }, query.as)
          } else {
            Router.replace('/index', '/')
          }
        } else {
          Toast.fail(response.msg ? response.msg : '获取异常，请稍后再试。')
        }
      }).catch(() => { Toast.offline('网络异常，请稍后再试！') })
    }
  }
  setMyState = (base, base2, base3) => {
    this.trueName.value = base.base.name
    this.IDNumber.value = base.base.idNum
    this.setState(() => ({
      trueName: base.base.name,
      isMan: base.base.sex || 1,
      IDNumber: base.base.idNum,
      provinceVal: base.base.province_id || base.province[0].id,
      marryVal: base.base.marital_status,

      jobTypesVal: (base2.info && base2.info.identity_status) ? base2.info.identity_status : base2.options.identity[0].id,
      payTypesVal: (base2.info && base2.info.identity_status === 1) ? base2.info.income_mode : base2.options.income_mode[0].id,
      isSocial: (base2.info && base2.info.is_pay_six_months_social_security) ? base2.info.is_pay_six_months_social_security : 0,
      isFund: (base2.info && base2.info.is_pay_six_months_accumulation_fund) ? base2.info.is_pay_six_months_accumulation_fund : 0,

      isCard: (base3.info && base3.info.has_credit_card) ? base3.info.has_credit_card : 0,
      isAccount: (base3.info && base3.info.has_net_shopping_account) ? base3.info.has_net_shopping_account : 0,
      isInsure: (base3.info && base3.info.has_commercial_insurance) ? base3.info.has_commercial_insurance : 0,
      isAuth: (base3.info && base3.info.phone_real_name_authentication) ? base3.info.phone_real_name_authentication : 0,
      isHouse: (base3.info && base3.info.house_property) ? base3.info.house_property : 0,
      isCar: (base3.info && base3.info.has_car) ? base3.info.has_car : 0,
      creditVal: (base3.info && base3.info.credit_condition) ? base3.info.credit_condition : base3.options.credit_condition[0].id,
      sesameCreditVal: (base3.info && base3.info.zhima_score) ? base3.info.zhima_score : base3.options.zhima_score[0].id,
    }), () => {
      http.get(`city/${base.base.province_id || base.province[0].id}`).then((response) => {
        Toast.hide()
        if (response.code === 200 && response.success) {
          const cities = response.data.city
          const cityVal = (cities && cities.length > 0) ? cities[0].id : null
          this.setState(() => ({ cities, cityVal }))
        } else {
          Toast.fail(response.msg ? response.msg : '获取异常，请稍后再试。')
        }
      }).catch(() => { Toast.offline('网络异常，请稍后再试！') })
    })
  }
  render() {
    const {
      err, user, base, base2, base3,
    } = this.props
    const {
      focus,
      isMan, provinceVal, cities, cityVal, marryVal,
      jobTypesVal, payTypesVal, isSocial, isFund,
      isCard, isAccount, isInsure, isAuth, isHouse, isCar, creditVal, sesameCreditVal,
    } = this.state
    const { Step } = Steps
    const steps = [{
      title: '基础信息',
    }, {
      title: '身份信息',
    }, {
      title: '资产情况',
    }].map(item => <Step key={uuid()} title={item.title} />)
    if (err) {
      return <ErrorFetch err={err} />
    }
    return (
      <Layout title="个人资料">
        <div className="h82 plr25 flex ai-center bg-light-yellow font26 c-second">
          <i className="i-tip font28 c-second mr10" />资料越完善，产品匹配越精准
        </div>
        <div className="h20" />
        <Steps current={focus} direction="horizontal" size="small">{steps}</Steps>
        {
          focus === 0 && base &&
          <div className="pl25 bg-white mt10 mb25">
            <div className="h80 border-bottom flex jc-between ai-center">
              <div className="font28 c666">姓名</div>
              <input
                type="text"
                placeholder="请输入您的真实姓名"
                ref={ele => this.trueName = ele}
                maxLength="4"
                className="block equal reset text-right plr30 font28 c-main"
              />
            </div>
            <SwitchList title="性别" onSwitch={this.onSwitch} keyVal="isMan" stateVal={isMan} yes="男" no="女" />

            <div className="h80 border-bottom flex jc-between ai-center">
              <div className="font28 c666">身份证号</div>
              <input
                type="text"
                placeholder="请输入您的身份证号"
                ref={ele => this.IDNumber = ele}
                maxLength="18"
                className="block equal reset text-right plr30 font28 c-main"
              />
            </div>
            <div className="h80 border-bottom flex jc-between ai-center">
              <div className="font28 c666">手机号</div>
              <input
                type="text"
                placeholder="请输入您的手机号"
                disabled="disabled"
                value={`${user.phone} ( 已绑定 )`}
                className="block equal reset text-right plr30 font28 c-main"
              />
            </div>
            <ChangeList title="所在省份" types={base.province} stateVal={provinceVal} keyVal="provinceVal" onChange={this.onChange} />
            {
              cities && cities.length > 0 &&
              <ChangeList title="所在城市" types={cities} stateVal={cityVal} keyVal="cityVal" onChange={this.onChange} />
            }
            <ChangeList title="婚姻状况" types={base.marital_status} stateVal={marryVal} keyVal="marryVal" onChange={this.onChange} />
          </div>
        }
        {
          focus === 1 && base2 &&
          <div className="pl25 bg-white mt10 mb25">
            <ChangeList title="职业身份" types={base2.options.identity} stateVal={jobTypesVal} keyVal="jobTypesVal" onChange={this.onChange} />
            {
              parseInt(jobTypesVal, 0) === 1 &&
              <ChangeList title="收入方式" types={base2.options.income_mode} stateVal={payTypesVal} keyVal="payTypesVal" onChange={this.onChange} />
            }
            {
              parseInt(jobTypesVal, 0) !== 3 &&
              <div className="h80 border-bottom flex jc-between ai-center">
                <div className="font28 c666">{parseInt(jobTypesVal, 0) === 2 ? '月经营流水' : '月收入'}</div>
                <input
                  type="number"
                  placeholder="请输入..."
                  ref={ele => this.payMonth = ele}
                  className="block equal reset text-right pl30 pr5 font28 c-main"
                />
                <div className="c-main font28 pr30">元</div>
              </div>
            }
            <SwitchList title="是否连续6个月缴纳社保" onSwitch={this.onSwitch} keyVal="isSocial" stateVal={isSocial} />
            <SwitchList title="是否连续6个月缴纳公积金" onSwitch={this.onSwitch} keyVal="isFund" stateVal={isFund} />
          </div>
        }
        {
          focus === 2 && base3 &&
          <div className="pl25 bg-white mt10 mb25">
            <SwitchList title="是否有信用卡" onSwitch={this.onSwitch} keyVal="isCard" stateVal={isCard} />
            <SwitchList title="是否有网购账号" onSwitch={this.onSwitch} keyVal="isAccount" stateVal={isAccount} />
            <SwitchList title="是否有商业保险" onSwitch={this.onSwitch} keyVal="isInsure" stateVal={isInsure} />
            <SwitchList title="手机号是否实名认证" onSwitch={this.onSwitch} keyVal="isAuth" stateVal={isAuth} />
            <SwitchList title="本人名下是否有房产" onSwitch={this.onSwitch} keyVal="isHouse" stateVal={isHouse} />
            <SwitchList title="本人名下是否有私车" onSwitch={this.onSwitch} keyVal="isCar" stateVal={isCar} />
            <ChangeList title="信用情况" types={base3.options.credit_condition} stateVal={creditVal} keyVal="creditVal" onChange={this.onChange} />
            <ChangeList title="芝麻信用分" types={base3.options.zhima_score} stateVal={sesameCreditVal} keyVal="sesameCreditVal" onChange={this.onChange} />
          </div>
        }
        <Btn
          hor
          btnClass="bg-main r8 h72 ml25 mr25 mb20"
          con={<span className="c-white font30">{focus !== 2 ? '下一步' : '完成'}</span>}
          onClick={this.onNext}
        />
        <div className="text-center ptb20 font24 c999">您的信息绝不会泄露，仅用于推荐产品</div>
      </Layout>
    )
  }
}
