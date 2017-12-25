import React from 'react'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
import uuid from 'uuid/v4'
import { Toast } from 'antd-mobile'
import { Loading, NoData, NoDataIco } from '@components'
import { http } from '@utils'

export default class extends React.Component {
  state = {
    listData: [],
    dataNoMore: false,
    isLoading: false,
    netBad: false,
  }
  componentDidMount() {
    this.loadMore(this.props, false)
  }
  componentWillReceiveProps(nextProps) {
    const diffDataPath = !isEqual(this.props.dataPath, nextProps.dataPath)
    const diffDataParam = !isEqual(this.props.dataParam, nextProps.dataParam)
    if (diffDataPath || diffDataParam) {
      this.loadMore(nextProps, true)
    }
  }

  onScroll = debounce(() => {
    this.scrollHandle(this.scrollDiv)
  }, 300)
  loadMore = (props, isNewStart) => {
    const {
      dataPath, dataParam = {}, take = 10, dataName,
    } = props
    const { isLoading, dataNoMore, listData } = this.state
    if (!isNewStart && (isLoading || dataNoMore)) return
    if (isNewStart) {
      this.scrollDiv.scrollTop = 0
      Toast.loading('加载中...')
    }
    this.setState(() => ({ isLoading: true }), () => {
      const skip = isNewStart ? 0 : listData.length
      http.get(dataPath, { ...dataParam, skip, take }).then((response) => {
        if (isNewStart) Toast.hide()

        // 这里的判断条件根据具体的接口情况而调整
        if (response.code === 200 && response.success) {
          const data = response.data[dataName]
          const dataNoMore = data ? data.length < take : true

          // 记录滚动条位置
          const h = this.scrollDiv.scrollTop
          this.setState(preState => ({
            listData: isNewStart ? data : preState.listData.concat(data || []),
            dataNoMore,
            isLoading: false,
          }), () => { this.scrollDiv.scrollTop = h })
        } else {
          Toast.offline(response.msg ? response.msg : '抱歉，请求异常，请稍后再试！')
        }
      }).catch((err) => { this.setState(() => ({ netBad: true })); console.info(err) })
    })
  }

  scrollHandle = (e) => {
    // scrollTop 元素卷起来的高度
    // scrollHeight 元素总高度，包括被overflow 遮挡的不可见部分的高度
    // clientHeight 元素的可见高度
    if (this.state.isLoading || this.state.dataNoMore) return
    const scrollPercent = Math.floor(e.scrollHeight - e.scrollTop - e.clientHeight)
    if (scrollPercent < 100) {
      this.loadMore(this.props, false)
    }
  }

  render() {
    const {
      children, renderRow, noDataIco = {}, className, listClass,
    } = this.props
    const { listData, dataNoMore, netBad } = this.state
    return (
      <div
        className={`${className} overflow-y bg-body`}
        onScroll={this.onScroll}
        ref={ele => this.scrollDiv = ele}
      >
        {children}
        {listData.length > 0 && listData.map(item => <div key={uuid()} className={listClass || ''}>{renderRow(item)}</div>)}
        {
          netBad ?
            <div className="flex column ai-center ptb30 c999">
              <div>抱歉，网络请求错误，请稍后再试！</div>
              <a href={window.location.href} className="font-28 c333 pt20">重新加载</a>
            </div> :
            (dataNoMore ?
              (
                listData.length > 0 ?
                  <NoData text={noDataIco.text2 ? noDataIco.text2 : '没有更多相关数据了'} /> :
                  (
                    noDataIco.ico ?
                      <NoDataIco ico={noDataIco.ico} text={noDataIco.text1} /> :
                      <NoData text={noDataIco.text1 ? noDataIco.text1 : '暂无数据'} />
                  )
              )
              : <Loading />
            )
        }
      </div>
    )
  }
}

/*
* 示例用法
* className listClass dataParam take noDataIco 为非必需参数
<ScrollLoad
  className="height100"
  listClass="mb20"
  dataPath={`/course/${course.id}/comment`}
  dataParam={{type: 'recommend'}}
  take={10}
  dataName="comment"
  renderRow={item => <ArticleComment myId={user.id} onLike={() => this.onLike(item.id)} {...item}/>}
  noDataIco={{ico:'i-share', text1:'还木有人评论哦', text2:'没有更多评论啦'}}
/>
* */
