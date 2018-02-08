// pages/home/onlinePaymentForClass.js

import * as homedata from '../../utils/homedata-format';
import * as homeService from '../../services/home-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    classInfo: {},

    remindText: '',

    buyCourseSelectCoach: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      cardId: options.cardid ? options.cardid : null,
      price: options.price ? options.price : null
    })
    
    homeService.uploadBuyClassPay(this.data.cardId, this.data.price).then((result) => {

      console.log('uploadBuyClassPay *** ' + JSON.stringify(result));
      if (result.errCode == 0) {
        this.setData({
          classInfo: homedata.formatOnlinePaymentForClass(result.returnResult)
        })
      }

    }).catch((error) => {
      console.log(error);
    })
  
  },

  onShow: function (options) {
    if (wx.getStorageSync('buyCourseSelectCoach')) {
      console.log('buyCourseSelectCoach .. ' + JSON.stringify(wx.getStorageSync('buyCourseSelectCoach')));
      var coach = wx.getStorageSync('buyCourseSelectCoach');
      this.setData({
        buyCourseSelectCoach: coach,
        'classInfo.coachName': coach.name,
        selectCoachInfo: coach
      })
      wx.removeStorage({
        key: 'buyCourseSelectCoach',
      })
    }
  },

  // 教练选择
  bindSelectCoach () {
    wx.navigateTo({
      url: 'selectedCoach',
    })
  },
   
  // 勾选购买协议
  bindCheckedTap () {
    this.setData({
      'classInfo.checked': !this.data.classInfo.checked
    })
  },

  // 微信支付
  bindPaymentTap () {
    if (this.data.classInfo.checked) {

    } else {
      this.setData({
        remindText: '您未同意课程购买协议！'
      })

      setTimeout((function callback() {
        this.setData({
          remindText: ''
        })
      }).bind(this), 2000);
    }
  }

})