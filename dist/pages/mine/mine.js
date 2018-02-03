// pages/mine/mine.js

import * as mineService from '../../services/mine-service';
import * as AuthService from '../../services/auth-service';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,

    rightItemHidden: false,
    yItems: [
      {
        iconUrl: '../../images/icon/mine/fit_calen.png',
        name: '健身计划',
        navigateUrl: '',
        ishidden: true
      },
      {
        iconUrl: '../../images/icon/mine/coach.png',
        name: '我是教练',
        navigateUrl: 'myCoach/myCoachListView',
        ishidden: false
      },
      {
        iconUrl: '../../images/icon/mine/coach.png',
        name: '我是会籍',
        navigateUrl: 'myMember/myMember',
        ishidden: false
      },
      {
        iconUrl: '../../images/icon/mine/member.png',
        name: '课程共享',
        navigateUrl: 'courseShare/courseShare',
        ishidden: false
      },
      {
        iconUrl: '../../images/icon/mine/recommend.png',
        name: '会员推荐',
        navigateUrl: '',
        ishidden: false
      },
      {
        iconUrl: '../../images/icon/mine/myorder.png',
        name: '我的订单',
        navigateUrl: '',
        ishidden: false
      },
      {
        iconUrl: '../../images/icon/mine/setting.png',
        name: '设置',
        style: 'margin-top:20rpx;',
        navigateUrl: '',
        ishidden: false
      }
    ],

    isCertificationMem: false,
    isCertificationMemHidden: true,
    confirmText: '会员认证',
    memTelephone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.bindGetUserInfo();

  },

  bindGetUserInfo () {
    app.getUserInfo(userInfo => {
      this.setData({
        userInfo: userInfo
      });
      console.log('getUserInfo ***' + JSON.stringify(userInfo));
    });
    if (AuthService.getMemberInfo()) {
      this.setData({
        isCertificationMem: true
      })
    }
  },
  bindAvatarTap () {
    var me = this;
    // 微信授权

    if (!this.data.userInfo) {
      AuthService.authorizeUserInfo().then((res) => {
        console.log('authorizeUserInfo...' + JSON.stringify(res));
        me.bindGetUserInfo();
      }).catch(error => {
        console.log('Not authorizeUserInfo In');
      });
    }

  },

  // 健身历程
  bindFitLcTap () {
    
  },
  // 体测数据
  bindFitDataTap () {

  },

  // 会员认证
  bindCertificationTap (e) {
    if (!this.data.isCertificationMem) {
      this.setData({
        isCertificationMemHidden: false
      })
    }
  },
  //会员认证 取消/确认
  bindConfirmBoxBtnTap (e) {
    var id = e.currentTarget.id;
    if (id == 'a') {
      // 确定 认证
      mineService.queryCertificationMember(this.data.memTelephone).then((result) => {

        console.log('queryCertificationMember *** ' + JSON.stringify(result));
        if (result.rs == 'Y') {
          this.setData({
            isCertificationMemHidden: true,
            isCertificationMem: true
          })
          // 保存认证结果
          AuthService.saveMemberInfo(result.result[0]);
        }

      }).catch((error) => {
        console.log(error);
      })
      
    } else {
      // 取消
      this.setData({
        isCertificationMemHidden: true
      })
    }
  },
  bindCerMemInput (e) {
    this.setData({
      memTelephone: e.detail.value 
    })
  }

  

})