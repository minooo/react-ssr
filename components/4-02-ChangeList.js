import uuid from 'uuid/v4'

export default ({
  title, types, stateVal, keyVal, onChange,
}) => (
  types && types.length > 0 ?
    <div className="h80 border-bottom flex jc-between ai-center">
      <div className="font28 c666">{title}</div>
      <div className="equal relative plr30">
        <div className="c-main flex jc-end ai-center">
          <div>{types[types.findIndex(item => item.id === parseInt(stateVal, 0)) > -1 ? types.findIndex(item => item.id === parseInt(stateVal, 0)) : 0].name}</div>
          <i className="i-down font10 ml10" />
        </div>
        <select onChange={e => onChange(e, keyVal)} value={stateVal} className="font28 me-select">
          { types.map(item => <option key={uuid()} value={item.id}>{item.name}</option>) }
        </select>
      </div>
    </div> : null
)
