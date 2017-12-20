import React, { Component } from 'react'
import { Button } from 'antd-mobile'
import { WrapLink } from '@components'

export default class extends Component {
  state={}
  render() {
    return (
      <div>
        <WrapLink className="c-main" path="/2-containers/01-Home/index">1234</WrapLink>
        <i className="i-search" />
        <Button type="primary">123345</Button>
      </div>
    )
  }
}
