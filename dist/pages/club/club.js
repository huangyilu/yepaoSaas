// pages/club/club.js

import * as AuthService from '../../services/auth-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgUrls: ['../../images/bg_img/ban.jpg'],

    // 会员认证
    isCertificationMem: false,
    isCertificationMemHidden: true,
    memTelephone: '',

    clubList: [
      {
        titleImg: '../../images/bg_img/xcsr.png',
        deadline: '02-25 10:34',
        status: '已结束',
        title: '新春甩肉季，我们来约"惠"',
        totalPeople: 10,
        nowPeople: 10,
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function (options) {
    // 查询是否认证会员
    this.getCertifiMem();
  },

  // 查询是否认证会员
  getCertifiMem() {
    if (AuthService.getMemberInfo()) {
      this.setData({
        isCertificationMem: true
      })
      console.log('已认证会员');
    } else {
      console.log('未认证会员');
    }
  },
  //会员认证 取消/确认
  bindConfirmBoxBtnTap(e) {
    var id = e.currentTarget.id;
    if (id == 'a') {
      // 确定 认证
      AuthService.queryCertificationMember(this.data.memTelephone).then((result) => {

        this.setData({
          isCertificationMemHidden: true,
          isCertificationMem: true
        })

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
  bindCerMemInput(e) {
    this.setData({
      memTelephone: e.detail.value
    })
  },

  bindMemberActivitiesTap(e) {
    if (this.data.isCertificationMem) {
      wx.navigateTo({
        url: 'memberActivities',
      })
    } else {
      this.setData({
        isCertificationMemHidden: false
      })
    }
  },
  bindClubDynamicsTap (e) {
    if (this.data.isCertificationMem) {
      wx.navigateTo({
        url: 'clubDynamics',
      })
    } else {
      this.setData({
        isCertificationMemHidden: false
      })
    }
  },

  bindClubCellTap(e) {
    if (this.data.isCertificationMem) {
      wx.navigateTo({
        url: 'memberActivitiesDetails',
      })
    } else {
      this.setData({
        isCertificationMemHidden: false
      })
    }
  }
})