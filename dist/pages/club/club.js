// pages/club/club.js

import * as AuthService from '../../services/auth-service';
import * as clubService from '../../services/club-service';
import * as clubdata from '../../utils/clubdata-format';

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

    clubList: [],
    clubListPageIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getClubList();

  },
  onShow: function (options) {
    // 查询是否认证会员
    this.getCertifiMem();
  },
  // 上拉触底 加载
  onReachBottom: function (options) {
    console.log('到底啦！！');

    var clubListPageIndex = this.data.clubListPageIndex;
    clubListPageIndex ++;
    this.setData({
      clubListPageIndex: clubListPageIndex
    })

    this.getClubList();
  },

  // 查询推荐活动
  getClubList() {
    clubService.quaryClubList(this.data.clubListPageIndex, 'N').then((result) => {
      this.setData({
        clubList: clubdata.formatClubList(result.result, this.data.clubList)
      })
      console.log(' out ....' + JSON.stringify(this.data.clubList));
    }).catch((error) => {
      console.log(error);
    })
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
        url: 'memberActivitiesDetails?activeId=' + e.currentTarget.id,
      })
    } else {
      this.setData({
        isCertificationMemHidden: false
      })
    }
  }
})