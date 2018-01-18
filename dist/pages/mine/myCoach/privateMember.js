//privateMember.js
//获取应用实例

import * as minedata from '../../../utils/minedata-format';
import * as mineService from '../../../services/mine-service';

const app = getApp()

Page({
  data: {
    emptyText: '暂无私教会员',
    emptyIcon: '../../../images/bg_img/no_data.png',

    privateMemberList: []
  },
  onLoad: function () {

    this.setData({
      privateMemberList: minedata.formatPrivateMemberList(minedata.privateMemberList)
    })

    
    this.getMyMembers();
    
  },

  // 取数据
  getMyMembers (e) {

    mineService.queryMyMembers().then((result) => {

      console.log('queryMyMembers *** ');

    }).catch((error) => {
      console.log(error);
    })

  },

  bindPrivateMemberTap (e) {

    wx.navigateTo({
      url: 'courseCustom',
    })

  }

})
