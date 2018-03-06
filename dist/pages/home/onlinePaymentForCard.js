// pages/home/online.js

import * as homedata from '../../utils/homedata-format';
import * as homeService from '../../services/home-service';
import * as wxPayService from '../../services/wxpay-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardInfo: {},
    cardId: '',
    cardPrice: '',

    // 是否支付成功
    isSuccessPayment: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      cardId: options.cardid ? options.cardid : '',
      cardPrice: options.cardPrice ? options.cardPrice : 0
    })

    wxPayService.uploadOnlineCardOrder(this.data.cardId, this.data.cardPrice).then((result) => {

      console.log('uploadOnlineCardOrder *** ' + JSON.stringify(result));
      if (result.rs == 'Y') {
        this.setData({
          cardInfo: homedata.formatOnlinePaymentForCard(result.returnResult)
        })
      }

    }).catch((error) => {
      console.log(error);
    })
  
  },

  // 页面卸载
  onUnload: function () {
    // Do something when page close.
    // 如果支付失败/返回前一页面 则要调用 支付失败接口

    if (!this.data.isSuccessPayment) {

      var payInfo = {
        userCardId: this.data.cardInfo.userCardId,
        xcxOrderId: this.data.cardInfo.orderId
      }
      
      wxPayService.uploadFailPayment(payInfo).then((result) => {

        console.log('uploadFailPayment *** ' + JSON.stringify(result));

      }).catch((error) => {
        console.log(error);
      })
    }


  },
  
  // 定金抵扣
  bindVouchersTap (e) {
    var index = e.currentTarget.id;
    var vouchers = this.data.cardInfo.vouchers;
    var finalPrice = 0;
    var preFeeId = '';

    vouchers.forEach(item => {
      item.checked = false;
      vouchers[index].checked = true;

      if (item.checked == true) {
        finalPrice = this.data.cardInfo.price - item.price;
        preFeeId = item.preFeeId;
      }
    })

    this.setData({
      'cardInfo.vouchers': vouchers,
      'cardInfo.finalPrice': finalPrice,
      'cardInfo.preFeeId': preFeeId
    })

  },

  bindFinalWXPayTap() {

    var payInfo = {
      userCardId: this.data.cardInfo.userCardId,
      xcxOrderId: this.data.cardInfo.orderId,
      preFeeId: this.data.cardInfo.preFeeId,
      orderPrice: this.data.cardInfo.price
    }

    wxPayService.makeMemCardPayment(payInfo).then((result) => {

      console.log('makeMemCardPayment *** ' + JSON.stringify(result));

      if (result) {
        this.setData({
          isSuccessPayment: true
        })
        wx.navigateBack({
          delta: 1
        })
      }

    }).catch((error) => {
      console.log(error);
    })

  }

})