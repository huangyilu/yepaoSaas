// pages/home/myMembershipCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: [
      {
        bgimg: '../../images/icon/home/car/card_bg.png',
        carType: '天数卡',
        carName: '一年卡'
      },
      {
        bgimg: '../../images/icon/home/car/card_bg.png',
        carType: '天数卡',
        carName: '一年卡'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  bindCardTap (e) {
    
    wx.navigateTo({
      url: 'membershipCardDetails',
    })
  }
})