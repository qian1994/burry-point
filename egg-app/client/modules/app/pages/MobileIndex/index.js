import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './style.less';

class MobileIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }
  add = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    return (
      <div className='container'>
        <div className='22'>我是一个好人</div>
        <div>好的吧</div>
        <div>好不好呢</div>
        <div>好吧</div>
        <div>不好</div>
        <div> 
          <div  className='haello'>
            <div>好人么</div>
            <div>是好人</div>
            <div>老实人的把</div>
          </div>
        </div>
      </div>
    );
  }
}

export default MobileIndex;
