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
        titleImg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
        deadline: '01-12 10:34',
        status: '进行中',
        title: '新春甩肉季，我们来约"惠"',
        totalPeople: 10,
        nowPeople: 2,
      },
      {
        titleImg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
        deadline: '01-12 10:34',
        status: '已完成',
        title: '新春甩肉季，我们来约"惠"',
        totalPeople: 10,
        nowPeople: 2,
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