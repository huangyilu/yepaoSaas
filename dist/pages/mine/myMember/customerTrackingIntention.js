// pages/mine/myMember/customerTrackingIntention.js
import * as minedata from '../../../utils/minedata-format';
import * as mineService from '../../../services/mine-service';
import { Base64 } from '../../../utils/urlsafe-base64';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  

    mineService.queryCustTrackIntentionDetails(options.memId).then((result) => {
      // console.log('queryCustTrackIntention *** ' + JSON.stringify(result));

      this.setData({
        task: minedata.formatCustTrackingIntentionDetail(result.potentialMemMap)
      })

    }).catch((error) => {
      console.log(error);
    })

  },

  // 拨打电话
  bindCustPhonecallTap (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.task.custPhone,
    })
  },
  // 预付定金
  bindPrepayTap (e) {
    let qsTask = Base64.encodeURI(JSON.stringify(this.data.task)); 
    wx.navigateTo({
      url: 'custTraIntentionPrepay?qsTask=' + qsTask,
    })
  },
  // 跟单
  bindFollowTap (e) {

    let qsTask = Base64.encodeURI(JSON.stringify(this.data.task)); 

    wx.navigateTo({
      url: 'custTraIntentionFollow?qsTask=' + qsTask,
    })
  }

})