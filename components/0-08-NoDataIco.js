export default ({ text, ico }) => (
  <div style={{ padding: '1rem 0' }} className="flex column jc-center ai-center bg-white">
    <i style={{ fontSize: '1rem', color: '#dfe5e3', marginBottom: '0.5rem' }} className={ico} />
    <span className="c999 font-28">{text}</span>
  </div>
)
