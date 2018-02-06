// pages/mine/myCoach/registerCustomers.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaPlaceHidden: false,
    taskContent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  bindTextareaInpput(e) {
    var value = e.detail.value;

    this.setData({
      taskContent: value,
      textareaPlaceHidden: true
    })
  },
  // 是去焦点时
  bindTextareaBlur(e) {
    var value = e.detail.value;
    if (value == '') {
      this.setData({
        textareaPlaceHidden: false
      })
    }
  },

  bindSelectedMemTap () {
    wx.navigateTo({
      url: '../selectedMem',
    })
  }
})