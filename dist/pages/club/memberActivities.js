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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})