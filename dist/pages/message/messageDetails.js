// pages/message/messageDetails.js

import * as messageService from '../../services/message-service';
import * as messagedata from '../../utils/messagedata-format';
import moment from '../../utils/npm/moment';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mesgCarItems: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    wx.setNavigationBarTitle({
      title: options.title ? options.title : '消息',
    })

    messageService.quaryMessageDetails(options.mesgtype).then((result) => {

      this.setData({
        mesgCarItems: messagedata.formatMessageDetailsList(result.result)
      })

    }).catch((error) => {
      console.log(error);
    })

  },

  bindMesgCarCellTap() {
    
  }
  
})