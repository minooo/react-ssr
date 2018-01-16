import uuid from 'uuid/v4'
import { Btn } from '@components'

export default ({
  title, list, onClick, border,
}) => (
  <div className={`${border ? 'border-bottom-one' : ''}`}>
    <div className="ptb20 font28 c999">{title}</div>
    <div style={{ marginRight: '-0.2rem', paddingBottom: '0.05rem' }} className="flex wrap">
      {
        list.map(item => (
          <Btn
            key={uuid()}
            hor
            style={{ minWidth: '1.36rem' }}
            btnClass="r4 bg-border h50 plr20 mr20 mb20"
            con={
              <span className="font24 c333">
                {item.content ? item.content.substring(0, 9) : item.substring(0, 9)}
              </span>
            }
            onClick={() => onClick(item.content || item)}
          />
        ))
      }
    </div>
  </div>
)
