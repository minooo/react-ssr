import React from 'react'
import reduxPage from '@reduxPage'
import { getHome } from '@actions'

const wrap = ChildComponent =>
  class extends React.Component {
    // ctx 里都有什么
    // err req res pathname query asPath isServer
    static async getInitialProps(ctx) {
      const { store } = ctx
      store.dispatch(getHome(ctx))
    }

    componentDidMount() {
      console.log('只执行一次')
    }

    componentWillReceiveProps(nextProps) {

    }
    render() {
      return (
        <ChildComponent {...this.props} />
      )
    }
  }

export default com => reduxPage(wrap(com))
