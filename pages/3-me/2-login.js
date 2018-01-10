import React, { Component } from 'react'
import { List, InputItem, WhiteSpace, WingBlank, Button, Toast, Checkbox, Modal } from 'antd-mobile'
import Router from 'next/router'
import { connect } from 'react-redux'
import { getUser } from '@actions'
import reduxPage from '@reduxPage'
import { isMobile, http, setCookie, searchToObj } from '@utils'
import { Layout } from '@components'

@reduxPage
@connect(null, {
  getUser,
})

export default class extends Component {
  state = {
    agree: true,
    agreeCon: null,
    agreeIsLoading: false,
    isShowAgreement: false,
    codeBtnActive: true,
    timerNum: 0,
  }
  componentWillUnmount() {
    clearInterval(this.tick)
  }

  onLogin = () => {
    const { getUser, url: { query } } = this.props
    const URLquery = searchToObj()
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
              if (URLquery && URLquery.href) {
                Router.replace(URLquery.href, URLquery.as)
                return
              }
              if (query && query.href) {
                Router.replace(query.href, query.as)
                return
              }
              Router.replace('/index', '/')
            } else {
              Toast.fail(`抱歉，请求出错。${response.msg}`)
            }
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
    if (!this.state.agreeCon) {
      if (!this.state.agreeIsLoading) {
        this.setState(() => ({ agreeIsLoading: true }), () => {
          http.get('register_agreement').then((response) => {
            if (response.code === 200 && response.success) {
              const agreeCon = response.data.register_agreement.register_agreement
              this.setState(() => ({ agreeCon }))
            } else {
              Toast.fail(response.msg ? response.msg : '获取异常，请稍后再试。')
            }
          }).catch(() => { Toast.offline('抱歉，网络错误，请稍后再试！') })
        })
      }
    }
    this.setState(pre => ({ isShowAgreement: !pre.isShowAgreement }))
  }

  onSwitchAgree = (e) => {
    this.setState(() => ({ agree: e.target.checked }))
  }
  render() {
    const {
      agree, isShowAgreement, codeBtnActive, timerNum, agreeCon,
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
          <div style={{ maxHeight: '90vh' }} className="scroll-y ptb20 plr20">
            <div dangerouslySetInnerHTML={{ __html: agreeCon || '加载中...' }} />
          </div>
        </Modal>
        <div className="equal">
          <div className="flex jc-center ptb30">
            <div className="flex column ai-center ptb30">
              <div style={{ width: '1.8rem', height: '1.8rem' }} className="me-logo me-log-shadow mb20 r35" />
              <div style={{ width: '1.7rem' }} className="me-logo-text h36" />
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
              <button className="c-main" onClick={this.onShowAgreement}>《用户注册协议》</button>
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
