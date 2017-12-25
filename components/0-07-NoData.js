export default ({ text }) => (
  <div
    style={{
      width: '65%',
      margin: '2.4em auto 1.5em',
    }}
    className="c999 border-top text-center"
  >
    <span
      style={{
        position: 'relative',
        top: '-0.6em',
      }}
      className="plr15 lh100 bg-body c999"
    >
      {text || '没有更多数据了'}
    </span>
  </div>
)
