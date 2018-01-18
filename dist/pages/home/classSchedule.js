// pages/home/classSchedule.js

var sliderWidth = 90; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptyText: '暂无课程',
    emptyIcon: '../../images/bg_img/no_data.png',

    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    navbarTabs: [
      {
        date: '12.26',
        name: '今天'
      },
      {
        date: '12.26',
        name: '明天'
      },
      {
        date: '12.26',
        name: '后天'
      },
      {
        date: '',
        name: ''
      }
    ],

    courseList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var res = wx.getSystemInfoSync();
    this.setData({
      sliderLeft: (res.windowWidth / this.data.navbarTabs.length - sliderWidth) / 2
    })
  
  },

  // 点击事件 navbar
  bindNavbarTabTap (e) {

    this.setData({
      activeIndex: e.currentTarget.id,
      sliderOffset: e.currentTarget.offsetLeft
    });
  },


})