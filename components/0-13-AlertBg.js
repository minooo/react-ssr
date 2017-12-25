export default ({
  zIndex = 10, alpha = 0.4, top = 0, right = 0, bottom = 0, left = 0, onClick,
}) => (
  <div
    role="button"
    tabIndex="0"
    onKeyDown={onClick}
    onClick={onClick}
    style={{
      position: 'fixed',
      zIndex,
      background: `rgba(0,0,0, ${alpha})`,
      top,
      right,
      bottom,
      left,
    }}
  />
)
