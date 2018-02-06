// pages/mine/myMember/selectedMem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: [
      {
        name: '马敏',
        headimg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
        tel: 'tel: 188****7126'
      },
      {
        name: '马敏',
        headimg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
        tel: 'tel: 188****7126'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  bindSearchItemTap() {
    wx.navigateBack({
      delta: 1
    })
  }

})