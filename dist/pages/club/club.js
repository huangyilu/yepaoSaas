// pages/club/club.js

import * as AuthService from '../../services/auth-service';
import * as clubService from '../../services/club-service';
import * as clubdata from '../../utils/clubdata-format';
import certificationBox from '../../templates/certification-box/certification-box'

  /**
   * 页面的初始数据
   */
let pageOptions = {

  data: {
    swiperImgUrls: ['../../images/bg_img/ban.jpg'],

    clubList: [],
    clubListPageIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onReady() {
    certificationBox.setParent(this)
  },
  getCertifiMem(that) {
    if (AuthService.getMemberInfo()) {
      this.setData({
        isCertificationMem: true
      })
      // 获取消息列表
      this.getClubList();
      console.log('*已认证会员*');
    } else {
      console.log('*未认证会员*');
    }
  },

  // 上拉触底 加载
  onReachBottom: function (options) {
    console.log('到底啦！！');

    var clubListPageIndex = this.data.clubListPageIndex;
    clubListPageIndex ++;
    this.setData({
      clubListPageIndex: clubListPageIndex
    })

    if (this.data.isCertificationMem) {
      this.getClubList();
    }
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

  bindMemberActivitiesTap(e) {
    if (this.data.isCertificationMem) {
      wx.navigateTo({
        url: 'memberActivities',
      })
    } else {
      this.setData({
        'certificationBoxData.isCertificationMemHidden': false
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
        'certificationBoxData.isCertificationMemHidden': false
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
        'certificationBoxData.isCertificationMemHidden': false
      })
    }
  }
}

certificationBox.bindData(pageOptions)
certificationBox.bindListeners(pageOptions)

Page(pageOptions)