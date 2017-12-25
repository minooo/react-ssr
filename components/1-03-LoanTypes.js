import React from 'react'
import uuid from 'uuid/v4'
import { WrapLink } from '@components'

export default ({ list = [{ id: 0, title: '不限额度', description: '想贷就贷' }] }) => (
  <div className="flex bg-white plr25 ptb30 overflow-x home-lt-box mb20">
    {
      list.map((item, index) => (
        <WrapLink
          key={uuid()}
          className={`flex equal-no w182 h120 relative mr15 home-loan-type-bg-${index % 3}`}
          href="/1-loan/1-home"
          as={`/loan?type=${item.id}`}
        >
          <div className="font30 c-white text-overflow-1 lh100 text-center home-lt-box-title">
            {item.title}
          </div>
          <div className="font20 c-white text-overflow-1 lh100 text-center home-lt-box-caption">
            {item.description}
          </div>
        </WrapLink>
      ))
    }
  </div>
)
