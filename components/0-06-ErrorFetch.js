import React from 'react'

export default class extends React.Component {
  componentDidMount() {
    console.info(this.props.err)
  }
  render() {
    return (
      <div>服务器获取数据错误，请稍后再试。</div>
    )
  }
}

