// pages/mine/myMember/customerTracking.js

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptyText: '暂无课程',
    emptyIcon: '../../../images/bg_img/no_data.png',

    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    navbarTabs:['意向','成交','快到期','已到期'],

    activeTitle: '',
    customerTrackList: [
      {
        headimg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
        name: '藏冬雨',
        cardType: '一年卡',
        remainNum: 318,
        gender: 'boy'
      },
      {
        headimg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
        name: '藏冬雨',
        cardType: '一年卡',
        remainNum: 310,
        gender: 'girl'
      }
    ],

    intentionList: [
      {
        headimg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
        title: '【会籍跟单】张迪',
        text: '第一次跟单',
        memId: 0
      },
      {
        headimg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
        title: '【会籍跟单】张迪',
        text: '第一次跟单',
        memId: 0
      }
    ],

    leftboxList: [
      {
        title: '性别',
        cots: ['男','女']
      },
      {
        title: '客户类型',
        cots: ['重要客户', '一般客户','次要客户']
      },
      {
        title: '健身时间',
        cots: ['上午', '下午', '晚上']
      }
    ]
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
    })
  },


})