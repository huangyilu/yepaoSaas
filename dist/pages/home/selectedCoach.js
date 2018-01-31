// pages/home/selectedCoach.js
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

  bindSearchItemTap (e) {
    var index = e.currentTarget.id;
    var searchList = this.data.searchList;

    wx.navigateBack({
      delta: 1
    })

    console.log('searchList[index] .. ' + JSON.stringify(searchList[index]));

    // 保存所选教练
    wx.setStorageSync('buyCourseSelectCoach', searchList[index]);

  }
})