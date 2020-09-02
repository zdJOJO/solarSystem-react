import React from 'react';
import { getRandomName } from '@/global';


const PhotoItem = ({ photoItem }) => (
  <div className="item">
    <img className="photoItemImage" src={photoItem.img_url} />
    <div style={{ padding: 10 }}>
      <p className="title">{photoItem.title}</p>
      <p className="subtitle">{photoItem.zhaiyao}</p>
      <div className="photoItemBottom">
        <div className="user">
          <i className="el-icon-s-custom" />
          <span style={{ padding: 5 }}>{photoItem.admin || getRandomName()}</span>
          <span className="tag">{photoItem.tags || '默认'}</span>
        </div>
      </div>
    </div>
  </div>
)
export default PhotoItem;