import React from 'react'
import uuid from 'uuid/v4'
import { WrapLink, MultiColorIco } from '@components'

// 多色图片的path数量
const pathNum = [3, 9, 12, 18]
export default ({ list = [{ id: 0, title: '不限额度' }] }) => (
  <div style={{ height: '1.4rem' }} className="bg-white flex ai-center mb20">
    {
      list.slice(0, 4).map((item, index) => (
        <WrapLink
          key={uuid()}
          className="equal flex h86 column jc-between ai-center home-limit-right-border"
          href="/1-loan/1-home"
          as={`/loan?limit=${item.id}`}
        >
          <MultiColorIco ico={`i-loan-limit-${index} ${index === 0 ? 'font40 mt10' : 'font56'}`} num={pathNum[index]} />
          <span className="lh100 font24 c666">{item.title}</span>
        </WrapLink>
      ))
    }
  </div>
)
