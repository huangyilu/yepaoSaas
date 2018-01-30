// pages/home/membershipCardDetails.js
import * as homedata from '../../utils/homedata-format';
import * as homeService from '../../services/home-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // bgimg: '../../images/icon/home/car/card_bg.png',
    // carPrice: 1000,
    // carName: '一年卡',
    // carType: '年卡',
    // timeLeft: '365',
    // effectiveTime: '2019.01.09',
    // openingTime: '2018.01.09'
    carDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    homeService.queryMyCardsDetail(options.cardid).then((result) => {

      console.log('queryMyCardsDetail *** ' + JSON.stringify(result));
      if (result.rs == 'Y') {
        // this.setData({
        //   carList: homedata.formatMyMemCardDetails(result.cards)
        // })
      }

    }).catch((error) => {
      console.log(error);
    })
  
  },

  // 续费
  bindRenewFeeTap () {

    

  }
})