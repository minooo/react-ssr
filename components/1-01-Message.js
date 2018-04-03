import React from 'react'
import { Carousel } from 'antd-mobile'
import uuid from 'uuid/v4'
import { Btn } from '@components'

export default ({ list = ['欢迎来到嘟嘟e贷'] }) => (
  <div className="h68 bg-white r4 flex ai-center home-message">
    <Btn
      ver
      btnClass="plr20"
      icoClass="i-tip font34 c-333"
    />
    <Carousel
      style={{ height: '0.3rem' }}
      className="equal"
      vertical
      dots={false}
      dragging={false}
      swiping={false}
      autoplay
      infinite
      speed={350}
      autoplayInterval={3000}
      resetAutoplay={false}
    >
      {list.map(item => (
        <div
          style={{ height: '0.3rem', lineHeight: '0.3rem' }}
          className="text-overflow-one font24 c333"
          key={uuid()}
        >
          {item}
        </div>
      ))}
    </Carousel>
    <Btn
      hor
      style={{ borderLeft: '1px dashed #ddd' }}
      btnClass="h42 pl15 pr20 c-second ml10"
      href="/1-loan/3-goLoan"
      as="/loan/go"
      icoClass="i-add font-28 pr5"
      con={<span className="font24 lh100">我要贷</span>}
    />
  </div>
)
