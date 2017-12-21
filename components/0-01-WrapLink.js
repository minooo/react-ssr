import React, { PureComponent } from 'react'
import Link from 'next/link'

// 判断是否为站内路由
const isLink = path => path && (
  (typeof path === 'string' && !path.includes('http')) ||
  (Object.prototype.toString.call(path) === '[object Object]')
)

// 判断是否为站外链接
const isHref = path => path && (typeof path === 'string' && path.includes('http'))

export default class extends PureComponent {
  onClick = () => {
    const { onClick, clickparams } = this.props
    if (onClick) {
      onClick(clickparams)
    }
  }

  render() {
    const {
      href, children, className, as, style, ...rest
    } = this.props
    if (isLink(href)) {
      return <Link href={href} as={as}><a className={className} style={style} {...rest}>{children}</a></Link>
    } else if (isHref(href)) {
      return <a href={href} className={className} style={style} {...rest}>{children}</a>
    }
    return (
      <div
        onClick={this.onClick}
        tabIndex="0"
        role="button"
        onKeyDown={this.onClick}
        className={className}
        style={style}
      >
        {children}
      </div>
    )
  }
}

