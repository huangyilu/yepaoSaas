// pages/club/memberActivitiesDetails.js

import moment from '../../utils/npm/moment';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleImg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
    days: 2,
    mints: 20,
    second: 30
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // moment().add(i, 'days').format('YYYY-MM-DD');

  },

  countdown: function (that) {
    // var EndTime = that.data.end_time || [];
    // var NowTime = new Date().getTime();
    // var total_micro_second = EndTime - NowTime || [];
    // console.log('剩余时间：' + total_micro_second);
    // // 渲染倒计时时钟
    // that.setData({
    //   clock: dateformat(total_micro_second)
    // });
    // if(total_micro_second <= 0) {
    //   that.setData({
    //     clock: "已经截止"
    //   });
    //   //return;
    // }
    // setTimeout(function () {
    //   total_micro_second -= 1000;
    //   countdown(that);
    // }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})