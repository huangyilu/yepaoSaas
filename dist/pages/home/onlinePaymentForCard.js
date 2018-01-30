// pages/home/online.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardType: '月卡',
    orderId: '000000000',
    price: 1900,
    finalPrice: 1800,
    vouchers: [
      {
        price: 100,
        name: '100抵200',
        checked: true
      },
      {
        price: 100,
        name: '100抵200',
        checked: false
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
  
  // 定金抵扣
  bindVouchersTap (e) {
    var index = e.currentTarget.id;
    var vouchers = this.data.vouchers;

    vouchers.forEach(item => {
      item.checked = false;
      vouchers[index].checked = true;
    })

    this.setData({
      vouchers: vouchers
    })

  }

})