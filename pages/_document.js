import Document, { Head, Main, NextScript } from 'next/document'

const pro = process.env.NODE_ENV === 'production'
const test = process.env.NODE_TEST === 'test'
const path = pro ? (test ? '' : 'http://public.duduapp.net/finance/static') : ''

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const {
      html, head, errorHtml, chunks,
    } = renderPage()
    return {
      html, head, errorHtml, chunks,
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="stylesheet" href={`${path}/static/styles/antd_mobile_min.css`} />
          <link rel="stylesheet" href={`${path}/static/styles/app_min.css?1`} />
          <title>嘟嘟金融</title>
        </Head>
        <body>
          {this.props.customValue}
          <Main />
          <NextScript />
          <script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js" />
          <script src={`${path}/static/scripts/hd.js`} />
          <script src={`${path}/static/scripts/local-storage.js`} />
        </body>
      </html>
    )
  }
}
