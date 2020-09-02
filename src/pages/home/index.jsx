/**
 * Created by Administrator on 2017/03/23 0023.
 */
import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";

import { Grid } from 'antd-mobile';

import { menus } from '@/global';

import BaseSwiper from '../../components/common/BaseSwiper';
import AppDispatch from '../bus';


const data = menus.map(i => {
  return {
    icon: i.imgName,
    text: i.name
  }
})



function Home() {

  let history = useHistory();

  const dispatch = useContext(AppDispatch);

  function handleClick(el, index) {
    if (menus[index].routePath === "#") return;
    dispatch({ type: 'SET_NAVTITLE', navTitle: menus[index].name });
    history.push(menus[index].routePath);
  }

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