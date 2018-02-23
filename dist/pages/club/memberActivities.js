// pages/club/memberActivities.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptyText: '暂无活动',
    emptyIcon: '../../images/bg_img/no_data.png',

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

  bindClubCellTap(e) {
    wx.navigateTo({
      url: 'memberActivitiesDetails',
    })
  }
})