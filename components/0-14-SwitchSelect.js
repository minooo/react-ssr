import React, { Component } from 'react'
import isEqual from 'lodash/isEqual'
import uuid from 'uuid/v4'
import { Btn, AlertBg } from '@components'

export default class extends Component {
  state = {
    focus: -1,
    currentTitle: null,
    currentSelectList: null,
    selectList: null,
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.currentTitle, nextProps.currentTitle)) {
      this.setState(() => ({
        currentTitle: nextProps.currentTitle,
        selectList: nextProps.selectList,
      }))
    }
  }

  onTitleClick = (key, index) => {
    const { selectList } = this.state
    const currentSelectList = (selectList && selectList.length > 0) ?
      selectList.find(item => item.key === key) : null
    this.setState(pre => ({
      focus: pre.focus !== index ? index : -1,
      currentSelectList,
    }))
  }

  onSelectClick = (key, id, title, banner) => {
    const { currentTitle } = this.state
    const { onSelect } = this.props
    const newCurrentTitle = currentTitle.map((item) => {
      if (item.key === key) {
        return {
          key, id, title, ...(banner && { banner }),
        }
      }
      return item
    })

    this.setState(() => ({
      currentTitle: newCurrentTitle,
      focus: -1,
    }))

    // 重新获取数据
    onSelect(newCurrentTitle)
  }

  onAlertBgClick = () => {
    this.setState(() => ({ focus: -1 }))
  }

  render() {
    const { focus, currentTitle, currentSelectList } = this.state
    return (
      <div className="h90 relative flex ai-center bg-white" style={{ borderBottom: '0.01rem solid #ddd' }}>
        {
          currentTitle && currentTitle.length > 0 && currentTitle.map((item, index) => (
            <Btn
              key={uuid()}
              hor
              style={{ borderRight: index !== currentTitle.length - 1 ? '0.01rem solid #e5e5e5' : 'none' }}
              btnClass="bg-input equal h44 row-reverse overflow-h"
              icoClass={`${focus === index ? 'i-up c-main' : 'i-down c333'} font12 ml10`}
              con={<span className={`${focus === index ? 'c-main' : 'c333'} text-center font28 text-overflow-one`}>{item.title}</span>}
              onClick={() => this.onTitleClick(item.key, index)}
            />
          ))
        }
        {
          focus !== -1 && currentSelectList &&
          <div
            style={{
              position: 'absolute',
              zIndex: 50,
              top: '0.9rem',
              maxHeight: '4.7rem',
            }}
            className="w-100 bg-white overflow-y plr25"
          >
            {
              currentSelectList.list && currentSelectList.list.length > 0 &&
              currentSelectList.list.map(item => (
                <Btn
                  key={uuid()}
                  style={{ lineHeight: '0.71rem' }}
                  btnClass="border-bottom h72"
                  con={
                    !item.description ?
                      <div
                        className={`${currentTitle.some(doc => doc.key === currentSelectList.key && doc.id === item.id) ? 'c-main' : 'c666'}`}
                      >{item.title}
                      </div> :
                      <div className="flex ai-center">
                        <div
                          style={{ width: '2rem' }}
                          className={`${currentTitle.some(doc => doc.key === currentSelectList.key && doc.id === item.id) ? 'c-main' : 'c666'}`}
                        >
                          {item.title}
                        </div>
                        <div className="equal text-overflow-one font28 c999">{item.description}</div>
                      </div>
                  }
                  onClick={() => this.onSelectClick(currentSelectList.key, item.id, item.title, item.banner)}
                />
              ))
            }
          </div>
        }
        {
          focus !== -1 &&
          <AlertBg
            top="0.9rem"
            zIndex={20}
            onClick={this.onAlertBgClick}
          />
        }
      </div>
    )
  }
}
