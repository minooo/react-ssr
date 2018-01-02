import { Btn } from '@components'

export default ({title, onSwitch, keyVal, stateVal, yes='是', no='否'}) => (
  <Btn
    hor
    btnClass="h80 border-bottom"
    con={
      <div className="flex jc-between font28 equal pr25">
        <div className="c666">{title}</div>
        <div className="c-main flex ai-center">{stateVal ? yes : no}<i className="i-down font10 ml10" /></div>
      </div>
    }
    onClick={() => onSwitch(keyVal)}
  />
)
