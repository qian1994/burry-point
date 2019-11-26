import React from 'react';
import HTML from 'html-parse-stringify';
import {
  Form,
  Tree,
  Button,
  Input,
  Icon,
  Select,
  message,
} from "antd";
import {
  partial
} from 'lodash'
import ReportList from './Component/ReportList'
import "antd/es/tree/style/css"
import 'antd/dist/antd.css';
import './App.css';
const { DirectoryTree, TreeNode } = Tree;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
class App extends React.Component {
  state = {
    domTree: [],
    buryPointData: {},
    currentModuleId: ''
  }
  editUrl = 'http://easinote-dev.test.seewo.com/mobile/coursewareList'

  componentDidMount() {
    window.addEventListener('message', (event) => {
      if (!this.editUrl.includes(event.origin)) { return }
      
      if (event.data.includes('selectId&&')) {
        const data = JSON.parse(event.data)
        const xpathData = data.id.replace('selectId&&', '').split('&&')
        this.submitReportData(xpathData[0], xpathData[1], data.img)
        return
      }
      const domTree = HTML.parse(event.data)
      this.setState({ domTree })
    }, false)
  }

  onSelect = (keys) => {
    if(keys[0].includes('textNode')) { return }
    let id = keys[0].split("::")[1]
    let moudleId = keys[0].split("::")[0]
    document.getElementById("iframe").contentWindow.postMessage(id, this.editUrl)
    this.setState({ buryPointData: {}, currentModuleId: moudleId })
  }

  renderTreeNode = (data, parentId) => {
    return data.map((item, index) => {
      const selfId = index !== 0 ? `${item.name}:nth-child(${index + 1})` : `${item.name}`
      if (item.children) {
        return <TreeNode 
          title='container' 
          key={`${item.attrs['cvte-track-id']}::${parentId}>${selfId}`}>
          {this.renderTreeNode(item.children, `${parentId}>${selfId}`)}
        </TreeNode>
      }
      return <TreeNode 
        title={item.type} 
        key={`${parentId}/textNode`} 
        isLeaf ></TreeNode>
    })
  }

  submit = (event) => {
    document.getElementById("iframe").contentWindow.postMessage('getSelectXpath', this.editUrl)
  }

  submitReportData = (xpathId, text, img) => {
    const { buryPointData, currentModuleId } = this.state
    const param = {
      ...buryPointData,
      xpathId,
      text,
      currentModuleId,
      projectId: '',
      projectUrl: this.editUrl,
      image: img
    }
    console.log(param)
    this.postReportData(param)
  }

  postReportData = (param) => {
    fetch('http://easinote-dev.test.seewo.com:7001/report',{
      method: 'post',
      body: JSON.stringify(param),
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      }
    }).then(res => res.json())
    .then(data => {
      if(data.errcode !== 0) {
        message.success('存储失败，请重试')
        return 
      }
      message.success('存储成功')
    })
  }

  onChange = (name, e) => {
    const { buryPointData } = this.state
    let value = e
    if(name === 'name') {
      value = e.target.value
    }
    buryPointData[name] = value
    this.setState({
      buryPointData
    }) 
  }

  render() {
    const {
      currentModuleId
    } = this.state
    return (
      <div className="App">
        <div className="dom-tree">
          <div className="tree-node">
            <DirectoryTree
              onSelect={this.onSelect}>
              {this.state.domTree
                && this.state.domTree.length
                && this.renderTreeNode(this.state.domTree, '#root')}
            </DirectoryTree>
          </div>
          <div className="iframe">
            <iframe id="iframe" title="edit-container" src={this.editUrl}></iframe>
          </div>
        </div>
        <div className="edit-form">
          <Form {...formItemLayout} onSubmit={this.submit}>
            <Form.Item label="模块Id">
              <Input value={currentModuleId} disabled></Input>
            </Form.Item>
            <Form.Item label="埋点名称">
                <Input onChange={partial(this.onChange, 'name')}></Input>
            </Form.Item>
            <Form.Item label="埋点事件">
              <Select
                onChange={partial(this.onChange, 'event')}
              >
                {['click', 'exporse'].map(item => {
                  return <Option key={item} value={item}>{item}</Option>
                })}
              </Select>
            </Form.Item>
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                <Icon type="plus" /> Add field
              </Button>
            </Form.Item>
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button disabled={!currentModuleId} type="primary" onClick={this.submit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <ReportList url={this.editUrl} projectId='22'></ReportList>
      </div>
    );
  }
}

const WrappedAppFieldSet = Form.create({ name: 'App_form_item' })(App);

export default WrappedAppFieldSet;
