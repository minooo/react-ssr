import { withRouter } from 'next/router'

// typically you want to use `next/link` for this usecase
// but this example shows how you can also access the router
// using the withRouter utility.

const ActiveLink = ({
  ico, text, router, href, as = href,
}) => {
  const handleClick = (e) => {
    e.preventDefault()
    router.push(href, as)
  }

  return (
    <a
      href={href}
      as={as}
      onClick={handleClick}
      className={`equal flex column jc-center ai-center ${router.pathname === href ? 'c-main' : 'c-ccc'}`}
    >
      <i className={`${ico} font44 mb10`} />
      <span className="font26 lh100">{text}</span>
    </a>
  )
}

export default withRouter(ActiveLink)
