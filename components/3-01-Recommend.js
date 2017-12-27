import { WrapLink } from '@components'
import { imgUrl } from '@utils'

export default ({ list }) => (
  <div style={{ height: '44vw', maxHeight: '4.4rem' }} className="flex card-top-bg bg-white border-top">
    <WrapLink
      className="equal-no flex column jc-center ai-center overflow-h plr10"
      style={{ width: '50%', borderRight: '0.01rem solid #f3f3f3' }}
      href="/2-card/3-detail"
      as={`/card/${list[0].id}`}
    >
      <div className="font28 c333 text-overflow-1">{list[0].name}</div>
      <div className="font22 c999 text-overflow-2 mt15 mb15">{list[0].description}</div>
      <div
        className="log-bg r4 overflow-h"
        style={{
          width: '35.73vw', maxWidth: '3.573rem', height: '22.4vw', maxHeight: '2.24rem',
        }}
      >
        <img src={imgUrl(list[0].thumb)} className="h-100" alt="" />
      </div>
    </WrapLink>
    <div className="equal-no" style={{ width: '50%' }}>
      <WrapLink
        style={{ height: '50%' }}
        className="plr25 flex column jc-center"
        href="/2-card/3-detail"
        as={`/card/${list[1].id}`}
      >
        <div className="font28 c333 text-overflow-1 lh150">{list[1].name}</div>
        <div className="flex">
          <div className="equal font22 c999 text-overflow-2 lh150">{list[1].description}</div>
          <div
            className="log-bg r4 overflow-h"
            style={{
              width: '18.266vw',
              maxWidth: '1.8266rem',
              height: '11.466vw',
              maxHeight: '1.1466rem',
            }}
          >
            <img src={imgUrl(list[1].thumb)} className="h-100" alt="" />
          </div>
        </div>
      </WrapLink>
      <WrapLink
        style={{ height: '50%', borderTop: '0.01rem solid #f3f3f3' }}
        className="plr25 flex column jc-center"
        href="/2-card/3-detail"
        as={`/card/${list[2].id}`}
      >
        <div className="font28 c333 text-overflow-1 lh150">{list[2].name}</div>
        <div className="flex">
          <div className="equal font22 c999 text-overflow-2 lh150">{list[2].description}</div>
          <div
            className="log-bg r4 overflow-h"
            style={{
              width: '18.266vw',
              maxWidth: '1.8266rem',
              height: '11.466vw',
              maxHeight: '1.1466rem',
            }}
          >
            <img src={imgUrl(list[2].thumb)} className="h-100" alt="" />
          </div>
        </div>
      </WrapLink>
    </div>
  </div>
)
