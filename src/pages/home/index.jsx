/**
 * Created by Administrator on 2017/03/23 0023.
 */
import React from 'react';
import { useHistory } from "react-router-dom";

import { Grid } from 'antd-mobile';

import { menus } from '@/global';

import BaseSwiper from '../../components/common/BaseSwiper';


const data = menus.map(i => {
  return {
    icon: i.imgName,
    text: i.name
  }
})
const Home = () => {

  let history = useHistory();

  function handleClick(el, index) {
    if (menus[index].routePath === "#") return;
    // console.log(menus[index].routePath);
    history.push(menus[index].routePath)
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