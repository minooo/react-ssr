import { distanceInWordsToNow } from 'date-fns'
import cn from 'date-fns/locale/zh_cn'
import { WrapLink } from '@components'
import { imgUrl } from '@utils'

export default data => (
  <WrapLink
    className={`plr25 pt25 bg-white block relative ${data.border ? 'border-bottom' : ''}`}
    href={data.isLoan ? '/1-loan/2-detail' : '/2-card/3-detail'}
    as={`/${data.isLoan ? 'loan' : 'card'}/${data.id}`}
  >
    <div className="flex">
      <div className="equal flex overflow-h">
        <div
          style={{ width: data.isLoan ? '1.3rem' : '2.074rem', height: '1.3rem' }}
          className="log-bg r4 mr20 equal-no overflow-h"
        >
          <img
            src={imgUrl(data.thumb)}
            className="h-100"
            alt=""
          />
        </div>
        <div className="overflow-h flex column jc-between">
          <div className={`c333 text-overflow-one lh100 bold ${data.isLoan ? 'font28' : 'font30'}`}>
            {data.name}
          </div>
          {
            data.isLoan ?
              <div>
                <span className="font24 c666 lh100 mr20">
                  {data.interest_rate_method}费率：<span className="c-second">{data.interest_rate}%</span>
                </span>
              </div> :
              <div>
                {
                  data.cash_withdrawal_ratio &&
                  <span className="font24 c666 lh100 mr20">提现：<span className="c-second">{data.cash_withdrawal_ratio}%</span></span>
                }
                {
                  data.free_of_interest_period_end &&
                  <span className="font24 c666 lh100">免息：<span className="c-second">{data.free_of_interest_period}天</span></span>
                }
              </div>
          }
          {
            data.created_at &&
            <div className="font24 c666">{data.type === 'favorite' ? '收藏' : '浏览'}时间：{distanceInWordsToNow(data.created_at, { locale: cn })}前</div>
          }
        </div>
      </div>
      <div className="flex pl20 ai-center">
        <i className="i-right font24 c999" />
      </div>
    </div>
    <div className="h20" />
  </WrapLink>
)
