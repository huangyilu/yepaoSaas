// pages/home/onlinePaymentForClass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    classInfo: {
      headimg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
      courseName: '搏击训练',
      price: 100,
      courseTime: 2,
      coachName: '朱永磊',
      classType: '私教课',
      orderId: '909309e02343',
      checked: true
    },

    remindText: '',

    buyCourseSelectCoach: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  
  },

  onShow: function (options) {
    if (wx.getStorageSync('buyCourseSelectCoach')) {
      console.log('buyCourseSelectCoach .. ' + JSON.stringify(wx.getStorageSync('buyCourseSelectCoach')));
      var coach = wx.getStorageSync('buyCourseSelectCoach');
      this.setData({
        buyCourseSelectCoach: coach,
        'classInfo.name': coach.name
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