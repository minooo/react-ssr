import uuid from 'uuid/v4'

export default ({ ico, num }) => (
  <i className={ico}>
    {Array(num).fill(1).map((item, index) => <span key={uuid()} className={`path${index + 1}`} />)}
  </i>
)
