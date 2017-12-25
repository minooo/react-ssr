import { Btn } from '@components'

export default ({ isFavorite, onLike, onApply }) => (
  <div className="flex h110 bg-white pr25 ai-center border-top-shadow relative z-index10">
    <Btn
      ver
      btnClass="w130"
      icoClass={`${isFavorite ? 'i-like c-main' : 'i-like-o c999'} font36 mb10`}
      con={<span className="font26 c999 lh100">{ isFavorite ? '已收藏' : '收藏' }</span>}
      onClick={onLike}
    />
    <Btn
      hor
      btnClass="equal r4 bg-main h80"
      con={<span className="font28 c-white">马上申请</span>}
      onClick={onApply}
    />
  </div>
)
