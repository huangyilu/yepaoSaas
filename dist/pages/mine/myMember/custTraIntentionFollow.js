// pages/mine/myMember/custTraIntentionFollow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headimg: '../../../images/icon/default_headimg.png',
    custName: '张迪',

    txtPlaContentHidden: false,
    txtPlaAttentionHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  bindTextareaFocus(e) {
    if (e.currentTarget.dataset.type == 'content') {
      this.setData({
        txtPlaContentHidden: true
      })
    } else {
      this.setData({
        txtPlaAttentionHidden: true
      })
    }
  }
})