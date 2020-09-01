import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";

import { Button } from 'antd-mobile';

import BaseSkeleton from '../../components/common/BaseSkeleton/index';
import { NEWS } from '../../httpConfig/api';
import http from '../../httpConfig/http';
import { transformTime, ROUTE_PATH } from '../../global';

import './index.less';

const NewsInfo = () => {
  let history = useHistory()
  let params = useParams();
  const [newsId, set_newsId] = useState(params.id);
  const [newsLoading, set_newsLoading] = useState(true);
  const [news, set_news] = useState(null);

  useEffect(() => {
    let isUnmounted = false;
    const getNewsList = async () => {
      set_newsLoading(true);
      const result = await http.get(NEWS.NEWS_INFO + newsId);
      set_news(result[0]);
      set_newsLoading(false);
    }
    getNewsList();
    return () => {
      isUnmounted = true;
    };
  }, [newsId]);
  return (
    <div className="page news">
      {
        newsLoading ?
          <div>
            <BaseSkeleton width="70vw" height="0.5rem" />
            <BaseSkeleton width="70vw" height="0.5rem" />
            <BaseSkeleton width="70vw" height="0.5rem" />
            <BaseSkeleton width="70vw" height="0.5rem" />
            <BaseSkeleton width="70vw" height="0.5rem" />
            <BaseSkeleton width="70vw" height="0.5rem" />
            <BaseSkeleton width="70vw" height="0.5rem" />
            <BaseSkeleton width="70vw" height="0.5rem" />
          </div>
          :
          <div>
            <div className='content' >
              <h4 className='title'>{news.title}</h4>
              <p className="subTitle">
                <span>发表时间：{transformTime(news.add_time)}</span>
                <span style={{ color: "#a09a9a", paddingLeft: "10px" }} >阅读：{news.click}次</span>
              </p>
              <hr />
              <article dangerouslySetInnerHTML={{ __html: news.content }} />
            </div>
            <div style={{ textAlign: "right" }}>
              <Button
                style={{ marginTop: "5px" }}
                type="ghost"
                size="small"
                inline
                onClick={() => {
                  history.push(`${ROUTE_PATH.COMMENT}/${newsId}`)
                }}
              >查看评论 {`>>`}
              </Button>
            </div>
          </div>
      }
    </div>
  )
}

export default NewsInfo;