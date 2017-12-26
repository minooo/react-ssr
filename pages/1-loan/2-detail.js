import React, { Component } from 'react'
import { connect } from 'react-redux'
import reduxPage from '@reduxPage'
import Chart from 'chart.js'
import uuid from 'uuid/v4'
import { Toast, InputItem, Picker } from 'antd-mobile'
import { imgUrl, http, clipPrice, clipBigNum } from '@utils'
import { Layout, ErrorFetch, DetailFoot, Btn, MultiColorIco } from '@components'

const util = require('util')

export default class extends Component {
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
  render() {
    const { err } = this.props
    const {
      dataParam, currentTitle, selectList, banner,
    } = this.state
    if (err) {
      return <ErrorFetch err={err} />
    }
    return (
      <Layout title="贷款-列表">
        1234
      </Layout>
    )
  }
}
