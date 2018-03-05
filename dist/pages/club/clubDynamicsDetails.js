// pages/club/clubDynamicsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {
      title: '新春甩肉季，我们来约“惠”',
      author: '王雨燕',
      introduction: '冬天已过，正是锻炼好时节，也跑健身感恩新老客户，特“惠”来袭，你还在等什么，赶快加入吧！  ',
      poster: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
      contents: [
        {
          styleClass: 'section-title',
          content: '享受帝王般的尊宠，运动休闲的皇家会所，格力特健身中心，我运动我健康。',
        },
        {
          types: 'image',
          src: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg'
        },
        {
          content: '您将拥有:大型豪华私人会所,完善及舒适的环境,世界一流的健身设备,亲切的客户服务,免费国家级教练指导,最流行的动感单车,免费提供桑拿、淋浴，各种世界同步有氧操，大型停车场等。 我们为您准备的课程：身体平衡、趣味球操、有氧搏击、动感单车、芭蕾、高温瑜珈，超自然瑜珈、桌球、游泳、乒乓、健身操、拉丁等。还有休闲茶室、免费上网等。',
        },
        {
          content: '您将拥有:大型豪华私人会所,完善及舒适的环境,世界一流的健身设备,亲切的客户服务,免费国家级教练指导,最流行的动感单车,免费提供桑拿、淋浴，各种世界同步有氧操，大型停车场等。 我们为您准备的课程：身体平衡、趣味球操、有氧搏击、动感单车、芭蕾、高温瑜珈，超自然瑜珈、桌球、游泳、乒乓、健身操、拉丁等。还有休闲茶室、免费上网等。',
        }

      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  bindGoodSelectedTap (e) {
    var article = this.data.article;

    if (article.isGoodSelected == false) {
      article.goodNum = article.goodNum + 1;
    } else {
      article.goodNum = article.goodNum - 1;
    }

    article.isGoodSelected = !article.isGoodSelected;

    this.setData({
      article: article
    })
  }
})