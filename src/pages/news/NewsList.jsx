import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from "react-router-dom";

import { Card, WingBlank, WhiteSpace, Toast } from 'antd-mobile';

import BaseSkeleton from '../../components/common/BaseSkeleton/index';
import BaseLoading from '../../components/common/BaseLoading/index';
import { NEWS } from '../../httpConfig/api';
import http from '../../httpConfig/http';
import { transformTime, ROUTE_PATH } from '../../global';



const NewsListItem = ({ news, loading }) => {
  let history = useHistory();
  return (
    <WingBlank size="md" >
      <WhiteSpace size="xs" />
      <Card
        onClick={(e) => {
          history.push(`${ROUTE_PATH.HOME_NEWS}/${news.id}`)
        }}
      >
        <Card.Header
          title={loading ? <BaseSkeleton width="4rem" height="0.6rem" /> : news.title}
          thumb={loading ? <BaseSkeleton type="square" width="1.4rem" height="0.35rem" /> : news.img_url}
          thumbStyle={{
            width: "1.4rem",
            height: "1.4rem"
          }}
          style={{
            fontSize: "0.3rem"
          }}
        />
        <Card.Body
          style={{
            fontSize: "0.26rem",
            minHeight: "20px"
          }}
        >
          {loading ? <BaseSkeleton width="4.5rem" height="0.4rem" /> : <div>{news.zhaiyao}</div>}
        </Card.Body>
        <Card.Footer
          content={loading ? <BaseSkeleton padding="0" width="2rem" height="0.25rem" /> : <div>{transformTime(news.add_time)}</div>}
          extra={loading ? <BaseSkeleton padding="0" width="2rem" height="0.25rem" /> : <div>{news.click} 阅读</div>}
          style={{
            fontSize: "0.24rem"
          }}
        />
      </Card>
      <WhiteSpace size="md" />
    </WingBlank>
  )
}


function NewsList() {

  const [loading, set_loading] = useState(true);
  const [newList, set_newList] = useState([]);

  useEffect(() => {
    let isUnmounted = false;
    const getNewsList = async () => {
      set_loading(true);
      const result = await http.get(NEWS.GET_NEWS);
      set_newList(result);
      set_loading(false);
    }
    getNewsList();
    return () => {
      isUnmounted = true;
    };
  }, []);
  return (
    <div className="page">
      {
        newList.map(news => <NewsListItem key={news.id} news={news} loading={loading} />)
      }
      {loading && <BaseLoading />}
    </div>
  )
}

export default NewsList;