import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SIZE = {
  large: 'lg',
  medium: 'md',
  small: 'sm'
};

export default class Avatar extends Component {
  static propTypes = {
    size: PropTypes.string,
    url: PropTypes.string.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    size: SIZE.medium,
    className: ''
  };

  render() {
    const { size, url, className } = this.props;
    const classStr = classnames(className, 'm-avatar', `m-avatar--${SIZE[size] || SIZE.medium}`);
    return (
      <div
        className={classStr}
        style={{ 
          backgroundImage: 'url(https://ee.bytedance.net/ratak/employees/1012319/avatar/)' }}
      />
    );
  }
}
