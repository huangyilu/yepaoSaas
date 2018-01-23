// pages/home/recommendedCourses.js

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

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
    navbarTabs: ['团课','私教课','单次入场券'],

    groupClassList: [
      {
        headimg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
        courseName: '搏击训练',
        price: 20,
        courseTime: 1
      },
      {
        headimg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
        courseName: '搏击训练',
        price: 80,
        courseTime: 12
      }
    ],

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
  bindNavbarTabTap(e) {

    this.setData({
      activeIndex: e.currentTarget.id,
      sliderOffset: e.currentTarget.offsetLeft
    });
  },

  bindBuyTap () {

    
  }
})