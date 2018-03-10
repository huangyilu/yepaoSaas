// pages/mine/mine.js

import * as mineService from '../../services/mine-service';
import * as AuthService from '../../services/auth-service';
import certificationBox from '../../templates/certification-box/certification-box'

/**
 * 页面的初始数据
 */
var app = getApp();
let pageOptions = {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    memInfo: null,

    rightItemHidden: false,
    yItems: [
      // {
      //   iconUrl: '../../images/icon/mine/fit_calen.png',
      //   name: '健身计划',
      //   navigateUrl: '',
      //   ishidden: true
      // },
      {
        iconUrl: '../../images/icon/mine/my_card.png',
        name: '我的会员卡',
        navigateUrl: '../home/membershipCard',
        ishidden: false
      },
      {
        iconUrl: '../../images/icon/mine/my_membership.png',
        name: '我是会籍', 
        navigateUrl: 'myMember/myMember',
        ishidden: true
      },
      {
        iconUrl: '../../images/icon/mine/my_coach.png',
        name: '我是教练',
        navigateUrl: 'myCoach/myCoachListView',
        ishidden: true
      },
      // {
      //   iconUrl: '../../images/icon/mine/member.png',
      //   name: '课程共享',
      //   navigateUrl: 'courseShare/courseShare',
      //   ishidden: false
      // },
      // {
      //   iconUrl: '../../images/icon/mine/recommend.png',
      //   name: '会员推荐',
      //   navigateUrl: '',
      //   ishidden: false
      // },
      {
        iconUrl: '../../images/icon/mine/my_order.png',
        name: '我的订单',
        navigateUrl: 'myOrderListView',
        ishidden: false
      },
      // {
      //   iconUrl: '../../images/icon/mine/my_setting.png',
      //   name: '设置',
      //   style: 'margin-top:20rpx;',
      //   navigateUrl: '',
      //   ishidden: false
      // }
    ],

    isCertificationMem: false,
    isCertificationMemHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.bindGetUserInfo();

  },
  onReady() {
    certificationBox.setParent(this)
  },
  onShow() {
    this.getCertifiMem();
  },
  getCertifiMem(that) {
    if (AuthService.getMemberInfo()) {
      this.setData({
        isCertificationMem: true
      })
      // 控制 按钮显示
      this.setMyYItems();
      console.log('*已认证会员*');
    } else {
      console.log('*未认证会员*');
    }
  },
  bindClearCertiTap() {
    
  },
  // 构造按钮列表
  setMyYItems() {
    var memInfo = AuthService.getMemberInfo();
    var yItems = this.data.yItems;
    if (memInfo.pt == 'Y') {
      yItems[2].ishidden = false;
    }
    if (memInfo.mc == 'Y') {
      yItems[1].ishidden = false;
    }
    this.setData({
      yItems: yItems
    })
  },

  bindNavigateTap(e) {
    if (!this.data.isCertificationMem) {
      this.setData({
        'certificationBoxData.isCertificationMemHidden': false
      })
    } else {
      wx.navigateTo({
        url: e.currentTarget.id,
      })
    }
  },

  bindGetUserInfo () {
    app.getUserInfo(userInfo => {
      this.setData({
        userInfo: userInfo
      });
      console.log('getUserInfo ***' + JSON.stringify(userInfo));
    });
  },
  bindAvatarTap () {
    var me = this;
    // 微信授权
    if (!this.data.userInfo) {
      AuthService.authorizeUserInfo().then((res) => {
        console.log('authorizeUserInfo...' + JSON.stringify(res));
        me.bindGetUserInfo();
      }).catch(error => {
        console.log('Not authorizeUserInfo In'+JSON.stringify(error));
        wx.showModal({
          title: '提示',
          content: '你曾拒绝授权，请过段时间再进行授权。',
        })
      });
    }

  },
  bindCertificationTap() {
    if (!this.data.isCertificationMem) {
      this.setData({
        'certificationBoxData.isCertificationMemHidden': false
      })
    } else {
      
    }
  },

  // 健身历程
  bindFitLcTap () {
    if (!this.data.isCertificationMem) {
      this.setData({
        'certificationBoxData.isCertificationMemHidden': false
      })
    } else {
      
    }
  },
  // 体测数据
  bindFitDataTap () {
    if (!this.data.isCertificationMem) {
      this.setData({
        'certificationBoxData.isCertificationMemHidden': false
      })
    } else {
      
    }
  },



}

certificationBox.bindData(pageOptions)
certificationBox.bindListeners(pageOptions)

Page(pageOptions)