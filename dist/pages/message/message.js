// pages/fitnessCircle/fitnessCircle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleItems: [
      {
        leftImg: '../../images/icon/message/booking_class.png',
        title: '消课',
        content: '【马敏】您好，您在收银台消课【搏击瘦身】',
        time: '08:09'
      },
      {
        leftImg: '../../images/icon/message/private_lessons.png',
        title: '预约私教课',
        content: '您预约了团课【搏击训练】，教练【江上清素】给您快乐',
        time: '2017-12-09'
      },
      {
        leftImg: '../../images/icon/message/pay_for_buy.png',
        title: '会员购课',
        content: '您预约了团课【搏击训练】，购买节数【10节】',
        time: '01-09'
      },
      {
        leftImg: '../../images/icon/message/buy_card.png',
        title: '会员购卡',
        content: '您预约了团课【搏击训练】，购买节数【10节】',
        time: '08:09'
      },
      {
        leftImg: '../../images/icon/message/fire_class.png',
        title: '消课',
        content: '您预约了团课【搏击训练】，购买节数【10节】',
        time: '08:09'
      },
      {
        leftImg: '../../images/icon/message/pay_for_leave.png',
        title: '付费请假',
        content: '您预约了团课【搏击训练】，购买节数【10节】',
        time: '08:09'
      },
      {
        leftImg: '../../images/icon/message/refund_card.png',
        title: '会员退卡',
        content: '您预约了团课【搏击训练】，购买节数【10节】',
        time: '08:09'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  bindArticleCellTap (e) {
    var index = e.currentTarget.id;
    var articleItems = this.data.articleItems;

    wx.navigateTo({
      url: 'messageDetails?title=' + articleItems[index].title,
    })
  }
})