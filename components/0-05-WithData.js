import React from 'react'
import reduxPage from '@reduxPage'
import { getHome } from '@actions'

const wrap = ChildComponent =>
  class extends React.Component {
    static async getInitialProps(ctx) {
      // console.log(ctx, 'cc')
      const { store } = ctx
      // store.dispatch(getHome(ctx))
    }

    componentDidMount() {
      console.log('只执行一次')
    }
    render() {
      return (
        <ChildComponent {...this.props} />
      )
    }
  }

export default com => reduxPage(wrap(com))
