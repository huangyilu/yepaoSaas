// pages/mine/myMember/customerTrackingIntention.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: {
      custHeadimg: '../../../images/icon/default_headimg.png',
      custName: '张迪',
      custGender: 'girl',
      custPhone: '18136449610',
      custBirth: '1993-01-01',
      fitnessPurpose: '减肥',
      intentionCard: '通用五年卡',
      fitnessTime: '上午',
      address: '苏州高新区滨河路',
      remarks: '锻炼后需要拉伸',
      followList: [
        {
          time: '2017-09-09',
          title: '第一次跟单',
          content: '这是我第一次跟单。今天只是合客户简单沟通了其需要减肥的需求，值得进一步跟进',
          followMan: '跟单人：马敏'
        },
        {
          time: '2017-09-09',
          title: '第一次跟单',
          content: '这是我第一次跟单。今天只是合客户简单沟通了其需要减肥的需求，值得进一步跟进',
          followMan: '跟单人：马敏'
        },
        {
          time: '2017-09-09',
          title: '第一次跟单',
          content: '这是我第一次跟单。今天只是合客户简单沟通了其需要减肥的需求，值得进一步跟进',
          followMan: '跟单人：马敏'
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  // 拨打电话
  bindCustPhonecallTap (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.task.custPhone,
    })
  },
  // 预付定金
  bindPrepayTap (e) {
    wx.navigateTo({
      url: 'custTraIntentionPrepay',
    })
  },
  // 跟单
  bindFollowTap (e) {
    wx.navigateTo({
      url: 'custTraIntentionFollow',
    })
  }

})