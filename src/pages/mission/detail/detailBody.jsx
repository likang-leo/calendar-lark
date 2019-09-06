import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Input } from 'antd';

const { TextArea } = Input;

@observer
export default class DetailBody extends Component {
  handleOnDescChange = (data, e) => {
    data.changeDesc(e.target.value);
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <div>
          <h3>{data.title}</h3>
        </div>
        <br />
        <div>
          <TextArea
            rows="5"
            value={data.description}
            onChange={this.handleOnDescChange.bind(this, data)}
          />
        </div>
      </div>
    );
  }
}
