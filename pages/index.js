import React, { Component } from 'react'
import { Button } from 'antd-mobile'
import { Layout, Nav, WithData } from '@components'
import { http } from '@utils'

@WithData
export default class extends Component {
  static async getInitialProps() {
    // eslint-disable-next-line no-undef
    // const res = await http.get('https://api.github.com/repos/developit/preact')
    // const json = await res
    return { stars: 123 }
  }
  state={}
  componentDidMount() {
    console.log(this.props, 'haha')
  }
  render() {
    return (
      <Layout title="首页">
        <div className="equal">
          123
        </div>
        <Nav />
      </Layout>
    )
  }
}
