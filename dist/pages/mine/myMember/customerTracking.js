// pages/mine/myMember/customerTracking.js

import * as minedata from '../../../utils/minedata-format';
import * as mineService from '../../../services/mine-service';

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

    telephoneHidden: true,

    activeTitle: '',
    // 成交
    dealList: [],
    // 快到期
    closeDeadlineList: [],
    // 已到期
    alreadyDeadlineList: [],

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

    switch (+e.currentTarget.id)
    {
      case 0 :
        break;
      case 1:
        this.getDealList();
        break;
      case 2:
        this.getCloseDeadlineList();
        break;
      case 3:
        this.getAlreadyDeadlineList();
        break;
    }

  },

  // 获取数据
  // 意向
  getIntentionList() {
    
  },
  // 成交
  getDealList() {
    mineService.queryCustTrackDeal().then((result) => {
      // console.log('queryCustTrackDeal *** ' + JSON.stringify(result));
      this.setData({
        dealList: minedata.formatCustTrackingDeal(result.dealList)
      })

    }).catch((error) => {
      console.log(error);
    })
  },
  // 快到期
  getCloseDeadlineList() {
    mineService.queryCustTrackCloseDeadline().then((result) => {
      // console.log('queryCustTrackCloseDeadline *** ' + JSON.stringify(result));
      this.setData({
        closeDeadlineList: minedata.formatCustTrackingDeal(result.dealList)
      })
    }).catch((error) => {
      console.log(error);
    })
  },
  // 已到期
  getAlreadyDeadlineList() {
    mineService.queryCustTrackAlreadyDeadline().then((result) => {
      // console.log('queryCustTrackAlreadyDeadline *** ' + JSON.stringify(result));
      this.setData({
        alreadyDeadlineList: minedata.formatCustTrackingDeal(result.dealList)
      })
    }).catch((error) => {
      console.log(error);
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
  },

  // 打电话
  bindPhonecall(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id,
    })
  }

})