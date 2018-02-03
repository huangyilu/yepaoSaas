// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCertificationMem: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.setNavigationBarTitle({
      title: '古德菲力·深圳',
    })

    // 查询是否认证会员
    

  },

  bindCertificationMemTap() {

    if (!isCertificationMem) {
      // 未认证
    }
  }
})