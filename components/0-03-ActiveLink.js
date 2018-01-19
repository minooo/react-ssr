import { withRouter } from 'next/router'
import Link from 'next/link'

// typically you want to use `next/link` for this usecase
// but this example shows how you can also access the router
// using the withRouter utility.

const ActiveLink = ({
  ico, text, router, href, as = href, ...rest
}) => (
  <Link prefetch href={href} as={as}>
    <a className={`equal flex column jc-center ai-center ${router.pathname === href ? 'c-main' : 'c-ccc'}`} {...rest}>
      <i className={`${ico} font44 mb10`} />
      <span className="font26 lh100">{text}</span>
    </a>
  </Link>
)

export default withRouter(ActiveLink)
