/**
 * Created by Administrator on 2017/03/23 0023.
 */
import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import { Grid } from 'antd-mobile';

import { menus, getTitleName } from '@/global';

import BaseSwiper from '../../components/common/BaseSwiper';
import AppDispatch from '../bus';

const data = menus.map(i => {
  return {
    icon: i.imgName,
    text: i.name
  }
})
const Home = () => {

  const dispatch = useContext(AppDispatch);

  let history = useHistory();
  let location = useLocation();

  function handleClick(el, index) {
    if (menus[index].routePath === "#") return;
    history.push(menus[index].routePath)
  }

  // useEffect(() => {
  //   dispatch({ type: 'SET_NAVTITLE', navTitle: getTitleName(location.pathname) });
  // }, [])

  return (
    <section className="page">

      <BaseSwiper
        imgList={['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI']}
      />

      <Grid
        data={data}
        columnNum={5}
        onClick={handleClick}
      />

    </section>
  )
}

export default Home;