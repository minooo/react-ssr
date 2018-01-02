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
      store, req, res,
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
      const response = await http.get('user_info', { token })
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
    return null
  }
  state = {
    focus: 1,
    // 第一步
    trueName: "",
    isMan: true,
    IDNumber: "",
    city: "",
    isMarried: false,
    // 第二步
    jobTypesVal: 0,
    payTypesVal: 0,
    payMonthVal: 0,
    isSocial: false,
    isFund: false,
    // 第三步
    isCard: false,
    isAccount: false,
    isInsure: false,
    isAuth: false,
    isHouse: false,
    isCar: false,
    creditVal: 0,
    sesameCreditVal: 0,
  }
  onSwitch = (key) => {
    this.setState(pre => ({[key]: !pre[key]}))
  }
  onChange = (e, key) => {
    const v = e.target.value
    this.setState(() => ({ [key]: v }))
  }
  onNext = () => {
    const {
      focus,
      trueName,
      isMan,
      IDNumber,
      city,
      isMarried,
    } = this.state
    if (focus === 0) {
      const trueName = this.trueName.value.trim()
      const IDNumber = this.IDNumber.value.trim()
      const city = this.city.value.trim()
      if (!isName(trueName)) { Toast.fail('请填写您的真实姓名，2-4字'); return }
      if (!isIDNumber(IDNumber)) { Toast.fail('请填写正确的身份证号'); return }
      if (!city) { Toast.fail('请填写您所在的城市'); return }
      this.setState(() => ({ focus: 1, trueName, IDNumber, city}))
    }
    if (focus === 1) {
      this.setState(() => ({ focus: 2}))
    }
    if (focus === 2) {
      alert('123')
    }
  }
  render() {
    const { err, user } = this.props
    const {
      focus,

      trueName,
      isMan,
      IDNumber,
      city,
      isMarried,

      jobTypesVal,
      payTypesVal,
      payMonthVal,
      isSocial,
      isFund,

      isCard,
      isAccount,
      isInsure,
      isAuth,
      isHouse,
      isCar,
      creditVal,
      sesameCreditVal,
    } = this.state
    const { Step } = Steps
    const steps = [{
      title: '基础信息',
    }, {
      title: '身份信息',
    }, {
      title: '资产情况',
    }].map(item => <Step key={uuid()} title={item.title} />)

    // 职业身份 收入方式 月收入 信用情况 芝麻信用分
    const jobTypes = ['上班族', '个体户', '企业主', '学生', '无固定职业']
    const payTypes = ['打卡工资', '现金发放', '部分打卡，部分现金']
    const payMonth = ['小于4千', '4千——6千', '6千——1万', '1万以上']
    const credit = ['无信用卡或贷款', '有信用卡或贷款，信用良好', '一年内逾期少于3次或少于90天', '一年内逾期超过3次或超过90天', '暂不清楚']
    const sesameCredit = ['550（不含）以下', '550-600（不含）', '600-650（不含）', '650（含）以上']
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
          focus === 0 &&
          <div className="pl25 bg-white mt10 mb25">
            <div className="h80 border-bottom flex jc-between ai-center">
              <div className="font28 c666">姓名</div>
              <input
                type="text"
                placeholder="请输入您的真实姓名"
                defaultValue={trueName}
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
                defaultValue={IDNumber}
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
            <div className="h80 border-bottom flex jc-between ai-center">
              <div className="font28 c666">所在城市</div>
              <input
                type="text"
                placeholder="请输入您所在城市"
                defaultValue={city}
                ref={ele => this.city = ele}
                maxLength="20"
                className="block equal reset text-right plr30 font28 c-main"
              />
            </div>
            <SwitchList title="婚姻状况" onSwitch={this.onSwitch} keyVal="isMarried" stateVal={isMarried} yes="已婚" no="未婚" />
          </div>
        }
        {
          focus === 1 &&
          <div className="pl25 bg-white mt10 mb25">
            <ChangeList title="职业身份" types={jobTypes} stateVal={jobTypesVal} keyVal="jobTypesVal" onChange={this.onChange}/>
            {
              jobTypesVal !== "3" &&
              <ChangeList title="收入方式" types={payTypes} stateVal={payTypesVal} keyVal="payTypesVal" onChange={this.onChange}/>
            }
            {
              jobTypesVal !== "3" &&
              <ChangeList title="月收入" types={payMonth} stateVal={payMonthVal} keyVal="payMonthVal" onChange={this.onChange}/>
            }
            <SwitchList title="是否连续6个月缴纳社保" onSwitch={this.onSwitch} keyVal="isSocial" stateVal={isSocial} />
            <SwitchList title="是否连续6个月缴纳公积金" onSwitch={this.onSwitch} keyVal="isFund" stateVal={isFund} />
          </div>
        }
        {
          focus === 2 &&
          <div className="pl25 bg-white mt10 mb25">
            <SwitchList title="是否有信用卡" onSwitch={this.onSwitch} keyVal="isCard" stateVal={isCard} />
            <SwitchList title="是否有网购账号" onSwitch={this.onSwitch} keyVal="isAccount" stateVal={isAccount} />
            <SwitchList title="是否有商业保险" onSwitch={this.onSwitch} keyVal="isInsure" stateVal={isInsure} />
            <SwitchList title="手机号是否实名认证" onSwitch={this.onSwitch} keyVal="isAuth" stateVal={isAuth} />
            <SwitchList title="本人名下是否有房产" onSwitch={this.onSwitch} keyVal="isHouse" stateVal={isHouse} />
            <SwitchList title="本人名下是否有私车" onSwitch={this.onSwitch} keyVal="isCar" stateVal={isCar} />
            <ChangeList title="信用情况" types={credit} stateVal={creditVal} keyVal="creditVal" onChange={this.onChange}/>
            <ChangeList title="芝麻信用分" types={sesameCredit} stateVal={sesameCreditVal} keyVal="sesameCreditVal" onChange={this.onChange}/>
          </div>
        }
        
        <Btn
          hor
          btnClass="bg-main r8 h72 ml25 mr25"
          con={<span className="c-white font30">{focus !== 2 ? '下一步' : '完成'}</span>}
          onClick={this.onNext}
        />
      </Layout>
    )
  }
}
