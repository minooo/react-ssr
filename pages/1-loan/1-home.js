import React, { Component } from 'react'
import { connect } from 'react-redux'
import reduxPage from '@reduxPage'
import { getLoansFilter } from '@actions'
import { imgUrl, http, searchToObj } from '@utils'
import {
  ErrorFetch,
  Layout,
  Nav,
  SwitchSelect,
  ScrollLoad,
  ProductList,
} from '@components'

const util = require('util')
@reduxPage
@connect(({ loansFilter }) => ({ loansFilter }))

export default class extends Component {
  static async getInitialProps(ctx) {
    const {
      store, pathname, query, asPath, isServer,
    } = ctx

    if (!store.getState().loansFilter) {
      try {
        const loansFilterFetch = await http.get('loans_filter', null, isServer)
        const loansFilterData = loansFilterFetch.data
        store.dispatch(getLoansFilter(loansFilterData))
      } catch (error) {
        const err = util.inspect(error)
        return { err }
      }
    }
    return { pathname, query, asPath }
  }
  state = {
    banner: null,
    dataParam: null,
    currentTitle: null,
    selectList: null,
  }
  componentDidMount() {
    const { loansFilter } = this.props
    if (loansFilter && loansFilter.currentTitle) {
      this.changeData(loansFilter)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.loansFilter.currentTitle && nextProps.loansFilter.currentTitle) {
      this.changeData(nextProps.loansFilter)
    }
  }

  onSelect = (param) => {
    const dataParam = {}
    param.forEach((item) => {
      const k = item.key
      const v = item.id
      dataParam[k] = v
    })
    this.setState(() => ({ dataParam, banner: param[1].banner }))
  }

  // 更改顶部选项的逻辑
  changeData = (loansFilter) => {
    const searchObj = searchToObj()
    const { currentTitle, selectList } = loansFilter
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
        banner: dataParam.type !== undefined ? selectList[1].list.find(item => item.id === dataParam.type).banner : '',
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
      dataParam, currentTitle, selectList, banner,
    } = this.state
    if (err) {
      return <ErrorFetch err={err} />
    }
    return (
      <Layout title="贷款-列表">
        <SwitchSelect
          currentTitle={currentTitle}
          selectList={selectList}
          onSelect={this.onSelect}
        />
        {
          dataParam ?
            <ScrollLoad
              className="equal"
              listClass="mb20"
              dataPath="loans"
              dataParam={dataParam}
              dataName="list"
              renderRow={item => <ProductList {...item} openHot />}
              noDataIco={{ ico: 'i-search', text1: '抱歉，暂无数据', text2: '已经到底了' }}
            >
              {
                banner &&
                <div className="plr25 pt20">
                  <div
                    style={{
                      height: '21.333vw',
                      maxHeight: '2.1333rem',
                      borderRadius: '0.08rem 0.08rem 0 0',
                    }}
                    className="overflow-h log-bg"
                  >
                    <img src={imgUrl(banner)} className="h-100" alt="" />
                  </div>
                </div>
              }
            </ScrollLoad> :
            <div className="equal" />
        }
        <Nav />
      </Layout>
    )
  }
}
