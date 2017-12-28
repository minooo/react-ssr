import Document, { Head, Main, NextScript } from 'next/document'

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
          <script src="https://cdn.bootcss.com/moment.js/2.17.1/moment.min.js" />
          <script src="https://cdn.bootcss.com/moment.js/2.17.1/locale/zh-cn.js" />
          <script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js" />
          <script src="/static/scripts/hd.js" />
          <script src="/static/scripts/local-storage.js" />
          <link rel="stylesheet" href="/static/styles/antd_mobile_min.css" />
          <link rel="stylesheet" href="/static/styles/app_min.css" />
          <title>嘟嘟金融</title>
        </Head>
        <body>
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
