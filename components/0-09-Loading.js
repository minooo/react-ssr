export default ({ text }) => (
  <div className="h100 flex jc-center ai-center">
    <i className="i-loading rotate font32 c999" />&nbsp;
    <span>{text || '加载中...'}</span>
  </div>
)
