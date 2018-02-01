// pages/home/myClass.js

import * as homedata from '../../utils/homedata-format';
import * as homeService from '../../services/home-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptyText: '暂无约课',
    emptyIcon: '../../images/bg_img/no_data.png',

    myclassList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  
    homeService.queryMyClass().then((result) => {

      console.log('queryMyClass *** ' + JSON.stringify(result));
      if (result.rs == 'Y') {
        this.setData({
          // carList: homedata.formatMyMemCard(result.cards)
        })
      }

    }).catch((error) => {
      console.log(error);
    })
  
  },

  
})