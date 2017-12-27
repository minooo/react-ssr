import React, { Component } from 'react'
import { List, InputItem, WhiteSpace, WingBlank, Button, Toast, Checkbox, Modal } from 'antd-mobile'
import Router from 'next/router'
import { connect } from 'react-redux'
import { getUser } from '@actions'
import reduxPage from '@reduxPage'
import { isMobile, http, setCookie } from '@utils'
import { Layout } from '@components'

@reduxPage
@connect(null, {
  getUser,
})

export default class extends Component {
  state = {
    agree: true,
    isShowAgreement: false,
    codeBtnActive: true,
    timerNum: 0,
  }
  componentWillUnmount() {
    clearInterval(this.tick)
  }

  onLogin = () => {
    const { getUser, url: { query } } = this.props
    const phone = isMobile(this.phone.state.value)
    const code = this.code.state.value.trim()
    if (!phone) {
      Toast.fail('手机号格式有误哦，请检查')
    } else if (!code) {
      Toast.fail('请填写正确的验证码！')
    } else {
      Toast.loading('登录中')
      http.post('sign', { phone, code }).then((response) => {
        if (response.code === 200 && response.success) {
          Toast.hide()
          const { token } = response.data
          setCookie('userToken', token)
          http.get('user_info', { token }).then((response) => {
            if (response.code === 200 && response.success) {
              getUser(response.data.user)
            } else {
              Toast.fail(`抱歉，请求出错。${response.msg}`)
            }
            Router.replace(query.href ? query.href : '/', query.as ? query.as : '/')
          }).catch(() => { Toast.offline('抱歉，网络错误，请稍后再试！') })
        } else {
          Toast.fail(`抱歉，请求出错。${response.msg}`)
        }
      }).catch(() => { Toast.offline('抱歉，网络异常，请稍后再试！') })
    }
  }

  // 获取验证码
  onVerify = () => {
    const phone = isMobile(this.phone.state.value)
    if (!phone) {
      Toast.fail('手机号格式有误哦，请检查')
    } else {
      this.setState(() => ({ timerNum: 60, codeBtnActive: false }), () => {
        Toast.info('请求已发送，请稍等！')
        http.post('send_code', { phone }).then((response) => {
          if (response.code === 200 && response.success) {
            Toast.success(response.msg ? response.msg : '发送成功')
          } else {
            Toast.fail(response.msg ? response.msg : '获取异常，请稍后再试。')
          }
        }).catch(() => { Toast.offline('网络异常，请稍后再试！') })
      })

      this.tick = setInterval(() => {
        this.setState(pre => ({ timerNum: pre.timerNum - 1 }), () => {
          if (this.state.timerNum === 0) {
            this.setState(() => ({ timerNum: 60, codeBtnActive: true }))
            clearInterval(this.tick)
          }
        })
      }, 1000)
    }
  }

  onShowAgreement = () => {
    this.setState(pre => ({ isShowAgreement: !pre.isShowAgreement }))
  }

  onSwitchAgree = (e) => {
    this.setState(() => ({ agree: e.target.checked }))
  }
  render() {
    const {
      agree, isShowAgreement, codeBtnActive, timerNum,
    } = this.state
    return (
      <Layout title="登录">
        <Modal
          popup
          visible={isShowAgreement}
          onClose={this.onShowAgreement}
          closable
          animationType="slide-up"
        >
          <div style={{ maxHeight: '90vh' }} className="scroll-y">
            <p>协议详情！！</p>
            <p>12341</p>
          </div>
        </Modal>
        <div className="equal">
          <div className="flex jc-center ptb30">
            <div
              style={{
                width: '33vw', maxWidth: '3.3rem', height: '33vw', maxHeight: '3.3rem',
              }}
            >
              <img src="http://placekitten.com/g/500/500" className="h-100 circle" alt="" />
            </div>
          </div>
          <List>
            <InputItem
              type="phone"
              ref={ele => this.phone = ele}
              placeholder="请输入手机号"
            >
              {/* <i className="i-user mr10" /> */}手机号
            </InputItem>
            <InputItem
              type="number"
              ref={ele => this.code = ele}
              placeholder="请输入验证码"
              extra={
                <Button
                  style={{ width: '2rem' }}
                  type={codeBtnActive ? 'primary' : 'default'}
                  disabled={!codeBtnActive}
                  size="small"
                  onClick={this.onVerify}
                >
                  {codeBtnActive ? '获取验证码' : `${timerNum}s`}
                </Button>
              }
            >
              验证码
            </InputItem>
          </List>
          <WhiteSpace />
          <div className="flex jc-center">
            <Checkbox.AgreeItem defaultChecked onChange={e => this.onSwitchAgree(e)}>
              我已阅读并同意
              <button className="c-main" onClick={this.onShowAgreement}>《嘟嘟金融协议》</button>
            </Checkbox.AgreeItem>
          </div>

          <WingBlank>
            <Button type="primary" disabled={!agree} onClick={this.onLogin}>登录</Button>
          </WingBlank>
        </div>
      </Layout>
    )
  }
}
