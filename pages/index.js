import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import reduxPage from '@reduxPage'
import { Error } from '@components'
import { getHome, fetchOnce } from '@actions'
import { http } from '@utils'
import Home from '../tryHome'
const util = require('util')

class HH extends Component {
  static async getInitialProps(ctx) {
    const { store } = ctx
    // if (!store.getState().fetchOnce) {
    //   store.dispatch(fetchOnce())
    //   store.dispatch(getHome(ctx))
    // }
    // setTimeout(() => {
    //   return { homea: 'homepppp11' }
    // },2000)
    // const res = await http.callApi('home1', 'get', {}, ctx)
    // if (!res.data && ctx.res) {
    //   ctx.res.statusCode = 404
    // }
    // return { data: res.data }


    // const data = await http.callApi('home1', 'get', {}, ctx)
    // if ((!data || !data.data) && ctx && ctx.res) ctx.res.statusCode = 404
    // ctx.res.end('11')
    // return { data: data.data }

    try {
      const res = await http.callApi('home', 'get', {}, ctx)
      const data = res.data
      return { data }
    } catch (error) {
      // ctx.res.statusCode = 404
      // ctx.res.end('Not found')
      const err = util.inspect(error)
      return { err }
    }
  }

  componentDidMount() {
    console.log(this.props, 'pageDid')
  }

  render() {
    if (!this.props.data) {
      return <div>123{console.log(this.props.err)}</div>
    }
    return (
      <Home {...this.props} />
    )
  }
}

export default withRedux(reduxPage, state => ({ home: state.home }))(HH)
