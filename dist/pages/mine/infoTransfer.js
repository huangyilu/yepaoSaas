// pages/mine/myMember/infoTransfer.js

import * as minedata from '../../utils/minedata-format';
import * as mineService from '../../services/mine-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirmText: '确定将选择的会员移交给马敏吗？',
    confirmBoxHidden: true,
    
    infoTranList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    // 查询 会员列表
    mineService.queryMems().then((result) => {

      console.log('queryMems *** ' + JSON.stringify(result));
      this.setData({
        infoTranList: minedata.formatInfoTransfer(result.memList)
      })

    }).catch((error) => {
      console.log(error);
    })

  
  },

  bindInfoCellTap (e) {
    var index = e.currentTarget.id;

    var infoTranList = this.data.infoTranList;
    infoTranList[index].checked = !infoTranList[index].checked;

    this.setData({
      infoTranList: infoTranList
    })

  },

  // 平均移交
  bindAverageTap (e) {

    this.setData({
      confirmBoxHidden: false
    })

  },
  // 指定移交 去选择 会员 指定移交
  bindSpecifiedTap (e) {

    wx.navigateTo({
      url: '',
    })

  }

})