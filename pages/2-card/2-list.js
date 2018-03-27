import React, { Component } from 'react'
import { connect } from 'react-redux'
import reduxPage from '@reduxPage'
import { getCardsFilter } from '@actions'
import { http, searchToObj, setShare } from '@utils'
import {
  ErrorFetch,
  Layout,
  SwitchSelect,
  ScrollLoad,
  ProductList,
} from '@components'

const util = require('util')
@reduxPage
@connect(({ cardsFilter }) => ({ cardsFilter }))

export default class extends Component {
  static async getInitialProps(ctx) {
    const { store, isServer } = ctx

    if (!store.getState().cardsFilter) {
      try {
        const cardsFilterFetch = await http.get('cards_filter', null, isServer)
        const cardsFilterData = cardsFilterFetch.data
        store.dispatch(getCardsFilter(cardsFilterData))
      } catch (error) {
        const err = util.inspect(error)
        return { err }
      }
    }
    return null
  }
  state = {
    dataParam: null,
    currentTitle: null,
    selectList: null,
  }

  componentDidMount() {
    const { cardsFilter } = this.props
    if (cardsFilter.currentTitle) {
      this.changeData(cardsFilter)
    }
    setShare({
      title: '信用卡列表',
      desc: '各种最新最惠的信用卡产品，值得你过来瞅一眼',
    })
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.cardsFilter.currentTitle && nextProps.cardsFilter.currentTitle) {
      this.changeData(nextProps.cardsFilter)
    }
  }
  onSelect = (param) => {
    const dataParam = {}
    param.forEach((item) => {
      const k = item.key
      const v = item.id
      dataParam[k] = v
    })
    this.setState(() => ({ dataParam }))
  }
  // 更改顶部选项的逻辑
  changeData = (cardsFilter) => {
    const searchObj = searchToObj()
    const { currentTitle, selectList } = cardsFilter
    if (searchObj) {
      const newSearchObj = {}
      const newTitle = []
      const dataParam = {}
      currentTitle.forEach((item) => {
        if (searchObj[item.key] === undefined) {
          newSearchObj[item.key] = item.id
        } else {
          newSearchObj[item.key] = +searchObj[item.key]
        }
      })
      selectList.forEach((item) => {
        const val = newSearchObj[item.key]
        const obj = item.list.find(item => item.id === val) ? item.list.find(item => item.id === val) : item.list[0]
        newTitle.push({ key: item.key, ...obj })
      })
      newTitle.forEach((item) => {
        const k = item.key
        const v = item.id
        dataParam[k] = v
      })
      this.setState(() => ({
        currentTitle: newTitle,
        selectList,
        dataParam,
      }))
    } else {
      this.setState(() => ({
        currentTitle,
        selectList,
        dataParam: {},
      }))
    }
  }
  render() {
    const { err } = this.props
    const {
      dataParam, currentTitle, selectList,
    } = this.state
    if (err) {
      return <ErrorFetch err={err} />
    }
    return (
      <Layout title="信用卡-列表">
        <SwitchSelect
          currentTitle={currentTitle}
          selectList={selectList}
          onSelect={this.onSelect}
        />
        {
          dataParam ?
            <ScrollLoad
              className="equal"
              listClass="border-bottom"
              dataPath="cards_list"
              dataParam={dataParam}
              dataName="list"
              renderRow={item => <ProductList {...item} />}
              noDataIco={{ ico: 'i-search', text1: '抱歉，暂无数据', text2: '已经到底了' }}
            >
              <div className="h20 bg-body" />
              <div className="card-list-bg" />
              <div className="h20 bg-body" />
            </ScrollLoad> :
            <div className="equal" />
        }
      </Layout>
    )
  }
}
