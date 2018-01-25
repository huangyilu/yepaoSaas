// pages/mine/myCoach/myCoachListView.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rightItemHidden: true,
    yItems: [
      {
        iconUrl: '../../../images/icon/mine/member_registration.png',
        name: '登记客户资料',
        navigateUrl: 'privateMember'
      },
      {
        iconUrl: '../../../images/icon/mine/customer_tracking.png',
        name: '客户跟踪',
        navigateUrl: 'privateMember'
      },
      {
        iconUrl: '../../../images/icon/mine/work_transfer.png',
        name: '资料移交',
        navigateUrl: 'privateMember'
      },
      {
        iconUrl: '../../../images/icon/mine/private_member.png',
        name: '私教会员',
        navigateUrl: 'privateMember'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})