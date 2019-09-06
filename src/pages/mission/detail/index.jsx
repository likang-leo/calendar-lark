import React from 'react';
import { observer, inject } from 'mobx-react';
import { Icon } from 'antd';
import moment from 'moment';
import DetailBody from './detailBody';

function Detail(props) {
  const { id, dataSource, onClose } = props;
  const item = dataSource.todos.find(v => v.id === id);
  if (!item) {
    onClose();
    return null;
  }

  const { createTime } = item;

  return (
    <div className="mission-detail">
      <div className="detail-header">
        <span>Detail</span>
        {createTime && (
          <span className="time">
            &nbsp;&nbsp;-&nbsp;&nbsp;{moment(item.createTime).format('YYYY-MM-DD HH:mm')}
          </span>
        )}
        <div className="btn-close" onClick={onClose}>
          <Icon type="close" />
        </div>
      </div>
      <div className="detail-body">
        <DetailBody data={item} />
      </div>
    </div>
  );
}

export default inject('store')(observer(Detail));
