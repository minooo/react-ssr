import React, { Component } from 'react'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { SearchItem, ProductList } from '@components'
import { http, cache, setTitle } from '@utils'
import { getMySearch } from '@actions'

@connect(state => ({
  hotSearch: state.hotSearch.hot,
  mySearch: state.mySearch,
}), {
  getMySearch,
})
export default class extends Component {
  state = {
    focus: false,
    value: false,
    hasSearched: false,
    cards: [],
    loans: [],
  }
  componentWillMount() {
    setTitle('搜索')
  }
  onChange = () => {
    const val = this.search.value.trim()
    this.setState(() => ({ value: val }))
  }
  onFocus = () => {
    const { cards, loans } = this.state
    const hasSearched = cards.length > 0 || loans.length > 0
    this.setState(() => ({ focus: true, hasSearched }))
  }
  onBlur = () => {
    if (this.state.value) return
    this.setState(() => ({ focus: false }))
  }
  onSearch = (v) => {
    Toast.loading('搜索中...', 0)
    this.setState(() => ({ focus: false }), () => {
      http.post('/search', { content: v || this.state.value }).then((response) => {
        if (response.code === 200 && response.success) {
          Toast.hide()
          const { cards, loans } = response.data
          this.setState(() => ({ cards, loans, hasSearched: true }))

          // 搜索有结果了，才把这次的搜索值存在本地缓存中
          // 条件，是手动输入的搜索，并且有结果
          if (!v && (cards.length > 0 || loans.length > 0)) {
            this.setMySearch()
          }
        } else {
          Toast.fail(`抱歉，请求出错。${response.msg}`)
        }
      }).catch(err => Toast.offline(`网络错误，请稍后重试！${err}`))
    })
  }
  onKeyPress = (e) => {
    const keycode = e.keyCode
    if (keycode === 0) {
      this.onSearch()
    }
  }

  // 设置本地搜索缓存字段
  setMySearch = () => {
    const { getMySearch } = this.props
    if (!cache.getItem('my_search')) { cache.setItem('my_search', []) }
    const myHistorySearch = cache.getItem('my_search')
    let newHistorySearch

    const findIndex = myHistorySearch.findIndex(item => item === this.state.value)
    if (findIndex !== -1) {
      // 如果存在相同的元素，则将其移到队首
      newHistorySearch = [...myHistorySearch]
      const firstItem = newHistorySearch[0]
      newHistorySearch[0] = this.state.value
      newHistorySearch[findIndex] = firstItem
    } else {
      newHistorySearch = myHistorySearch.slice(0, 9)
      newHistorySearch.unshift(this.state.value)
    }

    cache.setItem('my_search', newHistorySearch)
    getMySearch(newHistorySearch)
  }

  render() {
    const {
      focus, value, hasSearched, cards, loans,
    } = this.state
    const { hotSearch, mySearch } = this.props
    return (
      <div className="flex column h-100 bg-white">
        <div className="flex plr25 h100 relative ai-center bg-border equal-no overflow-h">
          <input
            ref={ele => this.search = ele}
            placeholder="请输入您要找的产品名称"
            style={{ paddingLeft: '0.6rem', lineHeight: '0.54rem' }}
            className="block h54 r6 bg-input pr20 reset equal c333"
            type="search"
            onInput={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onKeyPress={this.onKeyPress}
          />
          <i
            style={{
              position: 'absolute', left: '0.42rem', top: '50%', transform: 'translateY(-50%)',
            }}
            className="i-search font-34 c999"
          />
          <button
            style={{ marginRight: `${focus ? 0 : '-1.05rem'}` }}
            className={`font-28 h56 w80 ml25 search-btn-ani ${value ? 'c-main' : 'c999'}`}
            onClick={value ? () => this.onSearch() : null}
          >
            {value ? '搜索' : '取消'}
          </button>
        </div>
        <div className="equal overflow-y">
          {
            hasSearched && cards.length === 0 && loans.length === 0 &&
            <div className="c666 ptb30 plr25">
              很抱歉，没有找到
              {
                this.search.value.trim() ?
                  <span>与<span className="c-second plr10">{this.search.value.trim()}</span>相关的结果。</span> :
                  '相关结果。'
              }
              请尝试其他关键词。
            </div>
          }
          {
            cards.length === 0 && loans.length === 0 && mySearch && mySearch.length > 0 &&
            <div className="plr25"><SearchItem title="最近搜索" list={mySearch} onClick={this.onSearch} border /></div>
          }
          {
            cards.length === 0 && loans.length === 0 && hotSearch && hotSearch.length > 0 &&
            <div className="plr25"><SearchItem title="热门搜索" list={hotSearch} onClick={this.onSearch} /></div>
          }
          {
            loans.length > 0 && <div className="ptb20 c333 font28 plr25">搜索结果-贷款</div>
          }
          {
            loans.length > 0 && loans.map(item => (
              <ProductList key={uuid.v4()} {...item} border />
            ))
          }
          {
            cards.length > 0 && <div className="ptb20 c333 font28 plr25">搜索结果-信用卡</div>
          }
          {
            cards.length > 0 && cards.map(item => (
              <ProductList key={uuid.v4()} {...item} border />
            ))
          }
        </div>
      </div>
    )
  }
}
