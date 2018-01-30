// pages/message/messageDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mesgCarItems: [
      {
        title: '付费请假',
        time: '16:37',
        content: '您已经请假，请假时间为【2018-01-30至2018-02-03 15:28】,由于您请假天数超出范围，需要付费请假，费用为【0】。'
      },
      {
        title: '付费请假',
        time: '16:37',
        content: '您已经请假，请假时间为【2018-01-30至2018-02-03 15:28】,由于您请假天数超出范围，需要付费请假，费用为【0】。'
      },
      {
        title: '付费请假',
        time: '16:37',
        content: '您已经请假，请假时间为【2018-01-30至2018-02-03 15:28】,由于您请假天数超出范围，需要付费请假，费用为【0】。'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    wx.setNavigationBarTitle({
      title: options.title ? options.title : '消息',
    })

  },

  
})