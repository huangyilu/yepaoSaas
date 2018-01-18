// pages/mine/courseShare/courseShare.js

import * as minedata from '../../../utils/minedata-format';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptyText: '暂无共享的课程',
    emptyIcon: '../../../images/bg_img/no_data.png',

    courseShareList: [
      {
        title: '教练张三的课程共享',
        time: '12:39'
      },
      {
        title: '教练张三的课程共享',
        time: '12-11'
      },
      {
        title: '教练张三的课程共享',
        time: '2016-09-11'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    // minedata.formatDifferentTypesDate(1516240800000);

  },

  // 点击事件
  bindCourseCellTap (e) {

    wx.navigateTo({
      url: 'courseShareDetails',
    })

  }
  
})