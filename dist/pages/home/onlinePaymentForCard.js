// pages/home/online.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardType: '月卡',
    orderId: '000000000',
    price: 1900,
    finalPrice: 1900,
    vouchers: [
      {
        price: 200,
        name: '100抵200',
        checked: false
      },
      {
        price: 300,
        name: '150抵300',
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
    var finalPrice = this.data.finalPrice;

    vouchers.forEach(item => {
      item.checked = false;
      vouchers[index].checked = true;

      if (item.checked == true) {
        finalPrice = this.data.price - item.price
      }
    })

    this.setData({
      vouchers: vouchers,
      finalPrice: finalPrice
    })

  }

})