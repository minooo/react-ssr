import React, { Component } from 'react'
import { Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Layout, Nav, WithData } from '@components'
import { http } from '@utils'

@connect(state => (state))
export default class extends Component {
  state={}
  componentDidMount() {
    console.log(this.props, 'didM')
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'willRece')
  }
  render() {
    const { mmm } = this.props
    return (
      <Layout title="首页">
        <div className="equal">
          { console.log(this.props, 'render')}
          我就是来测测心中的想法
        </div>
        <Nav />
      </Layout>
    )
  }
}
