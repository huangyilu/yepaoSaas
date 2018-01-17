//privateMember.js
//获取应用实例

import * as privatedata from '../../../utils/privatedata-format';
import * as mineService from '../../../services/mine-service';

const app = getApp()

Page({
  data: {
    privateMemberList: []
  },
  onLoad: function () {

    this.setData({
      privateMemberList: privatedata.formatPrivateMemberList(privatedata.privateMemberList)
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
