// pages/home/buyMembershipCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: [
      {
        bgimg: '../../images/icon/home/car/card_bg.png',
        carPrice: 4000,
        carName: '一年卡',
        checked: false
      },
      {
        bgimg: '../../images/icon/home/car/card_bg.png',
        carPrice: 1000,
        carName: '月卡',
        checked: false
      }
    ],
    totalPrice: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  bindCarCellTap (e) {

    var index = e.currentTarget.id;
    var carList = this.data.carList;

    carList[index].checked = !carList[index].checked;

    var price = 0;
    carList.forEach(car => {
      
      if (car.checked) {
        price = price + car.carPrice
      }
    })

    this.setData({
      carList: carList,
      totalPrice: price
    })

  },

  bindProtocolCheckedTap (e) {

    this.setData({
      protocolChecked: !this.data.protocolChecked
    })

  }

})