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

    leftboxHidden: true,
    leftboxList: [
      {
        title: '性别',
        cots: [
          {
            name: '男',
            checked: false
          },
          {
            name: '女',
            checked: false
          }
        ]
      },
      {
        title: '客户类型',
        cots: [
          {
            name: '重要客户',
            checked: false
          },
          {
            name: '一般客户',
            checked: false
          },
          {
            name: '次要客户',
            checked: false
          }
        ]
      },
      {
        title: '健身时间',
        cots: [
          {
            name: '上午',
            checked: false
          },
          {
            name: '中午',
            checked: false
          },
          {
            name: '晚上',
            checked: false
          }
        ]
      }
    ],
    searchKeyWord: ''
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

  // 右侧 筛选
  bindFilterSearchTap(e) {

    this.setData({
      leftboxHidden: false
    })
    
  },
  // 右弹窗按钮 点击事件
  bindLeftBoxBtnTap(e) {

    var x = e.currentTarget.dataset.x;
    var y = e.currentTarget.dataset.y;

    var leftboxList = this.data.leftboxList;
    leftboxList[x].cots.forEach(ctsitem => {
      ctsitem.checked = false;
      leftboxList[x].cots[y].checked = true;
    })
    
    this.setData({
      leftboxList: leftboxList
    })

  },
  // 关键词搜索
  bindLeftBoxKeyWordInput(e) {
    this.setData({
      searchKeyWord: e.detail.value
    })
  },

  // 确定 搜索
  bindConfirmSearchTap() {

    var leftboxList = this.data.leftboxList;
    var searchKeyWord = this.data.searchKeyWord;

    this.setData({
      leftboxHidden: true
    })

  },

  // 重置 搜索
  bindResetSearchTap() {

    var leftboxList = this.data.leftboxList;
    var searchKeyWord = this.data.searchKeyWord;

    leftboxList.forEach(lblitem => {
      lblitem.cots.forEach(ctsitem => {
        ctsitem.checked = false
      })
    })

    this.setData({
      leftboxList: leftboxList,
      leftboxHidden: true
    })
  },

  // 意向 点击
  bindIntentionCellTap() {
    wx.navigateTo({
      url: 'customerTrackingIntention',
    })
  }

})