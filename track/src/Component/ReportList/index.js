import React, { Component } from 'react';
import { 
  Table,
  Button,
 } from 'antd';
 import {
  partial
 } from 'lodash'
import './index.css';
class ReportList extends Component  {
  state = {
    list: []
  }

  componentDidMount() {
    this.getReportData()
  }

  deleteData = (id) => {
    fetch(`http://easinote-dev.test.seewo.com:7001/report?id=${id}&type=delete`,{
      method: 'get',
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      }
    }).then(res => res.json())
    .then(data => {
      if(data.errcode !== 0) {
        return 
      }
      this.getReportData()
    })
  }

  getReportData = () => {
    const {
      url,
      projectId
    } = this.props
   
    fetch('http://easinote-dev.test.seewo.com:7001/report',{
      method: 'get',
      data: {
        url: url,
        projectId: projectId
      },
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({ list: res })
    })
  }

  render() {
    const columns = [{
      title: '项目id',
      key: 'projectId',
      dataIndex: 'projectId',
    },{
      title: '项目url',
      key: 'projectUrl',
      dataIndex: 'projectUrl',
    },{
      title: '模块Id',
      key: 'currentModuleId',
      dataIndex: 'currentModuleId',
    }, {
      title: '事件',
      key: 'event',
      dataIndex: 'event',
    }, {
      title: '埋点dom id',
      key: 'xpathId',
      dataIndex: 'xpathId',
    }, {
      title: '埋点图片',
      key: 'image',
      dataIndex: 'image',
      render: text => <img className="track-img" src={text} />,
    }, {
      title: '操作',
      key: '_id',
      dataIndex: '_id',
      render: text => <div><Button onClick={partial(this.deleteData, text)}>删除</Button></div>
    }]
    return (
      <Table columns={columns} dataSource={this.state.list}></Table>
    )
  }
}

export default ReportList