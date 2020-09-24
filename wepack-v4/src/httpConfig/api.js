/*
 * @Description:  api接口设置
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-24 13:16:37
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-01 18:38:17
 */
const api = "api/";

export const BASE_URL = process.env.NODE_ENV !== 'production' ? `http://www.liulongbin.top:3005/` : '';

export const COMMON = {
  SWIPER_IMGS: `${api}getthumimages/`
}

export const HOME = {
  HOME_SWIPER_IMGS: `${api}getlunbo/`
}

export const NEWS = {
  GET_NEWS: `${api}getnewslist`,
  NEWS_INFO: `${api}getnew/`
}
export const COMMENT = {
  GET_COMMENTS: `${api}getcomments/`,
  POST_COMMENT: `${api}postcomment/`
}

export const GOODS = {
  GET_GOODS: `${api}getgoods`,
  DESC: `${api}goods/getdesc/`,
  CART_LIST: `${api}goods/getshopcarlist/`,
  GOOD_INFO: `${api}goods/getinfo/`,
  GOOD_SWIPER_IMGS: COMMON.SWIPER_IMGS
}

export const PHOTOES = {
  GET_PHOTO_CATEGORIES: `${api}getimgcategory`,
  GET_PHOTOES: `${api}getimages/`,
  PHOTO_IMG_INFO: `${api}getimageInfo/`,
  PHOTO_IMG_SWIPER_IMGS: COMMON.SWIPER_IMGS
}