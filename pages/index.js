import React, { Component } from 'react'
import { Carousel } from 'antd-mobile'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import reduxPage from '@reduxPage'
import { getHome } from '@actions'
import { imgUrl, http } from '@utils'
import {
  ErrorFetch,
  Layout,
  Nav,
  Btn,
  WrapLink,
  HomeMessage,
  HomeLimit,
  HomeLoanTypes,
  ProductList,
} from '@components'

const util = require('util')
@reduxPage
@connect(({ home }) => ({ home }))

export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { store } = ctx

    if (!store.getState().home) {
      try {
        const homeFetch = await http.get('home')
        const homeData = homeFetch.data
        store.dispatch(getHome(homeData))
      } catch (error) {
        const err = util.inspect(error)
        return { err }
      }
    }
    return null
  }
  state = {
    messageList: ['136****5422成功贷款2万元', '186****7399成功贷款3万元', '158****0919成功贷款5万元', '151****6655成功贷款3000元'],
  }
  render() {
    const { home, err } = this.props
    const { messageList } = this.state
    if (err) {
      return <ErrorFetch err={err} />
    }
    if (!home) return null
    return (
      <Layout title="首页">
        <div className="equal relative overflow-y">
          <Btn
            style={{
              position: 'absolute',
              top: '0.2rem',
              right: '0.27rem',
            }}
            ver
            btnClass="w52 h52 r100 bg-main z-index10"
            href="/search"
            icoClass="i-search font26 c-white"
          />
          <div className="relative">
            {/* banner图 */}
            <Carousel
              style={{ height: '37.6vw', maxHeight: '3.76rem', borderBottom: '0.04rem solid #f4f4f4' }}
              className="home-banner"
              autoplay
              dots={false}
              infinite
              selectedIndex={0}
              speed={200}
              autoplayInterval={3000}
            >
              {
                home.tui_loans_banner && home.tui_loans_banner.length > 0 && home.tui_loans_banner.map(item => (
                  <WrapLink
                    key={uuid()}
                    href="/1-loan/2-detail"
                    as={`/loan/${item.id}`}
                    className="block h-100"
                  >
                    <img src={imgUrl(item.banner)} className="h-100" alt="首页banner" />
                  </WrapLink>
                ))
              }
            </Carousel>
            {/* 消息轮播 */}
            <div className="plr20 home-message-box">
              <HomeMessage list={messageList} />
            </div>
          </div>
          <div className="h46 bg-white" />
          {/* 各种贷款额度 */}
          <HomeLimit list={home && home.limits} />
          {/* 各种贷款类型 */}
          <HomeLoanTypes list={home && home.types} />
          {/* 热门贷款 */}
          <div className="plr25 pt20 pb10 lh100 font30 c333 bg-white">热门贷款推荐</div>
          {
            home.hot_loans && home.hot_loans.map((item, index) => (
              <div key={uuid()}>
                <ProductList {...item} />
                {index !== home.hot_loans.length - 1 ? <div className="h20" /> : null}
              </div>
            ))
          }
          <Btn
            hor
            btnClass="h80 bg-white border-top row-reverse mb20"
            href="/1-loan/1-home"
            as="/loan"
            icoClass="i-right font18 c-main"
            con={<span className="c-main font30 mr10">全部贷款产品</span>}
          />
          {/* 热门信用卡 */}
          <div className="plr25 pt20 pb10 lh100 font30 c333 bg-white">热门信用卡推荐</div>
          {
            home.hot_cards && home.hot_cards.map((item, index) => (
              <div key={uuid()}>
                <ProductList {...item} />
                {index !== home.hot_cards.length - 1 ? <div className="h20" /> : null}
              </div>
            ))
          }
          <Btn
            hor
            btnClass="h80 bg-white border-top row-reverse"
            href="/2-card/2-list"
            as="/card/list"
            icoClass="i-right font18 c-main"
            con={<span className="c-main font30 mr10">全部信用卡产品</span>}
          />
          <div className="h90 flex column jc-center ai-center">
            <div className="font24 c-ccc mb10 lh100 home-foot-text">嘟嘟好享贷出品</div>
            <div className="font20 c-ccc lh100 home-foot-text">DD Finance</div>
          </div>
        </div>
        <Nav />
      </Layout>
    )
  }
}
