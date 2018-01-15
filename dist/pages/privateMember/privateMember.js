//privateMember.js
//获取应用实例

import * as privatedata from '../../utils/privatedata-format';

const app = getApp()

Page({
  data: {
    privateMemberList: []
  },
  onLoad: function () {

    this.setData({
      privateMemberList: privatedata.formatPrivateMemberList(privatedata.privateMemberList)
    })
    
  },

  bindPrivateMemberTap (e) {

    

  }

})
