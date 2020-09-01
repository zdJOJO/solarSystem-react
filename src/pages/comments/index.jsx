import React, { useEffect, useReducer } from 'react';
import { useParams } from "react-router-dom";

import { WingBlank, WhiteSpace, Card, Button, Toast } from 'antd-mobile';

import BaseSkeleton from '../../components/common/BaseSkeleton/index';
import BaseLoading from '../../components/common/BaseLoading/index';
import { COMMENT } from '../../httpConfig/api';
import http from '../../httpConfig/http';
import { transformTime, getRandomName } from '../../global';

import userDefault from '../../../assets/images/user_default.svg';

import './index.less';

const CommentItem = ({ comment }) => {
  return (
    <WingBlank size="md" >
      <WhiteSpace size="xs" />
      <Card>
        <Card.Header
          title={!comment ? <BaseSkeleton width="4rem" height="0.4rem" /> : comment.user_name}
          thumb={!comment ? <BaseSkeleton type="circle" width="0.5rem" height="0.5rem" /> : userDefault}
          thumbStyle={{
            width: "0.5rem",
            height: "0.5rem"
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
          {!comment ? <BaseSkeleton width="4.5rem" height="0.3rem" /> : <div>{comment.content}</div>}
        </Card.Body>
        <Card.Footer
          content={!comment ? <BaseSkeleton padding="0" width="2rem" height="0.2rem" /> : <div>{transformTime(comment.add_time)}</div>}
          style={{
            fontSize: "0.24rem"
          }}
        />
      </Card>
      <WhiteSpace size="md" />
    </WingBlank>
  )
}


const initialState = {
  commentContent: '',
  comments: [],
  pageNum: 1,
  isGetFetching: false,
  isPostFetching: false,
  isShowLoadMore: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'GET_UPDATE_COMMENTS':
      return { ...state, comments: action.comments };
    case 'POST_UPDATE_COMMENTS':
      return { ...state, comments: action.comments };
    case 'SET_COMMENT_CONTENT':
      return { ...state, commentContent: action.commentContent };
    case 'SET_PAGE_NUM':
      return { ...state, pageNum: action.pageNum };
    case 'SET_GET_FETCHING':
      return { ...state, isGetFetching: action.isGetFetching };
    case 'SET_POST_FETCHING':
      return { ...state, isPostFetching: action.isPostFetching };
    case 'SET_SHOW_LOAD_MORE':
      return { ...state, isShowLoadMore: action.isShowLoadMore };
    default:
      throw new Error();
  }
}

function Comments() {

  let params = useParams();

  const [state, dispatch] = useReducer(reducer, initialState);

  // 获取评论列表
  const getComments = async (num) => {
    dispatch({ type: 'SET_GET_FETCHING', isGetFetching: true });
    const result = await http.get(`${COMMENT.GET_COMMENTS}${params.id}?pageindex=${num}`);
    if (!!result && result.length > 0) {
      result.forEach((e, index) => {
        result[index].user_name = getRandomName()
      });
      let temp = state.comments.concat(result)
      dispatch({ type: 'GET_UPDATE_COMMENTS', comments: temp });
      dispatch({ type: 'SET_PAGE_NUM', pageNum: num });
      dispatch({ type: 'SET_SHOW_LOAD_MORE', isShowLoadMore: true });
    } else {
      dispatch({ type: 'SET_SHOW_LOAD_MORE', isShowLoadMore: false });
    }
    dispatch({ type: 'SET_GET_FETCHING', isGetFetching: false });
  }

  // 发表评论
  const postComments = async () => {
    dispatch({ type: 'SET_POST_FETCHING', isPostFetching: true });
    const result = await http.post(`${COMMENT.POST_COMMENT}${params.id}`, { content: state.commentContent });
    if (result && result.successful) {
      Toast.success(result.msg, 2);
      let temp = state.comments;
      temp.unshift({
        user_name: getRandomName(),
        add_time: Date.now(),
        content: state.commentContent,
      })
      dispatch({ type: 'POST_UPDATE_COMMENTS', comments: temp });
      dispatch({ type: 'SET_COMMENT_CONTENT', commentContent: '' });
    }
    dispatch({ type: 'SET_POST_FETCHING', isPostFetching: false });
  }

  useEffect(() => {
    let isUnmounted = false;
    getComments(1);
    return () => {
      isUnmounted = false;
    }
  }, []);

  // useEffect(() => {
  //   let isUnmounted = false;
  //   postComments();
  //   return () => {
  //     isUnmounted = false;
  //   }
  // }, []);

  return (
    <div className="page comment">
      <div className="cmt-container">
        <div>
          <h3>发表评论</h3>
          <div>
            <textarea
              placeholder="请输入要评论的内容"
              value={state.commentContent}
              onChange={(event) => {
                dispatch({ type: 'SET_COMMENT_CONTENT', commentContent: event.target.value })
              }}
            />
          </div>
          <div
            style={{
              height: '0.64rem',
              lineHheight: '0.32rem'
            }}
          >
            <Button
              type="primary"
              size="small"
              inline
              loading={state.isPostFetching}
              disabled={state.isPostFetching}
              onClick={() => {
                if (!!state.commentContent && !state.commentContent.trim()) {
                  Toast.info("请填写评论内容", 1.5)
                  return;
                }
                postComments();
              }}
            >提交评论</Button>
          </div>
        </div>

        <div className="cmt-list">
          {
            state.comments.map((item, index) =>
              <CommentItem
                key={index}
                comment={item}
              />)
          }
        </div>

        {
          (!state.comments || state.comments.length === 0) &&
          <WingBlank size="sm">
            <div className='placeholder'>暂无评论</div>
          </WingBlank>
        }
        {
          (!!state.comments && state.comments.length > 0) && state.isShowLoadMore &&
          <div className="loadMore">
            <Button
              icon="down"
              type="ghost"
              size="small"
              style={{ width: "70vw", margin: "auto" }}
              onClick={() => {
                getComments(state.pageNum + 1)
              }}
            >加载更多</Button>
          </div>
        }
        {state.isGetFetching && <BaseLoading />}
      </div >
    </div >
  )
}

export default Comments;