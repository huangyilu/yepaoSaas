// pages/home/personalTrainer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 屏幕宽度
    windowWidth: 0,

    starUrl: '../../images/icon/home/star_pink.png',
    emptUrl: '../../images/icon/star_g.png',

    personalList: [
      {
        headImg: '',
        name: '叽叽喳喳',
        score: 4,
        tags: '腹肌男',
        imgs: []
      },
      {
        headImg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
        name: '叽叽喳喳',
        score: 3,
        tags: '腹肌男，阳光，帅气',
        imgs: ['http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg', 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg', 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg', 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg']
      },
      {
        headImg: '',
        name: '叽叽喳喳',
        score: 5,
        tags: '',
        imgs: []
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var res = wx.getSystemInfoSync();
    this.setData({
      windowWidth: res.windowWidth
    })
    
  },


})