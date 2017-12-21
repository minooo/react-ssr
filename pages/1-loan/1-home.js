import React, { Component } from 'react'
import { Button } from 'antd-mobile'
import { Layout, Nav } from '@components'

export default class extends Component {
  state={}
  componentDidMount() {
  }
  render() {
    return (
      <Layout title="贷款">
        <div className="equal">
          123贷款
        </div>
        <Nav />
      </Layout>
    )
  }
}
