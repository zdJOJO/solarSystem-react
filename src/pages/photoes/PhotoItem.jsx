import React, { useState, useEffect, useRef } from 'react';
import { getRandomName } from '@/global';
import loadingImg from '../../../assets/images/loading.svg';


const PhotoItem = ({ photoItem, ctgId }) => {

  const [isLoadSuccessful, set_isLoadSuccesful] = useState(false);
  const [isLoadImg, set_isLoadImg] = useState(true);

  const imgEle = useRef();

  let offsetTop = 0; // 图片距离顶部距离
  let scrollTop = 0; // 当前scroll的高度
  let viewHeight = document.body.clientHeight - 100; // 可见区域的高度

  useEffect(() => {
    let imgContainer = document.getElementById(`waterBox-${ctgId}`);
    changeImgSrc(imgContainer)
    imgContainer.addEventListener('scroll', (e) => { changeImgSrc(imgContainer) })
    return imgContainer.removeEventListener('scroll', e => {
      console.log('已移除');
    })
  }, [photoItem.id, ctgId])

  const changeImgSrc = (imgContainer) => {
    if (!imgEle || !imgEle.current || isLoadSuccessful) return;
    setTimeout(() => {
      offsetTop = imgEle.current.offsetTop;
      scrollTop = imgContainer.scrollTop;
      if ((scrollTop + viewHeight >= offsetTop) && imgEle.current.src === loadingImg) {
        imgEle.current.src = imgEle.current.dataset.src;
      }
    }, 0)
  }

  const handleImageLoaded = () => {
    set_isLoadSuccesful(true);
  }

  const handleImageErrored = () => {
    set_isLoadSuccesful(false);
    set_isLoadImg(true)
  }

  return (
    <div className="item">
      <img
        ref={imgEle}
        data-src={photoItem.img_url}
        src={loadingImg}
        onLoad={handleImageLoaded}
        onError={handleImageErrored}
      />
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
}
export default React.memo(PhotoItem);