import moment from "moment"

import home from '../assets/images/home.png';
import home_fill from '../assets/images/home_fill.png';
import address from '../assets/images/address.png';
import address_fill from '../assets/images/address_fill.png';
import cart from '../assets/images/cart.png';
import cart_fill from '../assets/images/cart_fill.png';
import user from '../assets/images/user.png';
import user_fill from '../assets/images/user_fill.png';

import menu1 from '../assets/images/menu1.svg';
import menu2 from '../assets/images/menu2.svg';
import menu3 from '../assets/images/menu3.svg';
import menu4 from '../assets/images/menu4.svg';
import menu5 from '../assets/images/menu5.svg';
import menu6 from '../assets/images/menu6.svg';

import order from '../assets/images/order.svg';
import wait_pay from '../assets/images/wait-pay.svg';
import wait_use from '../assets/images/wait-use.svg';
import wait_comment from '../assets/images/wait-comment.svg';
import back_pay from '../assets/images/back-pay.svg';

import my_collect from '../assets/images/收藏.svg';
import my_comment from '../assets/images/评论.svg';
import my_foot from '../assets/images/足迹.svg';
import my_bag from '../assets/images/会员卡.svg';


export const themeColor = "#ffd000"; // 主题颜色
export const fontSize = "0.28rem";
export const fontColor = "#303133"; // 字体颜色
export const defaultColor = "#606266";
export const defauCommentCount = 3;
export const fontStyle = {
  color: "#303133",
  fontSize: "0.28rem",
};
export const cartBallTrasformTime = 600;  // 商品模块 加入购物车小球特效变换时间 单位:毫秒

// route path
export const ROUTE_PATH = {

  HOME: '/',
  USER: '/user',
  SETTING: '/setting',
  CART: '/cart',
  LOCATION: '/location',

  COMMENT: '/comment',
  COMMENT_LIST: '/comment/:id',

  HOME_NEWS: '/home/news',
  HOME_NEWS_ID: '/home/news/:id',

  HOME_PHOTOES: '/home/photoes',
  HOME_PHOTOE_ID: '/home/photo/:id',

  HOME_GODDS: '/home/goods',
  HOME_GODDS_ID: '/home/goods/:id',

  HOME_GODDS_DETAIL_ID: {
    path: '/home/goodsdesc/:id',
    name: 'goodsdesc'
  },
  HOME_GODDS_COMMENT_ID: {
    path: '/home/goodscomment/:id',
    name: 'goodscomment'
  }
}

// tabBar 导航
export const tabBarElements = [
  {
    name: "首页",
    routePath: ROUTE_PATH.HOME,
    icon: home,
    activeIcon: home_fill,
  },
  {
    name: "位置",
    routePath: ROUTE_PATH.LOCATION,
    icon: address,
    activeIcon: address_fill,
  },
  {
    name: "购物袋",
    routePath: ROUTE_PATH.CART,
    icon: cart,
    activeIcon: cart_fill,
    ball: true,
  },
  {
    name: "我的",
    imgName: "member",
    routePath: ROUTE_PATH.USER,
    icon: user,
    activeIcon: user_fill,
  },
];

// 首页菜单
export const menus = [
  {
    name: "今日要闻",
    routePath: ROUTE_PATH.HOME_NEWS,
    imgName: menu1
  },
  {
    name: "购物/美食",
    routePath: ROUTE_PATH.HOME_GODDS,
    imgName: menu2
  },
  {
    name: "旅游/分享",
    routePath: ROUTE_PATH.HOME_PHOTOES,
    imgName: menu3,
  },
  {
    name: "番剧/电影",
    routePath: "#",
    imgName: menu4
  },
  {
    name: "Let's talk",
    routePath: "#",
    imgName: menu5,
  },
  {
    name: "雷锋日记",
    routePath: "#",
    imgName: menu6,
  }
];

//“我的”模块 订单/菜单
export const memberInfoMenus = [
  {
    name: "我的订单",
    imgName: order,
  },
  {
    name: "待付款",
    imgName: wait_pay,
  },
  {
    name: "待使用",
    imgName: wait_use,
  },
  {
    name: "待评价",
    imgName: wait_comment,
  },
  {
    name: "退款",
    imgName: back_pay,
  },
];

//“我的”模块  足迹
export const myInfoMenes = [
  {
    name: "收藏",
    imgName: my_collect,
  },
  {
    name: "评论",
    imgName: my_comment,
  },
  {
    name: "足迹",
    imgName: my_foot,
  },
  {
    name: "红包卡券",
    imgName: my_bag,
  },
]

// 是按转换
export const transformTime = (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") => moment(dataStr).format(pattern);

// 随即姓名生成器
export const getRandomName = () => {
  const firstname = ["李", "王", "张", "刘", "陈", "杨", "赵", "黄", "周", "吴", "徐", "孙", "胡", "朱", "高", "林", "何", "郭"];
  const lastName = ["建华", "小明", "小红", "有为", "建刚", "小刚", "建国", "文革", '援朝', '国庆', '国富', '梅', '强', '琴琴', '红雷', '德华', '悟空'];
  var str1 = firstname[Math.floor(Math.random() * (firstname.length))];
  var str2 = lastName[Math.floor(Math.random() * (lastName.length))];
  return `${str1} ${str2}`;
}

// 百度地图密钥
export const baiduMap_AK = 'IcgnafKNldYZGjRjLiRqvcG09TQ5OAOd';