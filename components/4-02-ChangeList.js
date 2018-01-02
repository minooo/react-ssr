import uuid from 'uuid/v4'

export default ({title, types, stateVal, keyVal, onChange}) => (
  <div className="h80 border-bottom flex jc-between ai-center">
    <div className="font28 c666">{title}</div>
    <div className="equal relative plr30">
      <div className="c-main flex jc-end ai-center">
        <div>{types[stateVal]}</div>
        <i className="i-down font10 ml10" />
      </div>
      <select onChange={e => onChange(e, keyVal)} value={stateVal} className="font28 me-select">
        { types.map((item, index) => <option key={uuid()} value={index}>{item}</option>) }
      </select>
    </div>
  </div>
)
