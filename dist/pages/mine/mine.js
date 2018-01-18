// pages/mine/mine.js

import * as mineService from '../../services/mine-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    yItems: [
      {
        iconUrl: '../../images/icon/mine/fit_calen.png',
        name: '健身计划',
        navigateUrl: '',
        ishidden: false
      },
      {
        iconUrl: '../../images/icon/mine/coach.png',
        name: '我是教练',
        navigateUrl: 'myCoach/privateMember',
        ishidden: false
      },
      {
        iconUrl: '../../images/icon/mine/member.png',
        name: '课程共享',
        navigateUrl: 'courseShare/courseShare',
        ishidden: false
      },
      {
        iconUrl: '../../images/icon/mine/recommend.png',
        name: '会员推荐',
        navigateUrl: '',
        ishidden: false
      },
      {
        iconUrl: '../../images/icon/mine/myorder.png',
        name: '我的订单',
        navigateUrl: '',
        ishidden: false
      },
      {
        iconUrl: '../../images/icon/mine/setting.png',
        name: '设置',
        style: 'margin-top:20rpx;',
        navigateUrl: '',
        ishidden: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  // 健身历程
  bindFitLcTap () {
    
  },
  // 体测数据
  bindFitDataTap () {

  }
  

})