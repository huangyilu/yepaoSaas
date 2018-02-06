// pages/club/clubDynamics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubdyList: [
      {
        id: 0,
        title: '健美的要点',
        titleImg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
        content: '不管你是想要减肥、增重、增肌、增强体能肌力，踏出第一步的时候都面对...',
        time: '2017-12-12 10:34',
        author: '王艳',
        goodNum: 111,
        isGoodSelected: false
      },
      {
        id: 1,
        title: '健美的要点',
        titleImg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
        content: '不管你是想要减肥、增重、增肌、增强体能肌力，踏出第一步的时候都面对...',
        time: '2017-12-12 10:34',
        author: '王艳',
        goodNum: 111,
        isGoodSelected: true
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  // 点赞
  bindGoodSelectedTap (e) {
    
    var index = e.currentTarget.id;
    var clubdyList = this.data.clubdyList;

    if (clubdyList[index].isGoodSelected == false) {
      clubdyList[index].goodNum = clubdyList[index].goodNum + 1;
    } else {
      clubdyList[index].goodNum = clubdyList[index].goodNum - 1;
    }

    clubdyList[index].isGoodSelected = !clubdyList[index].isGoodSelected;

    this.setData({
      clubdyList: clubdyList
    })
  },

  // 俱乐部动态详情
  bindClubdyCellTap (e) {
    wx.navigateTo({
      url: 'clubDynamicsDetails',
    })
  }
})