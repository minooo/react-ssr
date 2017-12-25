import React from 'react'
import { ErrorFetch } from '@components'
import reduxPage from '@reduxPage'
import {
  fetchOnce,
  getHome,
  getHotSearch,
  getLoansFilter,
  getCardsHome,
  getCardsFilter,
} from '@actions'
import { http } from '@utils'

const util = require('util')

const wrap = ChildComponent =>
  class extends React.Component {
    // ctx 里都有什么
    // err req res pathname query asPath isServer
    static async getInitialProps(ctx) {
      const {
        store, pathname, query, asPath,
      } = ctx
      if (!store.getState().fetchOnce) {
        try {
          const homeFetch = await http.callApi('home', 'get', {}, ctx)
          const searchFetch = await http.callApi('search', 'get', {}, ctx)
          const loansFilterFetch = await http.callApi('loans_filter', 'get', {}, ctx)
          const cardsFetch = await http.callApi('cards', 'get', {}, ctx)
          const cardsFilterFetch = await http.callApi('cards_filter', 'get', {}, ctx)

          const homeData = homeFetch.data
          const searchData = searchFetch.data
          const loansFilterData = loansFilterFetch.data
          const cardsData = cardsFetch.data
          const cardsFilterData = cardsFilterFetch.data

          store.dispatch(fetchOnce())
          store.dispatch(getHome(homeData))
          store.dispatch(getHotSearch(searchData))
          store.dispatch(getLoansFilter(loansFilterData))
          store.dispatch(getCardsHome(cardsData))
          store.dispatch(getCardsFilter(cardsFilterData))
        } catch (error) {
          // ctx.res.statusCode = 404
          // ctx.res.end('Not found')
          const err = util.inspect(error)
          return { err }
        }
      }
      return { pathname, query, asPath }
    }
    render() {
      if (this.props.err) {
        return <ErrorFetch err={this.props.err} />
      }
      return (
        <ChildComponent {...this.props} />
      )
    }
  }

export default com => reduxPage(wrap(com))
